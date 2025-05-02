import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Maximum allowed image size in bytes (1 MB)
const MAX_IMAGE_SIZE = 1024 * 1024;

// Generate upload URLs for client-side image uploads
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Add product with storage IDs and size validation
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
    // Validate image sizes
    for (const storageId of args.images) {
      const metadata = await ctx.storage.getMetadata(storageId);
      if (!metadata) {
        throw new Error(`Image not found for storage ID: ${storageId}`);
      }
      if (metadata.size > MAX_IMAGE_SIZE) {
        throw new Error(
          `Image size exceeds limit of ${MAX_IMAGE_SIZE / 1024} KB`
        );
      }
    }

    return await ctx.db.insert("products", {
      ...args,
      userId: args.userId,
      approved: false,
      sold: false,
    });
  },
});

// Paginated query for approved and not sold products
export const getApprovedAndNotSoldProducts = query({
  args: {
    cursor: v.optional(v.union(v.string(), v.null())),
    pageSize: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("products")
      .filter((q) =>
        q.and(q.eq(q.field("approved"), true), q.eq(q.field("sold"), false))
      )
      .paginate({ cursor: args.cursor ?? null, numItems: args.pageSize });

    const products = await Promise.all(
      result.page.map(async (product) => {
        const imageUrls = await Promise.all(
          product.images.map((storageId) => ctx.storage.getUrl(storageId))
        );
        return {
          ...product,
          imageUrls: imageUrls.filter((url): url is string => url !== null),
        };
      })
    );

    return {
      products,
      isDone: !result.continueCursor,
      nextCursor: result.continueCursor || null,
    };
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

    // Validate image sizes if new images are provided
    if (updates.images) {
      for (const storageId of updates.images) {
        const metadata = await ctx.storage.getMetadata(storageId);
        if (!metadata) {
          throw new Error(`Image not found for storage ID: ${storageId}`);
        }
        if (metadata.size > MAX_IMAGE_SIZE) {
          throw new Error(
            `Image size exceeds limit of ${MAX_IMAGE_SIZE / 1024} KB`
          );
        }
      }
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
