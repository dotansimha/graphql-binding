import { Binding } from './binding'

const binding = new Binding()

async function run() {
  const result = await binding.query.hello()
  console.log(result)
}

run().catch(e => console.error(e))
