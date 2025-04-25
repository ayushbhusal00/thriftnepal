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
export const list = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all stories
    const stories = await ctx.db.query("stories").collect();

    // Fetch all users
    const users = await ctx.db.query("users").collect();

    // Create a map of userId to user data for quick lookup
    const userMap = new Map(users.map((user) => [user._id, user]));

    // Group stories by userId and resolve image URLs
    const storiesByUser = new Map();

    for (const story of stories) {
      if (!storiesByUser.has(story.userId)) {
        storiesByUser.set(story.userId, []);
      }
      // Resolve each imageUrl in the story's imageUrl array (storage IDs)
      const resolvedImageUrls = await Promise.all(
        story.imageUrl.map(async (storageId) => {
          try {
            return await ctx.storage.getUrl(storageId);
          } catch (error) {
            console.warn(`Invalid storage ID: ${storageId}`, error);
            return null;
          }
        })
      );
      // Filter out any null URLs
      const validImageUrls = resolvedImageUrls.filter((url) => url !== null);
      storiesByUser.get(story.userId).push(...validImageUrls);
    }

    // Build the final result
    const result = [];
    for (const [userId, storyImageUrls] of storiesByUser) {
      const user = userMap.get(userId);
      if (user) {
        // Use the user's imageUrl directly (external URL)
        const userImageUrl = user.imageUrl || null;
        result.push({
          userId,
          storyImageUrls, // Array of resolved story image URLs
          userImageUrl, // User's external profile image URL
        });
      }
    }

    return result;
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
