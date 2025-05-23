import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const createUser = internalMutation({
  args: {
    email: v.string(),
    clerkId: v.string(),
    imageUrl: v.optional(v.string()), // Optional image URL
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    username: v.union(v.string(), v.null()),
    role: v.optional(v.string()), // Optional role information
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      ...args,
      username: args.username || `${args.first_name} ${args.last_name}`,
      role: args.role || "user", // Default to "user" if role is not provided
    });
    console.log("creating user", args);
    return userId;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
});

export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
});
