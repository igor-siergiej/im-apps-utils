# im-apps-utils

Shared utilities monorepo for IM Apps projects.

Packages:
- @im-apps/api-utils — utilities for Node/API services
- @im-apps/web-utils — utilities for frontend web apps

## Development

- Build all packages:

```bash
yarn build
```

## Publishing

Each package is versioned and published independently.

```bash
# from repo root
cd packages/api-utils && yarn version patch && yarn npm publish --access public
cd ../web-utils && yarn version patch && yarn npm publish --access public
```

### CI Publishing

Publishing is automated via GitHub Actions when you push a tag like `vX.Y.Z`, or via manual dispatch.

Required repository secrets:
- `NPM_TOKEN`: npm token with publish rights for `@im-apps/*` (Automation/Publish access).

Optional:
- Use tags (e.g. `v1.2.3`) to set the same version across all workspaces before publish.

Manual run:
- Actions → CI & Publish → Run workflow

### Release Workflow (creates tag)

Use the Release workflow to bump all workspace versions, commit, create a tag, and push. This tag triggers CI & Publish.

Steps:
- Go to Actions → Release (tag + push) → Run workflow
- Enter version (e.g. 1.2.3)
- The workflow will:
  - yarn version across all workspaces (no tag locally)
  - Commit the version bump
  - Create tag v1.2.3 and push it
  - CI & Publish picks up the tag and publishes the packages

## Usage

Install in consumers (e.g. Shoppingo, jewellery-catalogue, kivo):

```bash
yarn add @im-apps/api-utils @im-apps/web-utils
```

Then import:

```ts
import { createPaginatedResponse } from '@im-apps/api-utils';
import { cn } from '@im-apps/web-utils';
```


