# im-apps-utils

Shared utilities monorepo for IM Apps projects.

Packages:
- @igor-siergiej/api-utils — utilities for Node/API services
- @igor-siergiej/web-utils — utilities for frontend web apps

## Development

- Build all packages:

```bash
yarn build
```

## Publishing

Publishing is automated via GitHub Actions (manual dispatch).

- Where: Actions → Publish (manual) → Run workflow
- What it does (high level):
  - Derives the next patch version from the latest `v*` tag (or falls back to root `package.json`), ensuring uniqueness.
  - Bumps the root and all workspace `package.json` versions to that version and commits the change.
  - Builds all workspaces.
  - Publishes all non-private workspaces to GitHub Packages in topological order:
    - `yarn workspaces foreach -A --no-private --topological exec yarn npm publish --tolerate-republish`
  - Creates and pushes a `vX.Y.Z` git tag only if all publishes succeed.
  - If any package fails to publish, the job fails and no tag is created.

Required repository secrets:
- `PAT_TOKEN`: GitHub Personal Access Token with permission to publish to GitHub Packages (used as `PAT_TOKEN`, `NODE_AUTH_TOKEN`, and `YARN_NPM_AUTH_TOKEN`).

Notes:
- Registry is GitHub Packages (`https://npm.pkg.github.com`) and is configured via `.yarnrc.yml`.
- Dist-tag defaults to `latest` (no custom release channel is used).

### Manual local publish (optional)

If you need to publish locally instead of CI, you can still run:

```bash
# from repo root
cd packages/api-utils && yarn version patch && yarn npm publish
cd ../web-utils && yarn version patch && yarn npm publish
```

## Usage

Install in consumers (e.g. Shoppingo, jewellery-catalogue, kivo):

```bash
yarn add @igor-siergiej/api-utils @igor-siergiej/web-utils
```

Then import:

```ts
import { createPaginatedResponse } from '@igor-siergiej/api-utils';
import { cn } from '@igor-siergiej/web-utils';
```


