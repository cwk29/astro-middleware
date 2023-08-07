/// <reference types="astro/client" />

declare namespace App {
  import type { UserinfoResponse } from "openid-client";
  interface Locals {
    user: UserinfoResponse;
  }
}

interface ImportMetaEnv {
  readonly AUTH0_BASE_URL: string;
  readonly AUTH0_CLIENT_ID: string;
  readonly AUTH0_CLIENT_SECRET: string;
  readonly AUTH0_ISSUER_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// /**
//  * The user claims returned from the Auth0 API userinfo endpoint
//  * for more information see the [Auth0 docs](https://auth0.com/docs/users/user-profile-structure)
//  * @category Client
//  */
// export interface UserProfile {
//   email?: string | null;
//   email_verified?: boolean | null;
//   name?: string | null;
//   nickname?: string | null;
//   picture?: string | null;
//   sub?: string | null;
//   updated_at?: string | null;
//   org_id?: string | null;
//   [key: string]: unknown; // Any custom claim which could be in the profile
// }

// export interface User extends UserProfile {
//   app_metadata?: any;
//   user_metadata?: any;
// }
