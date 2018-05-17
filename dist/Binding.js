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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Delegate_1 = require("./Delegate");
// to avoid recreation on each instantiation for the same schema, we cache the created methods
var methodCache = new Map();
var Binding = /** @class */ (function (_super) {
    __extends(Binding, _super);
    function Binding(_a) {
        var schema = _a.schema, fragmentReplacements = _a.fragmentReplacements, before = _a.before;
        var _this = _super.call(this, { schema: schema, fragmentReplacements: fragmentReplacements, before: before }) || this;
        var _b = _this.buildMethods(), query = _b.query, mutation = _b.mutation, subscription = _b.subscription;
        _this.query = query;
        _this.mutation = mutation;
        _this.subscription = subscription;
        return _this;
    }
    Binding.prototype.buildMethods = function () {
        var cachedMethods = methodCache.get(this.schema);
        if (cachedMethods) {
            return cachedMethods;
        }
        var methods = {
            query: this.buildQueryMethods('query'),
            mutation: this.buildQueryMethods('mutation'),
            subscription: this.buildSubscriptionMethods(),
        };
        methodCache.set(this.schema, methods);
        return methods;
    };
    Binding.prototype.buildQueryMethods = function (operation) {
        var _this = this;
        var queryType = operation === 'query'
            ? this.schema.getQueryType()
            : this.schema.getMutationType();
        if (!queryType) {
            return {};
        }
        var fields = queryType.getFields();
        return Object.entries(fields)
            .map(function (_a) {
            var fieldName = _a[0], field = _a[1];
            return {
                key: fieldName,
                value: function (args, info, options) {
                    return _this.delegate(operation, fieldName, args, info, options);
                },
            };
        })
            .reduce(function (acc, curr) {
            return (__assign({}, acc, (_a = {}, _a[curr.key] = curr.value, _a)));
            var _a;
        }, {});
    };
    Binding.prototype.buildSubscriptionMethods = function () {
        var _this = this;
        var queryType = this.schema.getQueryType();
        if (!queryType) {
            return {};
        }
        var fields = queryType.getFields();
        return Object.entries(fields)
            .map(function (_a) {
            var fieldName = _a[0], field = _a[1];
            return {
                key: fieldName,
                value: function (args, info, options) {
                    return _this.delegateSubscription(fieldName, args, info, options);
                },
            };
        })
            .reduce(function (acc, curr) {
            return (__assign({}, acc, (_a = {}, _a[curr.key] = curr.value, _a)));
            var _a;
        }, {});
    };
    return Binding;
}(Delegate_1.Delegate));
exports.Binding = Binding;
//# sourceMappingURL=Binding.js.map