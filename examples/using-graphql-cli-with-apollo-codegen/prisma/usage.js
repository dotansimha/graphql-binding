const Prisma = require('./prisma')

const binding = new Prisma({
  endpoint: 'https://eu1.prisma.sh/lol/session65/dev',
})

binding.mutation
  .createUser(
    {
      data: {
        name: 'some user',
      },
    },
    '{id}',
  )
  .catch(e => console.error(e))

binding.query
  .users({}, '{id}')
  .then(r => {
    console.log(r)
  })
  .catch(e => console.error(e))
