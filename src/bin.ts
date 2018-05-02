#!/usr/bin/env node

import * as fs from 'fs'
import * as yargs from 'yargs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import { Generator } from './codegen/Generator'
import { TypescriptGenerator } from './codegen/TypescriptGenerator'
import { buildSchema, printSchema } from 'graphql'
require('ts-node').register()

const argv = yargs
  .usage(
    `Usage: $0 -s [schema] -e [endpoint] -h [headers] -g [generator] -t [target]`,
  )
  .options({
    input: {
      alias: 'i',
      describe: 'Path to schema.graphql, schema.js or schema.ts file',
      type: 'string',
    },
    generator: {
      alias: 'g',
      describe:
        'Type of the generator. Available generators: typescript, javascript',
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
  .demandOption(['i', 'g', 'o']).argv

run(argv)

async function run(argv) {
  const { input, generator, outputBinding, outputTypedefs } = argv

  const schema = getSchemaFromInput(input)
  const generatorInstance =
    generator === 'typescript'
      ? new TypescriptGenerator(schema)
      : new Generator(schema)
  const code = generatorInstance.render()

  mkdirp(path.dirname(outputBinding))
  fs.writeFileSync(outputBinding, code)

  if (outputTypedefs) {
    mkdirp(path.dirname(outputTypedefs))
    fs.writeFileSync(outputTypedefs, printSchema(schema))
  }

  console.log('Done generating binding')
}

function getSchemaFromInput(input) {
  if (input.endsWith('.graphql') || input.endsWith('.gql')) {
    return buildSchema(fs.readFileSync(input, 'utf-8'))
  }

  if (input.endsWith('.js') || input.endsWith('.ts')) {
    const schema = require(input)
    if (schema.default) {
      return schema.default
    }
    return schema
  }
}
