"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var resolveCwd = require('resolve-cwd');
var graphqlPackagePath = resolveCwd.silent('graphql');
var _a = require(graphqlPackagePath || 'graphql'), isNonNullType = _a.isNonNullType, isListType = _a.isListType, GraphQLObjectType = _a.GraphQLObjectType;
var Generator_1 = require("./Generator");
var FlowGenerator = /** @class */ (function (_super) {
    __extends(FlowGenerator, _super);
    function FlowGenerator(_a) {
        var schema = _a.schema, inputSchemaPath = _a.inputSchemaPath, outputBindingPath = _a.outputBindingPath, isDefaultExport = _a.isDefaultExport;
        var _this = _super.call(this, { schema: schema, inputSchemaPath: inputSchemaPath, outputBindingPath: outputBindingPath, isDefaultExport: isDefaultExport }) || this;
        _this.scalarMapping = {
            Int: 'number',
            String: 'string',
            ID: 'string | number',
            Float: 'number',
            Boolean: 'boolean',
            DateTime: 'Date | string',
        };
        _this.graphqlRenderers = {
            GraphQLUnionType: function (type) {
                return _this.renderDescription(type.description) + " export type " + type.name + " = {| " + type
                    .getTypes()
                    .map(function (t) { return t.name; })
                    .join(', \n') + "\n        |}\n        ";
            },
            GraphQLObjectType: function (type) { return _this.renderInterfaceOrObject(type); },
            GraphQLInterfaceType: function (type) { return _this.renderInterfaceOrObject(type); },
            GraphQLInputObjectType: function (type) {
                var fieldDefinition = Object.keys(type.getFields())
                    .map(function (f) {
                    var field = type.getFields()[f];
                    return "  " + _this.renderFieldName(field) + ": " + _this.renderInputFieldType(field.type);
                })
                    .join(',\n');
                var interfaces = [];
                if (type instanceof GraphQLObjectType) {
                    interfaces = type.getInterrfaces();
                }
                return _this.renderInterfaceWrapper(type.name, type.description, interfaces, fieldDefinition);
            },
            GraphQLScalarType: function (type) {
                if (type.name === 'ID') {
                    return _this.graphqlRenderers.GraphQLIDType(type);
                }
                return (type.description
                    ? "/*\n" + type.description + "\n*/\n"
                    : '') + " export type " + type.name + " = " + (_this.scalarMapping[type.name] || 'string') + " ";
            },
            GraphQLIDType: function (type) {
                return (type.description
                    ? "/*\n" + type.description + "\n*/\n"
                    : '') + " export type " + type.name + "_Input = " + (_this.scalarMapping[type.name] ||
                    'string') + "\nexport type " + type.name + "_Output = string";
            },
            GraphQLEnumType: function (type) {
                return _this.renderDescription(type.description) + " export type " + type.name + " =\n" + type
                    .getValues()
                    .map(function (e) { return "    | '" + e.name + "'"; })
                    .join('\n') + "\n  ";
            },
        };
        return _this;
    }
    FlowGenerator.prototype.render = function () {
        return this.compile(templateObject_1 || (templateObject_1 = __makeTemplateObject(["// @flow\n", "\n\nexport interface Query ", "\n\nexport interface Mutation ", "\n\nexport interface Subscription ", "\n\nexport interface Binding {\n  query: Query;\n  mutation: Mutation;\n  subscription: Subscription;\n  request(query: string, variables?: {[key: string]: any}): Promise<any>;\n  delegate(operation: 'query' | 'mutation', fieldName: string, args: {\n      [key: string]: any;\n  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;\n  delegateSubscription(fieldName: string, args?: {\n      [key: string]: any;\n  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;\n  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;\n}\n\nexport interface BindingConstructor<T> {\n  new(...args): T;\n}\n\n", "\n\n/**\n * Types\n*/\n\n", ""], ["\\\n// @flow\n", "\n\nexport interface Query ", "\n\nexport interface Mutation ", "\n\nexport interface Subscription ", "\n\nexport interface Binding {\n  query: Query;\n  mutation: Mutation;\n  subscription: Subscription;\n  request(query: string, variables?: {[key: string]: any}): Promise<any>;\n  delegate(operation: 'query' | 'mutation', fieldName: string, args: {\n      [key: string]: any;\n  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;\n  delegateSubscription(fieldName: string, args?: {\n      [key: string]: any;\n  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;\n  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;\n}\n\nexport interface BindingConstructor<T> {\n  new(...args): T;\n}\n\n", "\n\n/**\n * Types\n*/\n\n", ""])), this.renderImports(), this.renderQueries(), this.renderMutations(), this.renderSubscriptions(), this.renderExports(), this.renderTypes());
    };
    FlowGenerator.prototype.renderExports = function () {
        return "export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema })";
    };
    FlowGenerator.prototype.renderQueries = function () {
        var queryType = this.schema.getQueryType();
        if (!queryType) {
            return '{}';
        }
        return this.renderMainMethodFields('query', queryType.getFields());
    };
    FlowGenerator.prototype.renderMutations = function () {
        var mutationType = this.schema.getMutationType();
        if (!mutationType) {
            return '{}';
        }
        return this.renderMainMethodFields('mutation', mutationType.getFields());
    };
    FlowGenerator.prototype.renderSubscriptions = function () {
        var subscriptionType = this.schema.getSubscriptionType();
        if (!subscriptionType) {
            return '{}';
        }
        return this.renderMainMethodFields('subscription', subscriptionType.getFields());
    };
    FlowGenerator.prototype.getTypeNames = function () {
        var ast = this.schema;
        // Create types
        return Object.keys(ast.getTypeMap())
            .filter(function (typeName) { return !typeName.startsWith('__'); })
            .filter(function (typeName) { return typeName !== ast.getQueryType().name; })
            .filter(function (typeName) {
            return ast.getMutationType()
                ? typeName !== ast.getMutationType().name
                : true;
        })
            .filter(function (typeName) {
            return ast.getSubscriptionType()
                ? typeName !== ast.getSubscriptionType().name
                : true;
        })
            .sort(function (a, b) {
            return ast.getType(a).constructor.name <
                ast.getType(b).constructor.name
                ? -1
                : 1;
        });
    };
    FlowGenerator.prototype.renderTypes = function () {
        var _this = this;
        var typeNames = this.getTypeNames();
        return typeNames
            .map(function (typeName) {
            var type = _this.schema.getTypeMap()[typeName];
            return _this.graphqlRenderers[type.constructor.name]
                ? _this.graphqlRenderers[type.constructor.name](type)
                : null;
        })
            .join('\n\n');
    };
    FlowGenerator.prototype.renderMainMethodFields = function (operation, fields) {
        var _this = this;
        var methods = Object.keys(fields)
            .map(function (f) {
            var field = fields[f];
            var hasArgs = field.args.length > 0;
            return "    " + field.name + "(args" + (hasArgs ? '' : '?') + ": {" + (hasArgs ? ' ' : '') + field.args
                .map(function (f) { return _this.renderFieldName(f) + ": " + _this.renderFieldType(f.type); })
                .join(', ') + (field.args.length > 0 ? ' ' : '') + "}, info?: GraphQLResolveInfo | string, options?: Options): " + _this.getPayloadType(operation, "" + _this.renderFieldType(field.type) + (!isNonNullType(field.type) ? ' | null' : '')) + "; ";
        })
            .join('\n');
        return "{\n" + methods + "\n  }";
    };
    FlowGenerator.prototype.getPayloadType = function (operation, type) {
        if (operation === 'subscription') {
            return "Promise<AsyncIterator<" + type + ">>";
        }
        return "Promise<" + type + ">";
    };
    FlowGenerator.prototype.renderInterfaceOrObject = function (type) {
        var _this = this;
        var fieldDefinition = Object.keys(type.getFields())
            .map(function (f) {
            var field = type.getFields()[f];
            return "   " + _this.renderFieldName(field) + ": " + _this.renderFieldType(field.type) + ",";
        })
            .join('\n');
        var interfaces = [];
        if (type instanceof GraphQLObjectType) {
            interfaces = type.getInterfaces();
        }
        return this.renderInterfaceWrapper(type.name, type.description, interfaces, fieldDefinition);
    };
    FlowGenerator.prototype.renderFieldName = function (field) {
        return "" + field.name + (isNonNullType(field.type) ? '' : '?');
    };
    FlowGenerator.prototype.renderFieldType = function (type) {
        if (isNonNullType(type)) {
            return "" + this.renderFieldType(type.ofType);
        }
        if (isListType(type)) {
            return this.renderFieldType(type.ofType) + "[]";
        }
        return "" + type.name + (type.name === 'ID' ? '_Output' : '');
    };
    FlowGenerator.prototype.renderInputFieldType = function (type) {
        if (isNonNullType(type)) {
            return "" + this.renderInputFieldType(type.ofType);
        }
        if (isListType(type)) {
            var inputType = this.renderInputFieldType(type.ofType);
            return "Array< " + inputType + " > | " + inputType;
        }
        return "" + type.name + (type.name === 'ID' ? '_Input' : '');
    };
    FlowGenerator.prototype.renderTypeWrapper = function (typeName, typeDescription, fieldDefinition) {
        return this.renderDescription(typeDescription) + " export type " + typeName + " = { " + fieldDefinition + " }";
    };
    FlowGenerator.prototype.renderObjectWrapper = function (typeName, typeDescription, objects, fieldDefinition) {
        return this.renderDescription(typeDescription) + " export type " + typeName + " = {\n    ";
    };
    FlowGenerator.prototype.renderInterfaceWrapper = function (typeName, typeDescription, interfaces, fieldDefinition) {
        return this.renderDescription(typeDescription) + " export type " + typeName + " = {| " + (interfaces.length > 0
            ? "..." + interfaces.map(function (i) { return i.name; }).join(',\n') + ",\n "
            : '') + "\n" + fieldDefinition + "\n|}";
    };
    FlowGenerator.prototype.renderDescription = function (description) {
        return "" + (description
            ? "/*\n" + description.split('\n').map(function (l) { return " * " + l + "\n"; }) + "\n*/\n"
            : '');
    };
    FlowGenerator.prototype.renderImports = function () {
        return "import { makeBindingClass, Options } from 'graphql-binding'\nimport { GraphQLResolveInfo, GraphQLSchema } from 'graphql'\nimport { IResolvers } from 'graphql-tools/dist/Interfaces'\nimport " + (this.isDefaultExport ? '' : '* as ') + "schema from  '" + this.getRelativeSchemaPath() + "'";
    };
    return FlowGenerator;
}(Generator_1.Generator));
exports.FlowGenerator = FlowGenerator;
var templateObject_1;
//# sourceMappingURL=FlowGenerator.js.map