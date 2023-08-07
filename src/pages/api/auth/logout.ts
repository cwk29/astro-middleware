import type { APIRoute } from "astro";

export const get: APIRoute = async ({ redirect, cookies }) => {
  console.log("Logging out from API");
  cookies.delete("session", {
    path: "/",
  });
  return redirect("/api/auth/logout");
};
