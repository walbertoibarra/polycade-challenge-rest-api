# Polycade Engineering Node.js REST API Challenge

Find the original challenge instructions [here](https://github.com/polycade/challenge-rest-api).

## Get Set Up With A Development Environment

### Pre-Requisites

- [Node.js version 12.x](https://nodejs.org/en). (See `.nvmrc`)
  - You can also install it with [NVM](https://github.com/nvm-sh/nvm)

  ``` bash
  # Change directory to this repository.
  nvm install
  nvm use
  ```
- AWS IAM user (programmatic access) with permissions to:
  - API Gateway
  - S3
  - Lambda
  - RDS
- Docker

### How To Start

Using the right Node.js version, install all NPM dependencies.

``` bash
npm install
```

Copy `.env.example` into `.env` to have the required environment variables set for us on
development.

``` bash
cp .env.example .env
```

Use Docker to bring up a Postgres DB:

``` bash
docker-compose up -d
```

Run migrations and seeders:

``` bash
npm run migrate
npm run seed
```

Run the application:

``` bash
npm run watch
```

The application is now up and running at http://localhost:1337/.

## Deployments

This project uses CircleCI for automated deploys, on every new commit that lands on `master` this is
what will happen:

- Project gets built
- Linter and automated tests will run (todo)
- An approval is requested
- Migrations and seeders are ran if needed
- API Gateway endpoints are created, lambdas are deployed

> You can check all this on [.circleci/config.yml](.circleci/config.yml) and
[serverless.yml](serverless.yml).
