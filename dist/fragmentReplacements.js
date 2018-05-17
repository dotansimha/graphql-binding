"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractFragmentReplacements(resolvers) {
    var fragmentReplacements = [];
    for (var typeName in resolvers) {
        var fieldResolvers = resolvers[typeName];
        for (var fieldName in fieldResolvers) {
            var fieldResolver = fieldResolvers[fieldName];
            if (typeof fieldResolver === 'object' && fieldResolver.fragment) {
                fragmentReplacements.push({
                    field: fieldName,
                    fragment: fieldResolver.fragment,
                });
            }
        }
    }
    return fragmentReplacements;
}
exports.extractFragmentReplacements = extractFragmentReplacements;
//# sourceMappingURL=fragmentReplacements.js.map