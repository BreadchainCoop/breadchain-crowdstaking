# Breadchain Crowdstaking

Frontend for interacting with the Breadchain Crowdstaking contract

## Local Development

This project uses volta to pin specific versions of node and yarn. You can install it
[here](https://docs.volta.sh/guide/getting-started).

Once you've created an `.env` file based on `.example.env`....

```sh
# install dependencies and run the dev server
$ yarn && yarn dev

# or build for production
$ yarn build
```

### Hardhat

Run a chain locally and fund 3 wallets with DAI

```sh
$ yarn hardhat:dev
```

Add a hardhat wallet to metamask to test application manually.

### Tests

Run e2e tests against local hardhat node. This script kills anything running on `localhost:8545` so tests can be run against a fresh clone of the chain.

```sh
$ yarn e2e:local
```

### Storybook

```sh
# run the book
$ yarn storybook
```
