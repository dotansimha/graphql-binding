"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var graphql_1 = require("graphql");
var Generator_1 = require("./Generator");
var ava_1 = require("ava");
var typeDefs = fs.readFileSync(path.join(__dirname, '../../src/codegen/fixtures/schema.graphql'), 'utf-8');
ava_1.test('basic generator', function (t) {
    var schema = graphql_1.buildSchema(typeDefs);
    var generator = new Generator_1.Generator({
        schema: schema,
        inputSchemaPath: 'src/schema.js',
        outputBindingPath: 'src/generated/binding.js',
        isDefaultExport: false,
    });
    var result = generator.render();
    t.snapshot(result);
});
//# sourceMappingURL=Generator.test.js.map