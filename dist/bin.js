#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var fs = require("fs");
var yargs = require("yargs");
var mkdirp = require("mkdirp");
var path = require("path");
var Generator_1 = require("./codegen/Generator");
var TypescriptGenerator_1 = require("./codegen/TypescriptGenerator");
var graphql_1 = require("graphql");
var argv = yargs
    .usage("Usage: $0 -i [input] -l [language] -b [outputBinding] -t [outputTypedefs]")
    .options({
    input: {
        alias: 'i',
        describe: 'Path to schema.js or schema.ts file',
        type: 'string',
    },
    language: {
        alias: 'l',
        describe: 'Type of the generator. Available languages: typescript, javascript',
        type: 'string',
    },
    outputBinding: {
        alias: 'b',
        describe: 'Output binding. Example: binding.ts',
        type: 'string',
    },
    outputTypedefs: {
        alias: 't',
        describe: 'Output type defs. Example: typeDefs.graphql',
        type: 'string',
    },
})
    .demandOption(['i', 'l', 'b']).argv;
run(argv).catch(function (e) { return console.error(e); });
function run(argv) {
    return __awaiter(this, void 0, void 0, function () {
        var input, language, outputBinding, outputTypedefs, schema, args, generatorInstance, code;
        return __generator(this, function (_a) {
            input = argv.input, language = argv.language, outputBinding = argv.outputBinding, outputTypedefs = argv.outputTypedefs;
            schema = getSchemaFromInput(input);
            args = __assign({}, schema, { inputSchemaPath: path.resolve(input), outputBindingPath: path.resolve(outputBinding) });
            if (language === 'typescript') {
                require('ts-node').register();
            }
            generatorInstance = language === 'typescript'
                ? new TypescriptGenerator_1.TypescriptGenerator(args)
                : new Generator_1.Generator(args);
            code = generatorInstance.render();
            mkdirp(path.dirname(outputBinding));
            fs.writeFileSync(outputBinding, code);
            if (outputTypedefs) {
                mkdirp(path.dirname(outputTypedefs));
                fs.writeFileSync(outputTypedefs, graphql_1.printSchema(schema.schema));
            }
            console.log('Done generating binding');
            return [2 /*return*/];
        });
    });
}
function getSchemaFromInput(input) {
    if (input.endsWith('.graphql') || input.endsWith('.gql')) {
        throw new Error('graphql-bindings 2.0 can only be generated based on an executable Schema exposed by a .js or .ts file');
    }
    if (input.endsWith('.js') || input.endsWith('.ts')) {
        if (input.endsWith('.ts')) {
            require('ts-node').register();
        }
        var schema = require(path.resolve(input));
        if (schema.default) {
            return {
                isDefaultExport: true,
                schema: schema.default,
            };
        }
        return {
            isDefaultExport: false,
            schema: schema,
        };
    }
    throw new Error("Can't handle schema " + input);
}
//# sourceMappingURL=bin.js.map