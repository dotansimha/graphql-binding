## Usage with global packages

# NPM:

```bash
$ npm install -g graphql-binding typescript ts-node
$ graphql-binding --input schema.ts --language typescript --outputBinding binding.ts
ts-node index.ts
```

# Yarn:

```bash
$ yarn global add graphql-binding typescript ts-node
$ graphql-binding --input schema.ts --language typescript --outputBinding binding.ts
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
