"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var iterall_1 = require("iterall");
var info_1 = require("./info");
var graphql_1 = require("graphql");
var graphql_tools_1 = require("graphql-tools");
var graphql_import_1 = require("graphql-import");
var fs = require("fs");
var path = require("path");
var Delegate = /** @class */ (function () {
    function Delegate(_a) {
        var schema = _a.schema, fragmentReplacements = _a.fragmentReplacements, before = _a.before;
        this.fragmentReplacements = fragmentReplacements || [];
        this.schema = schema;
        this.before = before || (function () { return undefined; });
    }
    Delegate.prototype.request = function (query, variables) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.before();
                return [2 /*return*/, graphql_1.graphql(this.schema, query, null, null, variables).then(function (r) { return r.data; })];
            });
        });
    };
    Delegate.prototype.delegate = function (operation, fieldName, args, infoOrQuery, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.before();
                return [2 /*return*/, this.delegateToSchema(operation, fieldName, args, infoOrQuery, options).result];
            });
        });
    };
    Delegate.prototype.delegateSubscription = function (fieldName, args, infoOrQuery, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, result, info, iterator, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.before();
                        _a = this.delegateToSchema('subscription', fieldName, args, infoOrQuery, options), result = _a.result, info = _a.info;
                        return [4 /*yield*/, result];
                    case 1:
                        iterator = _c.sent();
                        return [2 /*return*/, (_b = {
                                    next: function () {
                                        return __awaiter(this, void 0, void 0, function () {
                                            var value, data, _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, iterator.next()];
                                                    case 1:
                                                        value = (_b.sent()).value;
                                                        data = (_a = {}, _a[info.fieldName] = value.data[fieldName], _a);
                                                        return [2 /*return*/, { value: data, done: false }];
                                                }
                                            });
                                        });
                                    },
                                    return: function () {
                                        return Promise.resolve({ value: undefined, done: true });
                                    },
                                    throw: function (error) {
                                        return Promise.reject(error);
                                    }
                                },
                                _b[iterall_1.$$asyncIterator] = function () {
                                    return this;
                                },
                                _b)];
                }
            });
        });
    };
    Delegate.prototype.getAbstractResolvers = function (filterSchema) {
        var typeMap = this.schema.getTypeMap();
        if (filterSchema && typeof filterSchema === 'string') {
            if (filterSchema.endsWith('graphql')) {
                var schemaPath = path.resolve(filterSchema);
                if (!fs.existsSync(schemaPath)) {
                    throw new Error("No schema found for path: " + schemaPath);
                }
                filterSchema = graphql_import_1.importSchema(schemaPath);
            }
            filterSchema = graphql_1.buildSchema(filterSchema);
        }
        var filterTypeMap = filterSchema instanceof graphql_1.GraphQLSchema
            ? filterSchema.getTypeMap()
            : typeMap;
        var filterType = function (typeName) { return typeName in filterTypeMap; };
        var resolvers = {};
        Object.keys(typeMap)
            .filter(filterType)
            .forEach(function (typeName) {
            var type = typeMap[typeName];
            if (type instanceof graphql_1.GraphQLUnionType ||
                type instanceof graphql_1.GraphQLInterfaceType) {
                resolvers[typeName] = {
                    __resolveType: type.resolveType,
                };
            }
        });
        return resolvers;
    };
    Delegate.prototype.delegateToSchema = function (operation, fieldName, args, infoOrQuery, options) {
        var info = info_1.buildInfo(fieldName, operation, this.schema, infoOrQuery);
        var transforms = options && options.transforms ? options.transforms : [];
        var result = graphql_tools_1.delegateToSchema({
            schema: this.schema,
            operation: operation,
            fieldName: fieldName,
            args: args || {},
            context: options && options.context ? options.context : {},
            info: info,
            transforms: [
                new graphql_tools_1.ReplaceFieldWithFragment(this.schema, this.fragmentReplacements)
            ].concat(transforms),
        });
        return { info: info, result: result };
    };
    return Delegate;
}());
exports.Delegate = Delegate;
//# sourceMappingURL=Delegate.js.map