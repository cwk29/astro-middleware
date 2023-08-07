import { defineMiddleware } from "astro/middleware";
import { state, codeVerifier, codeChallenge, client, auth0Issuer, redirectUri } from "./auth/client";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);

  const session = context.cookies.get("session");

  if (session.value) {
    context.locals.user = session.json().user;
  } else {
    context.locals.user = null;
  }

  if (pathname.startsWith("/api/auth/login")) {
    console.log("> Logging in");
    // store the code_verifier in your framework's session mechanism, if it is a cookie based solution
    // it should be httpOnly (not readable by javascript) and encrypted.
    context.cookies.set("code_verifier", codeVerifier, { httpOnly: true });

    // Store state locally to verify against response
    context.cookies.set("state", state, { httpOnly: true });

    const authorizationUrl = client.authorizationUrl({
      scope: "openid email profile",
      resource: auth0Issuer.authorization_endpoint as string,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    return context.redirect(authorizationUrl);
  }

  if (pathname.startsWith("/api/auth/callback")) {
    console.log("> Callback");

    const code_verifier = context.cookies.get("code_verifier").value;
    const state = context.cookies.get("state").value;

    const params = client.callbackParams(context.request as any);
    const tokenSet = await client.callback(redirectUri, params, { code_verifier, state });
    // console.log("received and validated tokens %j", tokenSet);
    // console.log("validated ID Token claims %j", tokenSet.claims());

    // Store session in cookie
    context.cookies.set("session", { ...tokenSet, user: tokenSet.claims() }, { path: "/" });

    return context.redirect("/");
  }

  if (pathname.startsWith("/api/auth/logout")) {
    console.log("> Logging out");

    const returnTo = import.meta.env.AUTH0_BASE_URL;

    context.cookies.delete("session", { path: "/" });

    try {
      const endSessionUrl = await client.endSessionUrl({
        id_token_hint: context.cookies.get("session").value,
        post_logout_redirect_uri: returnTo,
      });
      return context.redirect(endSessionUrl);
    } catch (err: any) {
      if (err.message !== "end_session_endpoint must be configured on the issuer") throw err;
      // this is most likely auth0, so let's try their logout endpoint.
      // @see: https://auth0.com/docs/api/authentication#logout
      // this is dirty and hack and reaches into guts of the oidc client
      // in ways I'd prefer not to.. but auth0 has this annoying non-conforming
      // session termination.
      const authority = import.meta.env.AUTH0_ISSUER_BASE_URL;
      if (authority.endsWith("auth0.com")) {
        const clientId = import.meta.env.AUTH0_CLIENT_ID;
        const url = `${authority}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
        return context.redirect(url);
      } else throw err;
    }
  }

  // return a Response or the result of calling `next()`
  return next();
});
