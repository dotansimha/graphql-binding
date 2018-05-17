"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var graphql_1 = require("graphql");
var TypescriptGenerator_1 = require("./TypescriptGenerator");
var ava_1 = require("ava");
var typeDefs = fs.readFileSync(path.join(__dirname, '../../src/codegen/fixtures/schema.graphql'), 'utf-8');
ava_1.test('typescript generator', function (t) {
    var schema = graphql_1.buildSchema(typeDefs);
    var generator = new TypescriptGenerator_1.TypescriptGenerator({
        schema: schema,
        inputSchemaPath: 'src/schema.js',
        outputBindingPath: 'src/generated/binding.js',
        isDefaultExport: false,
    });
    var result = generator.render();
    t.snapshot(result);
});
//# sourceMappingURL=TypescriptGenerator.test.js.map