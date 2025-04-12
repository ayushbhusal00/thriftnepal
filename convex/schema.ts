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

export const Product = {
  title: v.string(),
  description: v.string(),
  price: v.number(),
  brand: v.string(),
  images: v.array(v.id("_storage")), // Multiple images
  status: v.union(
    v.literal("pending"),
    v.literal("approved"),
    v.literal("rejected")
  ),
  rating: v.number(),
};

export default defineSchema({
  tasks: defineTable({
    _id: v.id("tasks"),
    text: v.string(),
    isCompleted: v.optional(v.boolean()),
  }),
  users: defineTable(User),
  products: defineTable(Product),
});
