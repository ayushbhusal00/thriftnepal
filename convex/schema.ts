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
  role: v.optional(v.string()), // New field to store the user's role
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
  approved: v.optional(v.boolean()),
  brand: v.optional(v.string()),
  fabrics: v.optional(v.string()),
  highlights: v.optional(v.string()),
  userId: v.id("users"),
  sold: v.optional(v.boolean()), // New field to track if the product is sold
};

// A transaction schema with "transaction_uuid": "ntzzyzd6q", cartItems:[Product]
export const Transaction = {
  transaction_uuid: v.string(),
  cartItems: v.array(v.id("products")),
  userId: v.id("users"),
  status: v.string(), // New field to track the status of the transaction
};

export default defineSchema({
  users: defineTable(User),
  products: defineTable(Product).index("by_user", ["userId"]),
  stories: defineTable(Story).index("by_user", ["userId"]),
  transactions: defineTable(Transaction).index("by_user", ["userId"]),
});
