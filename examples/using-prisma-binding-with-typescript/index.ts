import { Prisma } from './prisma'

const binding = new Prisma({
  endpoint: 'https://eu1.prisma.sh/public-puddlerazor-shrieker-889738/hh/dev',
})

async function run() {
  const result = await binding.query.users({})
  console.log(result)
}

run().catch(e => console.error(e))
