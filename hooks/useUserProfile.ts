import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel"; // Import Convex types

// Use Convex's generated type for the users table
type UserProfile = Doc<"users">;

// Define the return type for the hook
interface UseUserProfileReturn {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
}

export function useUserProfile(): UseUserProfileReturn {
  const { user } = useUser();
  const clerkId = user?.id;

  // Only run the query if clerkId exists (i.e., user is signed in)
  const userProfile = useQuery(
    api.users.getUserByClerkId,
    clerkId ? { clerkId } : "skip" // Use "skip" to disable query when no clerkId
  );

  // Determine loading state: useQuery returns undefined while loading
  const isLoading = clerkId ? userProfile === undefined : false;

  // Handle errors (useQuery may return an Error object)
  let error: Error | null = null;
  if (clerkId && userProfile instanceof Error) {
    error = userProfile;
  }

  return {
    userProfile: error || !userProfile ? null : userProfile, // Return the full query result
    isLoading,
    error,
  };
}
