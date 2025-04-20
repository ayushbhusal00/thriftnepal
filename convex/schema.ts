// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const User = {
  email: v.string(),
  clerkId: v.string(), // Clerk user ID
  imageUrl: v.optional(v.string()), // Optional image URL
  first_name: v.optional(v.string()),
  last_name: v.optional(v.string()),
  username: v.union(v.string(), v.null()),
};

export const Story = {
  userId: v.id("users"),
  imageUrl: v.array(v.id("_storage")), // Multiple images
};

export const Product = {
  images: v.array(v.id("_storage")),
  title: v.string(),
  category: v.string(),
  description: v.string(),
  size: v.string(),
  condition: v.string(),
  price: v.number(),
  approved: v.boolean(),
  brand: v.optional(v.string()),
  fabrics: v.optional(v.string()),
  highlights: v.optional(v.string()),
  userId: v.id("users"),
};

export default defineSchema({
  users: defineTable(User),
  products: defineTable(Product).index("by_user", ["userId"]),
  stories: defineTable(Story).index("by_user", ["userId"]),
});
