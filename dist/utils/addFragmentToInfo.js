"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var info_1 = require("../info");
var object_path_immutable_1 = require("object-path-immutable");
function addFragmentToInfo(info, fragment) {
    var returnType = info_1.getDeepType(info.returnType);
    if (returnType instanceof graphql_1.GraphQLScalarType) {
        throw new Error("Can't add fragment \"" + fragment + "\" because return type of info object is a scalar type " + info.returnType.toString());
    }
    var ast = graphql_1.parse(fragment);
    var deepReturnType = info_1.getDeepType(returnType);
    if (ast.definitions[0].kind === 'FragmentDefinition' &&
        ast.definitions[0].typeCondition.name.value !==
            deepReturnType.toString()) {
        throw new Error("Type " + ast.definitions[0].typeCondition.name.value + " specified in fragment doesn't match return type " + deepReturnType.toString());
    }
    return object_path_immutable_1.update(info, ['fieldNodes', 0, 'selectionSet', 'selections'], function (selections) {
        return selections.concat(ast.definitions[0].selectionSet.selections);
    });
}
exports.addFragmentToInfo = addFragmentToInfo;
//# sourceMappingURL=addFragmentToInfo.js.map