## Usage with global packages

# NPM:

```bash
$ npm install -g prisma-binding typescript ts-node
$ prisma-binding --input prisma.graphql --language typescript --outputBinding prisma.ts
ts-node index.ts
```

# Yarn:

```bash
$ yarn global add prisma-binding typescript ts-node
$ graphql-binding --input prisma.graphql --language typescript --outputBinding prisma.ts
ts-node index.ts
```

## Usage with package scripts

# NPM

```bash
$ npm run generate
$ npm start
```

# Yarn

```bash
$ yarn run generate
$ yarn start
```
