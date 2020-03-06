import { Binding } from './ts-binding'

const binding = new Binding()

// binding.mutation
//   .createUser({
//     data: {
//       name: 'some user',
//     },
//   })
//   .catch(e => console.error(e))

binding.query
  .users(
    {},
    `
      fragment Frogo on User {
        id
      }
    `,
  )
  .then(r => {
    console.log(r)
  })
  .catch(e => console.error(e))
