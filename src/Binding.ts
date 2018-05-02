import {
  QueryMap,
  BindingOptions,
  SubscriptionMap /*, Operation*/,
  QueryOrMutation,
} from './types'
import { Delegate } from './Delegate'

// to avoid recreation on each instantiation for the same schema, we cache the created methods
const methodCache = new Map()

export class Binding extends Delegate {
  query: QueryMap
  mutation: QueryMap
  subscription: SubscriptionMap

  constructor({ schema, fragmentReplacements, before }: BindingOptions) {
    super({ schema, fragmentReplacements, before })

    const { query, mutation, subscription } = this.buildMethods()
    this.query = query
    this.mutation = mutation
    this.subscription = subscription
  }

  buildMethods() {
    const cachedMethods = methodCache.get(this.schema)
    if (cachedMethods) {
      return cachedMethods
    }
    const methods = {
      query: this.buildQueryMethods('query'),
      mutation: this.buildQueryMethods('mutation'),
      subscription: this.buildSubscriptionMethods(),
    }
    methodCache.set(this.schema, methods)
    return methods
  }

  buildQueryMethods(operation: QueryOrMutation): QueryMap {
    const queryType = this.schema.getQueryType()
    if (!queryType) {
      return {}
    }
    const fields = queryType.getFields()
    return Object.entries(fields)
      .map(([fieldName, field]) => {
        return {
          key: fieldName,
          value: (args, info, options) => {
            return this.delegate(operation, fieldName, args, info, options)
          },
        }
      })
      .reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
  }

  buildSubscriptionMethods(): SubscriptionMap {
    const queryType = this.schema.getQueryType()
    if (!queryType) {
      return {}
    }
    const fields = queryType.getFields()
    return Object.entries(fields)
      .map(([fieldName, field]) => {
        return {
          key: fieldName,
          value: (args, info, options) => {
            return this.delegateSubscription(fieldName, args, info, options)
          },
        }
      })
      .reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
  }
}
