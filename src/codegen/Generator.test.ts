import * as fs from 'fs'
import * as path from 'path'
import { buildSchema } from 'graphql'
import { Generator } from './Generator'
import test from 'ava'

const typeDefs = fs.readFileSync(
  path.join(__dirname, '../../src/codegen/fixtures/schema.graphql'),
  'utf-8',
)
test('basic generator', t => {
  const schema = buildSchema(typeDefs)
  const generator = new Generator({
    schema,
    inputSchemaPath: 'src/schema.js',
    outputBindingPath: 'src/generated/binding.js',
    isDefaultExport: false,
  })
  const result = generator.render()
  t.snapshot(result)
})
