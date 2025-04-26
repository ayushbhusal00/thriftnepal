import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Product } from "./schema";
export const addTransaction = mutation({
  args: {
    transaction_uuid: v.string(),
    cartItems: v.array(v.id("products")),
    userId: v.id("users"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("transactions", args);
  },
});

export const updateTransaction = mutation({
  args: {
    transaction_uuid: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("transaction_uuid"), args.transaction_uuid))
      .first();

    if (!transaction) {
      throw new Error(
        `Transaction with UUID ${args.transaction_uuid} not found`
      );
    }

    return await ctx.db.patch(transaction._id, {
      status: args.status,
    });
  },
});

export const getTransactionById = query({
  args: {
    transaction_uuid: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("transaction_uuid"), args.transaction_uuid))
      .first();
  },
});

export const getTransactionsByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});
