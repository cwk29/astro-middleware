import { Issuer, TokenSet, generators } from "openid-client";

export const redirectUri = import.meta.env.AUTH0_BASE_URL + "/api/auth/callback";

export const auth0Issuer = await Issuer.discover(import.meta.env.AUTH0_ISSUER_BASE_URL);
// console.log("Discovered issuer %s %O", auth0Issuer.issuer, auth0Issuer.metadata);

export const codeVerifier = generators.codeVerifier();

export const state = generators.state();

export const codeChallenge = generators.codeChallenge(codeVerifier);

export const client = new auth0Issuer.Client({
  client_id: import.meta.env.AUTH0_CLIENT_ID!,
  client_secret: import.meta.env.AUTH0_CLIENT_SECRET!,
  redirect_uris: [redirectUri],
  response_types: ["code"],
  // id_token_signed_response_alg (default "RS256")
  // token_endpoint_auth_method (default "client_secret_basic")
}); // => Client
