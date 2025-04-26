// convex/product.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate upload URLs for client-side image uploads
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Add product with storage IDs
export const addProduct = mutation({
  args: {
    images: v.array(v.id("_storage")),
    title: v.string(),
    category: v.string(),
    description: v.string(),
    size: v.string(),
    condition: v.string(),
    price: v.number(),
    brand: v.optional(v.string()),
    fabrics: v.optional(v.string()),
    highlights: v.optional(v.string()),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", {
      ...args,
      userId: args.userId,
      approved: false, // Default to false until approved
      sold: false, // Default to false until sold
    });
  },
});

export const getApprovedAndNotSoldProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db
      .query("products")
      .filter((q) =>
        q.and(q.eq(q.field("approved"), true), q.eq(q.field("sold"), false))
      )
      .collect();
    return Promise.all(
      products.map(async (product) => {
        const imageUrls = await Promise.all(
          product.images.map((storageId) => ctx.storage.getUrl(storageId))
        );
        return {
          ...product,
          imageUrls: imageUrls.filter((url): url is string => url !== null),
        };
      })
    );
  },
});
export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    return Promise.all(
      products.map(async (product) => {
        const imageUrls = await Promise.all(
          product.images.map((storageId) => ctx.storage.getUrl(storageId))
        );
        return {
          ...product,
          imageUrls: imageUrls.filter((url): url is string => url !== null),
        };
      })
    );
  },
});

export const getProductById = query({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const imageUrls = await Promise.all(
      product.images.map((storageId) => ctx.storage.getUrl(storageId))
    );
    return {
      ...product,
      imageUrls: imageUrls.filter((url): url is string => url !== null),
    };
  },
});

export const getMyProducts = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return Promise.all(
      products.map(async (product) => {
        const imageUrls = await Promise.all(
          product.images.map((storageId) => ctx.storage.getUrl(storageId))
        );
        return {
          ...product,
          imageUrls: imageUrls.filter((url): url is string => url !== null),
        };
      })
    );
  },
});

export const deleteProduct = mutation({
  args: {
    productId: v.id("products"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.userId !== args.userId) {
      throw new Error("Can only delete your own products");
    }

    await ctx.db.delete(args.productId);
  },
});

export const updateProduct = mutation({
  args: {
    productId: v.id("products"),
    images: v.optional(v.array(v.id("_storage"))),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    size: v.optional(v.string()),
    condition: v.optional(v.string()),
    price: v.optional(v.number()),
    brand: v.optional(v.string()),
    fabrics: v.optional(v.string()),
    highlights: v.optional(v.string()),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { productId, ...updates } = args;
    const product = await ctx.db.get(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.userId !== args.userId) {
      throw new Error("Can only update your own products");
    }

    await ctx.db.patch(productId, updates);
  },
});

export const markProductAsSold = mutation({
  args: {
    productId: v.id("products"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.userId !== args.userId) {
      throw new Error("Can only mark your own products as sold");
    }
    await ctx.db.patch(args.productId, { sold: true });
  },
});

export const markAnyProductAsSold = mutation({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    await ctx.db.patch(args.productId, { sold: true });
  },
});
