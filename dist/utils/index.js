"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolveCwd = require('resolve-cwd');
var graphqlPackagePath = resolveCwd.silent('graphql');
var _a = require(graphqlPackagePath || 'graphql'), GraphQLObjectType = _a.GraphQLObjectType, GraphQLScalarType = _a.GraphQLScalarType, GraphQLInterfaceType = _a.GraphQLInterfaceType, GraphQLUnionType = _a.GraphQLUnionType, GraphQLList = _a.GraphQLList, GraphQLEnumType = _a.GraphQLEnumType, GraphQLNonNull = _a.GraphQLNonNull;
var graphql_1 = require("graphql");
function isScalar(t) {
    if (t instanceof GraphQLScalarType || t instanceof GraphQLEnumType) {
        return true;
    }
    if (t instanceof GraphQLObjectType ||
        t instanceof GraphQLInterfaceType ||
        t instanceof GraphQLUnionType ||
        t instanceof GraphQLList) {
        return false;
    }
    var nnt = t;
    if (nnt instanceof GraphQLNonNull) {
        if (nnt.ofType instanceof GraphQLScalarType ||
            nnt.ofType instanceof GraphQLEnumType) {
            return true;
        }
    }
    return false;
}
exports.isScalar = isScalar;
function getTypeForRootFieldName(rootFieldName, operation, schema) {
    if (operation === 'mutation' && !schema.getMutationType()) {
        throw new Error("Schema doesn't have mutation type");
    }
    if (operation === 'subscription' && !schema.getSubscriptionType()) {
        throw new Error("Schema doesn't have subscription type");
    }
    var rootType = {
        query: function () { return schema.getQueryType(); },
        mutation: function () { return schema.getMutationType(); },
        subscription: function () { return schema.getSubscriptionType(); },
    }[operation]() || undefined;
    var rootField = rootType.getFields()[rootFieldName];
    if (!rootField) {
        throw new Error("No such root field found: " + rootFieldName);
    }
    return rootField.type;
}
exports.getTypeForRootFieldName = getTypeForRootFieldName;
function forwardTo(bindingName) {
    return function (parent, args, context, info) {
        var message = "Forward to '" + bindingName + "." + info.parentType.name.toLowerCase() + "." + info.fieldName + "' failed. ";
        if (context[bindingName]) {
            if (context[bindingName][info.parentType.name.toLowerCase()][info.fieldName]) {
                return context[bindingName][info.parentType.name.toLowerCase()][info.fieldName](args, info);
            }
            else {
                message += "Field '" + info.parentType.name.toLowerCase() + "." + info.fieldName + "' not found on binding '" + bindingName + "'.";
            }
        }
        else {
            message += "Binding '" + bindingName + "' not found.";
        }
        throw new Error(message);
    };
}
exports.forwardTo = forwardTo;
function printDocumentFromInfo(info) {
    var fragments = Object.keys(info.fragments).map(function (fragment) { return info.fragments[fragment]; });
    var doc = {
        kind: 'Document',
        definitions: [
            {
                kind: 'OperationDefinition',
                operation: 'query',
                selectionSet: info.fieldNodes[0].selectionSet,
            }
        ].concat(fragments),
    };
    return graphql_1.print(doc);
}
exports.printDocumentFromInfo = printDocumentFromInfo;
//# sourceMappingURL=index.js.map