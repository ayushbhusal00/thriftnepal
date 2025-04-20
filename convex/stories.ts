import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    userId: v.id("users"),
    imageUrl: v.array(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    //Add user authentication check here

    return await ctx.db.insert("stories", {
      userId: args.userId,
      imageUrl: [...args.imageUrl], // Spread the array of image URLs
    });
  },
});

export const deleteStory = mutation({
  args: {
    userId: v.id("users"),
    storyId: v.id("stories"),
  },
  handler: async (ctx, args) => {
    //Add user authentication check here

    const story = await ctx.db.get(args.storyId);
    if (!story) {
      throw new Error("Story not found");
    }

    await ctx.db.delete(args.storyId);
  },
});

export const listUserStories = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("stories")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const listOtherUserStories = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("stories")
      .filter((q) => q.neq(q.field("userId"), args.userId))
      .collect();
  },
});
