import { GraphQLSchema } from 'graphql'
import flatten from './utils/flatten'
import { interleave } from './utils/interleave'
import { Interpolation } from './types'
import * as path from 'path'

export class Generator {
  schema: GraphQLSchema
  inputSchemaPath: string
  outputBindingPath: string

  constructor({
    schema,
    inputSchemaPath,
    outputBindingPath,
  }: {
    schema: GraphQLSchema
    inputSchemaPath: string
    outputBindingPath: string
  }) {
    this.schema = schema
    this.inputSchemaPath = inputSchemaPath
    this.outputBindingPath = outputBindingPath
  }
  render() {
    return this.compile`\
${this.renderImports()}

${this.renderExports()}`
  }
  compile(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<Generator>[]
  ) {
    return flatten<Generator>(interleave(strings, interpolations), this).join(
      '',
    )
  }
  getRelativeSchemaPath() {
    const result = path
      .relative(
        path.dirname(this.outputBindingPath) + '/',
        this.inputSchemaPath,
      )
      .replace(/\.(t|j)s$/, '')

    if (result.startsWith('.')) {
      return result
    }

    return `./` + result
  }
  renderImports() {
    return `\
const { makeBindingClass } = require('graphql-binding')
const schema = require('${this.getRelativeSchemaPath()}')`
  }
  renderExports() {
    return `module.exports = makeBindingClass({ schema })`
  }
}
