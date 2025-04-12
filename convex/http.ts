import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
const http = httpRouter();
export const doSomething = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();
  // implementation will be here
  console.log(`Do Something`);
  switch (type) {
    case "user.created":
      await ctx.runMutation(internal.users.createUser, {
        email: data.email_addresses[0].email_address,
        clerkId: data.id,
        imageUrl: data.image_url,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
      });
      break;

    case "user.updated":
      console.log("user updated");
      break;
  }
  return new Response(null, { status: 200 });
});

export default http;
//https://combative-vulture-199.convex.site
// https://<your deployment name>.convex.site (e.g. https://happy-animal-123.convex.site).

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: doSomething,
});
//https://combative-vulture-199.convex.site/clerk-users-webhook
