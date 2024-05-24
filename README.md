# Resala App

## Description

Resala App is an e-commerce app for selling women's clothes.

## Project Structure

Project is structured using monorepo architecture. It contains the following packages:

- `packages/web`: Angular app for the web client.
- `packages/server`: Node.js app for the server.
- `packages/shared`: Contains shared code between the client and server.
- `packages/dashboard`: React app for the admin dashboard.

## Development

_NOTE:_ This repository uses `yarn` as the package manager.

- To add a package, use `yarn workspace <package-name> add <package-name>`.

Example:

```bash
 yarn workspace @resala/web add typescript
```

- To run a script in a specific package, use `yarn workspace <package-name> <script-name>`.

Example:

```bash
 yarn workspace @resala/web ng serve --open
```

Please refer to the `package.json` files in each package for available scripts.

### Prerequisites

- Node.js
- Yarn
- Docker
- Docker Compose

### Setup

1. Clone the repository.
2. Run `yarn install` in the root directory to install dependencies.
