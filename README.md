# Breadchain Crowdstaking

Frontend for interacting with the Breadchain Crowdstaking contract

## Run Locally

This project uses volta to pin specific versions of node and yarn. You can install it
[here](https://docs.volta.sh/guide/getting-started).

Once you've created an `.env` file based on `.example.env`....

```sh
# install dependencies and run the dev server
$ yarn && yarn dev

# or build for production
$ yarn build
```

## Hardhat

Run a chain locally and fund 3 wallets with DAI

```sh
$ yarn hardhat:dev
```

## Storybook

```sh
# run the book
$ yarn storybook
```
