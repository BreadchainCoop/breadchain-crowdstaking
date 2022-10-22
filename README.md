# Breadchain Crowdstaking

Frontend for interacting with the Breadchain Crowdstaking contract.

## Local Development

This project uses volta to pin specific versions of node and yarn. You can install it
[here](https://docs.volta.sh/guide/getting-started).

Create an `.env` file based on `.example.env`.

Then run:

```sh
# install dependencies and run the dev server
$ yarn && yarn dev

# or build for production
$ yarn build
```

### Hardhat

Run a chain locally and fund 3 wallets with DAI:

```sh
$ yarn hardhat:dev
```

Add a hardhat wallet to metamask to test application manually.

### Ethernal

To connect to ethernal and inspect blocks/transactions on your local chain set `ETHERNAL_EMAIL` and `ETHERNAL_PASSWORD` variables in your `.env`.

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
