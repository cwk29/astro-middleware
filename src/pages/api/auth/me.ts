import type { APIRoute } from "astro";

export const get: APIRoute = async ({ request, cookies, redirect }) => {
  // Get session from cookie
  const sessionCookie = cookies.get("session");
  if (!sessionCookie) {
    return new Response("No token found", { status: 401 });
  }
  return redirect("/");
};
