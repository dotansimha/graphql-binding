"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolveCwd = require('resolve-cwd');
var graphqlPackagePath = resolveCwd.silent('graphql');
var _a = require(graphqlPackagePath || 'graphql'), GraphQLObjectType = _a.GraphQLObjectType, GraphQLScalarType = _a.GraphQLScalarType, parse = _a.parse, validate = _a.validate, Kind = _a.Kind;
var graphql_1 = require("graphql");
var utils_1 = require("./utils");
var addFragmentToInfo_1 = require("./utils/addFragmentToInfo");
function buildInfo(rootFieldName, operation, schema, info) {
    if (!info) {
        info = buildInfoForAllScalars(rootFieldName, schema, operation);
    }
    else if (info.kind && info.kind === 'Document') {
        info = graphql_1.print(info);
    }
    if (typeof info === 'string') {
        info = buildInfoFromFragment(rootFieldName, schema, operation, info);
    }
    return info;
}
exports.buildInfo = buildInfo;
function buildInfoForAllScalars(rootFieldName, schema, operation) {
    var fieldNodes = [];
    var type = utils_1.getTypeForRootFieldName(rootFieldName, operation, schema);
    var namedType = graphql_1.getNamedType(type);
    var selections;
    if (namedType instanceof GraphQLObjectType) {
        var fields_1 = namedType.getFields();
        selections = Object.keys(fields_1)
            .filter(function (f) { return utils_1.isScalar(fields_1[f].type); })
            .map(function (fieldName) {
            var field = fields_1[fieldName];
            return {
                kind: 'Field',
                name: { kind: 'Name', value: field.name },
            };
        });
    }
    var fieldNode = {
        kind: 'Field',
        name: { kind: 'Name', value: rootFieldName },
        selectionSet: selections ? { kind: 'SelectionSet', selections: selections } : undefined,
    };
    fieldNodes.push(fieldNode);
    var parentType = {
        query: function () { return schema.getQueryType(); },
        mutation: function () { return schema.getMutationType(); },
        subscription: function () { return schema.getSubscriptionType(); },
    }[operation]() || undefined;
    return {
        fieldNodes: fieldNodes,
        fragments: {},
        schema: schema,
        fieldName: rootFieldName,
        returnType: type,
        parentType: parentType,
        path: undefined,
        rootValue: undefined,
        operation: {
            kind: 'OperationDefinition',
            operation: operation,
            selectionSet: { kind: 'SelectionSet', selections: [] },
            variableDefinitions: [],
        },
        variableValues: {},
    };
}
exports.buildInfoForAllScalars = buildInfoForAllScalars;
function buildInfoFromFragment(rootFieldName, schema, operation, query) {
    var type = utils_1.getTypeForRootFieldName(rootFieldName, operation, schema);
    var namedType = graphql_1.getNamedType(type);
    var fieldNode = {
        kind: 'Field',
        name: { kind: 'Name', value: rootFieldName },
        selectionSet: extractQuerySelectionSet(query, namedType.name, schema),
    };
    return {
        fieldNodes: [fieldNode],
        fragments: {},
        schema: schema,
        fieldName: rootFieldName,
        returnType: type,
        parentType: schema.getQueryType() || undefined,
        path: undefined,
        rootValue: undefined,
        operation: {
            kind: 'OperationDefinition',
            operation: operation,
            selectionSet: { kind: 'SelectionSet', selections: [] },
            variableDefinitions: [],
        },
        variableValues: {},
    };
}
exports.buildInfoFromFragment = buildInfoFromFragment;
function extractQuerySelectionSet(query, typeName, schema) {
    if (!query.startsWith('fragment')) {
        query = "fragment tmp on " + typeName + " " + query;
    }
    var document = parse(query);
    var errors = validate(schema, document).filter(function (e) { return e.message.match(/Fragment ".*" is never used./) === null; });
    if (errors.length > 0) {
        throw errors;
    }
    var queryNode = document.definitions[0];
    if (!queryNode || queryNode.kind !== 'FragmentDefinition') {
        throw new Error("Invalid query: " + query);
    }
    return queryNode.selectionSet;
}
/**
 * Generates a sub info based on the provided path. If provided path is not included in the selection set, the function returns null.
 * @param info GraphQLResolveInfo
 * @param path string
 * @param fragment string | undefined
 */
function makeSubInfo(info, path, fragment) {
    var returnType = getDeepType(info.returnType);
    if (returnType instanceof GraphQLScalarType) {
        throw new Error("Can't make subInfo for type " + info.returnType.toString());
    }
    var splittedPath = path.split('.');
    var fieldsToTraverse = splittedPath.slice();
    var currentType = info.returnType;
    var currentSelectionSet = info.fieldNodes[0].selectionSet;
    var currentFieldName;
    var parentType;
    var currentPath = info.path || {
        prev: undefined,
        key: info.fieldNodes[0].name.value,
    };
    while (fieldsToTraverse.length > 0) {
        currentFieldName = fieldsToTraverse.shift();
        if (!(currentType instanceof GraphQLObjectType)) {
            throw new Error("Can't get subInfo for type " + currentType.toString() + " as needs to be a GraphQLObjectType");
        }
        var fields = currentType.getFields();
        if (!fields[currentFieldName]) {
            throw new Error("Type " + currentType.toString() + " has no field called " + currentFieldName);
        }
        var currentFieldType = fields[currentFieldName].type;
        if (!(currentFieldType instanceof GraphQLObjectType)) {
            throw new Error("Can't get subInfo for type " + currentFieldType + " of field " + currentFieldName + " on type " + currentType.toString());
        }
        parentType = currentType;
        currentType = currentFieldType;
        var suitableSelection = currentSelectionSet.selections.find(function (selection) {
            return selection.kind === 'Field' && selection.name.value === currentFieldName;
        });
        if (!suitableSelection) {
            // if there is no field selection, there still could be fragments
            currentSelectionSet = currentSelectionSet.selections.reduce(function (acc, curr) {
                if (acc) {
                    return acc;
                }
                if (curr.kind === 'InlineFragment') {
                    return curr.selectionSet;
                }
            }, null);
        }
        else if (suitableSelection.kind === 'Field') {
            currentSelectionSet = suitableSelection.selectionSet;
        }
        if (!currentSelectionSet) {
            return null;
        }
        currentPath = addPath(currentPath, currentFieldName);
    }
    var fieldNode = {
        kind: 'Field',
        name: { kind: 'Name', value: currentFieldName },
        selectionSet: currentSelectionSet,
    };
    var newInfo = {
        fieldNodes: [fieldNode],
        fragments: {},
        schema: info.schema,
        fieldName: currentFieldName,
        returnType: currentType,
        parentType: parentType,
        path: currentPath,
        rootValue: undefined,
        operation: {
            kind: Kind.OPERATION_DEFINITION,
            operation: currentFieldName,
            selectionSet: { kind: Kind.SELECTION_SET, selections: [] },
            variableDefinitions: [],
        },
        variableValues: {},
    };
    if (fragment) {
        return addFragmentToInfo_1.addFragmentToInfo(newInfo, fragment);
    }
    return newInfo;
}
exports.makeSubInfo = makeSubInfo;
function getDeepType(type) {
    if (type.ofType) {
        return getDeepType(type.ofType);
    }
    return type;
}
exports.getDeepType = getDeepType;
function addPath(prev, key) {
    return { prev: prev, key: key };
}
exports.addPath = addPath;
//# sourceMappingURL=info.js.map