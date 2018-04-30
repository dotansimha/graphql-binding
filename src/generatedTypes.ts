import { Binding } from './Binding'

interface MyBinding {
  query: {
    test: () => Promise<string>
  }
}

const CustomBinding = addTypes<MyBinding>(Binding)
const binding = new Binding({ schema: null } as any)

interface Constructor<T> {
  new (...args): T
}

function addTypes<T>(binding: typeof Binding): Constructor<T> & Binding {
  return binding as any
}
