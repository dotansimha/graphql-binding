import { GraphQLSchema } from 'graphql'
import flatten from './utils/flatten'
import { interleave } from './utils/interleave'
import { Interpolation } from './types'
import * as path from 'path'

export class Generator {
  schema: GraphQLSchema
  inputSchemaPath: string
  outputBindingPath: string
  isDefaultExport: boolean

  constructor({
    schema,
    inputSchemaPath,
    outputBindingPath,
    isDefaultExport,
  }: {
    schema: GraphQLSchema
    inputSchemaPath: string
    outputBindingPath: string
    isDefaultExport: boolean
  }) {
    this.schema = schema
    this.inputSchemaPath = inputSchemaPath
    this.outputBindingPath = outputBindingPath
    this.isDefaultExport = isDefaultExport
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
    const result = path.posix
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
const schema = require('${this.getRelativeSchemaPath()}')${
      this.isDefaultExport ? '.default' : ''
    }`
  }
  renderExports() {
    return `module.exports = makeBindingClass({ schema })`
  }
}
