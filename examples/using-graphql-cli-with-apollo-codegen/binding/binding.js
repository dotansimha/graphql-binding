const { makeBindingClass } = require('graphql-binding')
const schema = require('../schema')

module.exports = makeBindingClass({ schema })
