"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var graphql_1 = require("graphql");
var info_1 = require("../info");
var addFragmentToInfo_1 = require("./addFragmentToInfo");
var info_test_1 = require("../info.test");
var removeKey_1 = require("./removeKey");
var _1 = require(".");
ava_1.test('addFragmentToInfo: add field by simple query', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    title: String\n    extraField: String\n  }\n  ");
    var info = info_1.buildInfoFromFragment('book', schema, 'query', "{ title }");
    var patchedInfo = addFragmentToInfo_1.addFragmentToInfo(info, '{extraField}');
    var selections = patchedInfo.fieldNodes[0].selectionSet.selections;
    info_test_1.assertFields(t, selections, ['title', 'extraField']);
});
ava_1.test('addFragmentToInfo: add field to array payload', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    books: [Book!]!\n  }\n\n  type Book {\n    title: String\n    extraField: String\n  }\n  ");
    var info = info_1.buildInfoFromFragment('books', schema, 'query', "{ title }");
    var patchedInfo = addFragmentToInfo_1.addFragmentToInfo(info, '{ extraField }');
    t.snapshot(_1.printDocumentFromInfo(patchedInfo));
    t.snapshot(getRelevantPartsFromInfo(info));
    t.snapshot(getRelevantPartsFromInfo(patchedInfo));
});
ava_1.test('addFragmentToInfo: add field by fragment', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    title: String\n    extraField: String\n  }\n  ");
    var info = info_1.buildInfoFromFragment('book', schema, 'query', "{ title }");
    var patchedInfo = addFragmentToInfo_1.addFragmentToInfo(info, 'fragment F on Book { extraField }');
    var selections = patchedInfo.fieldNodes[0].selectionSet.selections;
    info_test_1.assertFields(t, selections, ['title', 'extraField']);
});
ava_1.test("addFragmentToInfo: dont add field by fragment when type doesn't match", function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    title: String\n    extraField: String\n  }\n  ");
    var info = info_1.buildInfoFromFragment('book', schema, 'query', "{ title }");
    t.throws(function () {
        return addFragmentToInfo_1.addFragmentToInfo(info, 'fragment F on UnknownType { extraField }');
    });
});
function getRelevantPartsFromInfo(info) {
    var fragments = info.fragments, fieldName = info.fieldName, returnType = info.returnType, parentType = info.parentType, path = info.path, rootValue = info.rootValue, operation = info.operation, variableValues = info.variableValues, fieldNodes = info.fieldNodes;
    return {
        fragments: fragments,
        fieldName: fieldName,
        returnType: returnType.toString(),
        parentType: parentType.toString(),
        path: path,
        rootValue: rootValue,
        operation: operation,
        variableValues: variableValues,
        selectionSet: removeKey_1.omitDeep(fieldNodes[0].selectionSet, 'loc'),
    };
}
//# sourceMappingURL=addFragmentToInfo.test.js.map