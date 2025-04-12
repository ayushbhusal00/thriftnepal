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
    title: v.string(),
    description: v.string(),
    price: v.number(),
    brand: v.string(),
    images: v.array(v.id("_storage")), // Storage IDs from client uploads
  },
  handler: async (ctx, args) => {
    try {
      const productId = await ctx.db.insert("products", {
        title: args.title,
        description: args.description,
        price: args.price,
        brand: args.brand,
        images: args.images,
        status: "pending", // Explicit (schema default applies)
        rating: 0, // Explicit since schema can't set default
      });
      return productId;
    } catch (error) {
      console.error("Error inserting product:", error);
      throw new Error("Failed to add product");
    }
  },
});

// Fetch products with image URLs
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
          imageUrls: imageUrls.filter((url): url is string => url !== null), // Filter out null URLs
        };
      })
    );
  },
});
