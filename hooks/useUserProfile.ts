import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMemo } from "react";

type UserProfile = Doc<"users">;

interface UseUserProfileReturn {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
}

export function useUserProfile(): UseUserProfileReturn {
  const { user } = useUser();
  const clerkId = user?.id;

  const queryArgs = useMemo(() => (clerkId ? { clerkId } : "skip"), [clerkId]);

  const userProfile = useQuery(api.users.getUserByClerkId, queryArgs);

  const isLoading = clerkId ? userProfile === undefined : false;

  let error: Error | null = null;
  if (clerkId && userProfile instanceof Error) {
    error = userProfile;
  }

  return {
    userProfile: error || !clerkId || !userProfile ? null : userProfile,
    isLoading,
    error,
  };
}
