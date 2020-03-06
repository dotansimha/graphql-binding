const { buildSchema } = require('graphql')
const fs = require('fs')
const { addMockFunctionsToSchema } = require('graphql-tools')

const schema = buildSchema(
  fs.readFileSync(__dirname + '/schema.graphql', 'utf-8'),
)

addMockFunctionsToSchema({ schema })

module.exports = schema
