"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var graphql_1 = require("graphql");
var FlowGenerator_1 = require("./FlowGenerator");
var ava_1 = require("ava");
var typeDefs = fs.readFileSync(path.join(__dirname, '../../src/codegen/fixtures/schema.graphql'), 'utf-8');
ava_1.test('flow generator', function (t) {
    var schema = graphql_1.buildSchema(typeDefs);
    var generator = new FlowGenerator_1.FlowGenerator({
        schema: schema,
        inputSchemaPath: 'src/schema.js',
        outputBindingPath: 'src/generated/binding.js',
        isDefaultExport: false,
    });
    var result = generator.render();
    t.snapshot(result);
});
//# sourceMappingURL=FlowGenerator.test.js.map