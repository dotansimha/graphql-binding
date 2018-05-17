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
var Binding_1 = require("./Binding");
function makeBindingClass(_a) {
    var schema = _a.schema;
    return /** @class */ (function (_super) {
        __extends(Binding, _super);
        function Binding(options) {
            return _super.call(this, __assign({ schema: schema }, options)) || this;
        }
        return Binding;
    }(Binding_1.Binding));
}
exports.makeBindingClass = makeBindingClass;
//# sourceMappingURL=makeBindingClass.js.map