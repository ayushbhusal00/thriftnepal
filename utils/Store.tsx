import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "./Types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavouriteState {
  favourites: Product[];
  favouritesCount: number;
  addFavourites: (newProduct: Product) => void;
  removeFavourites: (productId: string) => void;
  removeAllFavourites: () => void;
  updateFavourites: (newFavourites: Product[]) => void;
}

export const useFavourites = create<FavouriteState>()(
  persist(
    (set) => ({
      favourites: [],
      favouritesCount: 0,
      addFavourites: (newProduct: Product) =>
        set((state) => {
          if (
            state.favourites.some((product) => product._id === newProduct._id)
          ) {
            return state;
          }
          return {
            favourites: [...state.favourites, newProduct],
            favouritesCount: state.favouritesCount + 1,
          };
        }),
      removeFavourites: (productId: string) =>
        set((state) => {
          const newFavourites = state.favourites.filter(
            (product) => product._id !== productId
          );
          return {
            favourites: newFavourites,
            favouritesCount: newFavourites.length,
          };
        }),
      removeAllFavourites: () => set({ favourites: [], favouritesCount: 0 }),
      updateFavourites: (newFavourites: Product[]) =>
        set({
          favourites: newFavourites,
          favouritesCount: newFavourites.length,
        }),
    }),
    {
      name: "favourites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

interface CartState {
  cart: Product[];
  cartCount: number;
  selectedItems: string[];
  addCart: (newProduct: Product) => void;
  removeCart: (productId: string) => void;
  removeAllCart: () => void;
  updateCart: (newCart: Product[]) => void;
  toggleItemSelection: (productId: string) => void;
  selectAllItems: () => void;
  deselectAllItems: () => void;
  removeSelectedItems: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      cartCount: 0,
      selectedItems: [],
      addCart: (newProduct: Product) =>
        set((state) => {
          if (!newProduct._id || !newProduct.title || !newProduct.price) {
            return state;
          }
          if (state.cart.some((product) => product._id === newProduct._id)) {
            return state;
          }
          return {
            cart: [...state.cart, newProduct],
            cartCount: state.cartCount + 1,
          };
        }),

      removeCart: (productId: string) =>
        set((state) => {
          const newCart = state.cart.filter(
            (product) => product._id !== productId
          );
          return {
            cart: newCart,
            cartCount: newCart.length,
            selectedItems: state.selectedItems.filter((id) => id !== productId),
          };
        }),
      removeAllCart: () => set({ cart: [], cartCount: 0, selectedItems: [] }),
      updateCart: (newCart: Product[]) =>
        set({ cart: newCart, cartCount: newCart.length }),
      toggleItemSelection: (productId: string) =>
        set((state) => ({
          selectedItems: state.selectedItems.includes(productId)
            ? state.selectedItems.filter((id) => id !== productId)
            : [...state.selectedItems, productId],
        })),
      selectAllItems: () =>
        set((state) => ({
          selectedItems: state.cart.map((item) => item._id),
        })),
      deselectAllItems: () => set({ selectedItems: [] }),
      removeSelectedItems: () =>
        set((state) => {
          const newCart = state.cart.filter(
            (product) => !state.selectedItems.includes(product._id)
          );
          return {
            cart: newCart,
            cartCount: newCart.length,
            selectedItems: [],
          };
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
