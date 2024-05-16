# Tebex - Headless Store Template

An integration of the Tebex Headless API built upon Nuxt, Vue 3 & Typescript for kickstarting your next store design.

## ⚡ Setup
Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Create a .env file

```bash
cp .env.example .env # Fill out all the necessary fields
```

## ⚙️ Configuring
Update config in `app.config.ts` with your custom configuration options for your webstore.

## 🎨 Changing the colour scheme 
There is a default theme for the webstore which is configurable.

Within the `assets/styles/theme.scss` file you can specify variable overrides.

```scss
// More information can be found here https://sass-lang.com/documentation/at-rules/use/#configuration
@forward "./settings" with (
  // Base settings
  $pure-black: #000000,
  $pure-white: #ffffff,

  // Background
  $background-100: #ffffff,
  $background-200: #f2f2f2,

  // Colour pallette
  $c-100: #e5e5e5,
  $c-200: #d1cfc6,
  $c-300: #cccccc,
  $c-400: #b2b2b2,
  $c-500: #7f7f7f,
  $c-600: #666666,
  $c-700: #4d4d4d,
  $c-800: #333333,
  $c-900: #1a1a1a,

  $text-high-emphasis-color: #000000,
  $text-base-color: #000000,
  $modal-close-color: #000000
);
```

## 🚀 Deploying 
Once you're ready to deploy your new store we recommend using a serverless platform such as [Cloudflare Pages](https://pages.cloudflare.com/). They have documentation for [deploying a Nuxt site](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/) which only takes a few minutes to get setup.

As stated in the nuxt documentation the .env file will not be read by the server when deployed. You will need to specifiy these for the server at runtime.

- https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables
- https://nuxt.com/docs/guide/directory-structure/env#production-preview

## 👩‍💻 Development

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Building for Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

#### Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## 🔗 Useful Links

- [Headless API Documentation](https://docs.tebex.io/developers/headless-api/overview)
- [Tebex.js Documentation](https://docs.tebex.io/developers/tebex.js)
- [Nuxt](https://nuxt.com/docs)
- [Vue 3](https://vuejs.org/guide/introduction.html)

## 🙋‍♂️ Support
For issues relating to this template (https://github.com/tebexio/Headless-Template) please contact [support@tebex.io.](mailto:support@tebex.io)
