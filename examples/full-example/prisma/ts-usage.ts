import { Prisma } from './ts-prisma'
import gql from 'graphql-tag'
import { CreateUserFragment } from '../typings'

async function run() {
  const binding = new Prisma({
    endpoint: 'https://eu1.prisma.sh/lol/session65/dev',
  })

  setTimeout(async () => {
    const createResult = await binding.mutation.createUser<CreateUserFragment>(
      {
        data: {
          name: 'some user',
        },
      },
      gql`
        fragment CreateUser on User {
          id
        }
      `,
    )
    console.log(createResult)
  }, 3000)

  // const subscription = await binding.subscription.user(
  //   {},
  //   gql`
  //     {
  //       node {
  //         id
  //       }
  //     }
  //   `,
  // )
  // subscription.next().then(res => {
  //   console.log('got some value')
  //   console.log(res)
  // })
}

run()
