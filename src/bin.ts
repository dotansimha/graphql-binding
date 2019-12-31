#!/usr/bin/env node

import * as fs from 'fs'
import * as yargs from 'yargs'
import mkdirp from 'mkdirp'
import * as path from 'path'
import { Generator } from './codegen/Generator'
import { TypescriptGenerator } from './codegen/TypescriptGenerator'
import { buildSchema, printSchema } from 'graphql'

const argv = yargs
  .usage(
    `Usage: $0 -i [input] -l [language] -b [outputBinding] -t [outputTypedefs]`,
  )
  .options({
    input: {
      alias: 'i',
      describe: 'Path to schema.js or schema.ts file',
      type: 'string',
    },
    language: {
      alias: 'l',
      describe:
        'Type of the generator. Available languages: typescript, javascript',
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
  .demandOption(['i', 'l', 'b']).argv

run(argv).catch(e => console.error(e))

async function run(argv) {
  const { input, language, outputBinding, outputTypedefs } = argv

  const schema = getSchemaFromInput(input)
  const args = {
    ...schema,
    inputSchemaPath: path.resolve(input),
    outputBindingPath: path.resolve(outputBinding),
  }
  if (language === 'typescript') {
    require('ts-node').register()
  }
  const generatorInstance =
    language === 'typescript'
      ? new TypescriptGenerator(args)
      : new Generator(args)
  const code = generatorInstance.render()

  mkdirp.sync(path.dirname(outputBinding))
  fs.writeFileSync(outputBinding, code)

  if (outputTypedefs) {
    mkdirp.sync(path.dirname(outputTypedefs))
    fs.writeFileSync(outputTypedefs, printSchema(schema.schema))
  }

  console.log('Done generating binding')
}

function getSchemaFromInput(input) {
  if (input.endsWith('.graphql') || input.endsWith('.gql')) {
    const sdl = fs.readFileSync(path.resolve(input), 'utf-8')
    const schema = buildSchema(sdl)
    return {
      isDefaultExport: false,
      schema,
    }
  }

  if (input.endsWith('.js') || input.endsWith('.ts')) {
    if (input.endsWith('.ts')) {
      require('ts-node').register()
    }
    const schema = require(path.resolve(input))
    if (schema.default) {
      return {
        isDefaultExport: true,
        schema: schema.default,
      }
    }
    return {
      isDefaultExport: false,
      schema,
    }
  }

  throw new Error(`Can't handle schema ${input}`)
}
