"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var graphql_1 = require("graphql");
var info_1 = require("./info");
var removeKey_1 = require("./utils/removeKey");
var utils_1 = require("./utils");
ava_1.test('buildInfoForAllScalars: 1 field', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    title: String\n  }\n  ");
    var info = info_1.buildInfoForAllScalars('book', schema, 'query');
    var selections = info.fieldNodes[0].selectionSet.selections;
    assertFields(t, selections, ['title']);
});
ava_1.test('buildInfoForAllScalars: 2 fields', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    title: String\n    number: Float\n  }\n  ");
    var info = info_1.buildInfoForAllScalars('book', schema, 'query');
    var selections = info.fieldNodes[0].selectionSet.selections;
    assertFields(t, selections, ['title', 'number']);
    t.is(info.fieldName, 'book');
});
ava_1.test('buildInfoForAllScalars: excludes object type fields', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    title: String\n    number: Float\n    otherBook: Book\n  }\n  ");
    var info = info_1.buildInfoForAllScalars('book', schema, 'query');
    var selections = info.fieldNodes[0].selectionSet.selections;
    assertFields(t, selections, ['title', 'number']);
    t.is(info.fieldName, 'book');
});
ava_1.test('buildInfoForAllScalars: enums', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    color: Color\n  }\n\n  enum Color { Red, Blue }\n  ");
    var info = info_1.buildInfoForAllScalars('book', schema, 'query');
    var selections = info.fieldNodes[0].selectionSet.selections;
    assertFields(t, selections, ['color']);
});
ava_1.test('buildInfoForAllScalars: minimal static root field', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    count: Int\n  }\n  ");
    var info = info_1.buildInfoForAllScalars('count', schema, 'query');
    t.is(info.fieldNodes.length, 1);
});
ava_1.test('buildInfoForAllScalars: mutation', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Int # use name root field name but different type\n  }\n\n  type Mutation {\n    book: Book\n  }\n\n  type Book {\n    title: String\n  }\n  ");
    var info = info_1.buildInfoForAllScalars('book', schema, 'mutation');
    var selections = info.fieldNodes[0].selectionSet.selections;
    assertFields(t, selections, ['title']);
});
ava_1.test('buildInfoForAllScalars: throws error when field not found', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    count: Int\n  }\n  ");
    t.throws(function () { return info_1.buildInfoForAllScalars('other', schema, 'query'); });
});
ava_1.test('buildInfoFromFragment: 1 field', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    title: String\n  }\n  ");
    var info = info_1.buildInfoFromFragment('book', schema, 'query', "{ title }");
    var selections = info.fieldNodes[0].selectionSet.selections;
    assertFields(t, selections, ['title']);
});
ava_1.test('buildInfoFromFragment: nested', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    title: String\n    otherBook: Book\n  }\n  ");
    var fragment = "{ title otherBook { otherBook { title } } }";
    var info = info_1.buildInfoFromFragment('book', schema, 'query', fragment);
    var selections = info.fieldNodes[0].selectionSet.selections;
    t.is(selections[0].name.value, 'title');
    t.is(selections[1].name.value, 'otherBook');
    t.is(selections[1].selectionSet.selections[0].name.value, 'otherBook');
    t.is(selections[1].selectionSet.selections[0].selectionSet.selections[0].name
        .value, 'title');
});
ava_1.test('buildInfoFromFragment: invalid selection', function (t) {
    var schema = graphql_1.buildSchema("\n  type Query {\n    book: Book\n  }\n\n  type Book {\n    title: String\n  }\n  ");
    t.throws(function () { return info_1.buildInfoFromFragment('book', schema, 'query', "{ xxx }"); });
});
ava_1.test('makeSubInfo: works when path has been selected', function (t) {
    var schema = graphql_1.buildSchema("\n    type Query {\n      book: Book\n    }\n\n    type Book {\n      title: String\n      extraField: String\n      page: Page\n    }\n\n    type Page {\n      content: String\n      wordCount: Int\n    }\n  ");
    var info = info_1.buildInfoFromFragment('book', schema, 'query', "{ title page { content wordCount } }");
    var subInfo = info_1.makeSubInfo(info, 'page');
    t.snapshot(utils_1.printDocumentFromInfo(subInfo));
    t.snapshot(getRelevantPartsFromInfo(subInfo));
});
ava_1.test('makeSubInfo: works when path has been selected and adds fragment', function (t) {
    var schema = graphql_1.buildSchema("\n    type Query {\n      book: Book\n    }\n\n    type Book {\n      title: String\n      extraField: String\n      page: Page\n    }\n\n    type Page {\n      content: String\n      wordCount: Int\n    }\n  ");
    var info = info_1.buildInfoFromFragment('book', schema, 'query', "{ title page { content } }");
    var subInfo = info_1.makeSubInfo(info, 'page', 'fragment Frag on Page { wordCount }');
    t.snapshot(utils_1.printDocumentFromInfo(subInfo));
});
ava_1.test('makeSubInfo: works with inline fragment', function (t) {
    var schema = graphql_1.buildSchema("\n    type Query {\n      book: Book\n    }\n\n    type Book {\n      title: String\n      extraField: String\n      page: Page\n    }\n\n    type Page {\n      content: String\n      wordCount: Int\n    }\n  ");
    var info = info_1.buildInfoFromFragment('book', schema, 'query', "{ title ... on Book { page { content } } }");
    var subInfo = info_1.makeSubInfo(info, 'page');
    t.snapshot(utils_1.printDocumentFromInfo(subInfo));
    t.snapshot(getRelevantPartsFromInfo(subInfo));
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
ava_1.test('makeSubInfo: returns null when path has not been selected', function (t) {
    var schema = graphql_1.buildSchema("\n    type Query {\n      book: Book\n    }\n\n    type Book {\n      title: String\n      extraField: String\n      page: Page\n    }\n\n    type Page {\n      content: String\n      wordCount: Int\n    }\n  ");
    var info = info_1.buildInfoFromFragment('book', schema, 'query', "{ title }");
    var subInfo = info_1.makeSubInfo(info, 'page');
    t.is(subInfo, null);
});
function assertFields(t, selections, names) {
    var fields = names.map(function (value) { return ({
        kind: 'Field',
        name: { kind: 'Name', value: value },
    }); });
    var _loop_1 = function (field) {
        t.true(selections.some(function (s) { return s.kind === 'Field' && s.name.value === field.name.value; }));
    };
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var field = fields_1[_i];
        _loop_1(field);
    }
    t.is(selections.length, names.length);
}
exports.assertFields = assertFields;
//# sourceMappingURL=info.test.js.map