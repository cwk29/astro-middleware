# Astro Auth0 Middleware

A middleware implementation for Auth0 using the Authorization Code Flow and `openid-client`.

## Getting Started

### Installation

Using [npm](https://npmjs.org):

```sh
npm install astro-auth0 # not yet implemented
```

This library requires Node.js 16 LTS and newer LTS versions.

### Auth0 Configuration

Create a **Regular Web Application** in the [Auth0 Dashboard](https://manage.auth0.com/#/applications).

> **If you're using an existing application**, verify that you have configured the following settings in your Regular Web Application:
>
> - Click on the "Settings" tab of your application's page.
> - Scroll down and click on the "Show Advanced Settings" link.
> - Under "Advanced Settings", click on the "OAuth" tab.
> - Ensure that "JsonWebToken Signature Algorithm" is set to `RS256` and that "OIDC Conformant" is enabled.

Next, configure the following URLs for your application under the "Application URIs" section of the "Settings" page:

- **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
- **Allowed Logout URLs**: `http://localhost:3000/`

Take note of the **Client ID**, **Client Secret**, and **Domain** values under the "Basic Information" section. You'll need these values in the next step.

### Basic Setup

#### Configure the Application

You need to allow your Next.js application to communicate properly with Auth0. You can do so by creating a `.env.local` file under your root project directory that defines the necessary Auth0 configuration values as follows:

```bash
# The base url of your application
AUTH0_BASE_URL='http://localhost:3000'
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
```
