import { Binding } from './ts-binding'

const binding = new Binding()
;(async function() {
  const x = await binding.query.users().id()
})()

// binding.mutation
//   .createUser({
//     data: {
//       name: 'some user',
//     },
//   })
//   .catch(e => console.error(e))

// binding.query .users(
//     {},
//     `
//       fragment Frogo on User {
//         id
//       }
//     `,
//   )
// ;(async function() {
//   const result = await binding.query
//     .users({
//       where: {
//         id: 'a5',
//       },
//     })
//     .friend()
//     .friend()
// })()
