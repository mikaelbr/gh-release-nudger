# GitHub Release Stats Dashboard

A TekstTV-inspired dashboard for monitoring GitHub repository release status with authentication.

## Features

- **Release Status Monitoring**: Track time since unreleased work started
- **Draft Release Detection**: Visual warnings when releases are needed
- **Multi-Repository Support**: Monitor multiple repositories simultaneously
- **Changelog Viewer**: View latest releases with raw markdown content
- **Authentication**: Secret-based access control via query parameters
- **Auto-refresh**: Updates every 5 minutes with ISR caching

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# GitHub Personal Access Token (required)
GITHUB_TOKEN=your_github_token_here

# Comma-separated list of repositories to monitor (required)
GITHUB_REPOS=owner/repo1,owner/repo2,owner/repo3

# Hours threshold for release warnings (optional, default: 72)
RELEASE_HOURS_THRESHOLD=72

# Secret for authentication (optional - if not set, no auth required)
AUTH_SECRET=your-secret-key-here
```

## Authentication

If `AUTH_SECRET` is configured, all pages require authentication via a secret query parameter:

- **Access with secret**: `https://your-domain.com/?secret=your-secret-key`
- **Without secret**: Returns 401 Unauthorized

Navigation between pages preserves the secret parameter automatically.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
