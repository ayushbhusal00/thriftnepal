import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function useStoreUser() {
  return useMutation(api.users.storeUser);
}
