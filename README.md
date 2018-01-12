# graphql-binding

[![CircleCI](https://circleci.com/gh/graphcool/graphql-binding.svg?style=shield)](https://circleci.com/gh/graphcool/graphql-binding) [![npm version](https://badge.fury.io/js/graphql-binding.svg)](https://badge.fury.io/js/graphql-binding)

## Overview

🔗 GraphQL bindings are **modular building blocks** that allow to embed existing GraphQL APIs into your own GraphQL server. Think about it as turning (parts of) GraphQL APIs into reusable LEGO building blocks.

> The idea of GraphQL bindings is introduced in detail in this blog post: [Reusing & Composing GraphQL APIs with GraphQL Bindings](https://blog.graph.cool/80a4aa37cff5)

## Install

```sh
yarn add graphql-binding
```

## API

### `Binding`

#### `constructor: Binding`

#### `binding.query(...)` & `binding.mutation(...)`

#### `binding.subscription(...)`

## Example

```js
const { makeExecutableSchema } = require('graphql-tools')
const { Binding } = require('graphql-binding')

const users = [
  {
    name: 'Alice',
  },
  {
    name: 'Bob',
  },
]

const typeDefs = `
  type Query {
    findUser(name: String!): User
  }
  type User {
    name: String!
  }
`

const resolvers = {
  Query: {
    findUser: (parent, { name }) => users.find(u => u.name === name),
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const findUserBinding = new Binding({
  schema,
})

findUserBinding.findUser({ name: 'Bob' })
  .then(result => console.log(result))
```

You can find some examples here:

- [`graphql-binding-github`](https://github.com/graphcool/graphql-binding-github)
- [`graphcool-binding`](https://github.com/graphcool/graphcool-binding)