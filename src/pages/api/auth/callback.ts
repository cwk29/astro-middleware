import type { APIRoute } from "astro";

export const get: APIRoute = async (context) => {
  return new Response(
    JSON.stringify({
      message: "Callback handler",
    }),
    { status: 200 }
  );
};
