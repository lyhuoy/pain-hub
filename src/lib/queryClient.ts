import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 minutes cache time
      staleTime: 1000 * 60 * 5,
      // 10 minutes garbage collection
      gcTime: 1000 * 60 * 10,
      // Retry failed requests 2 times
      retry: 2,
      // Don't refetch on window focus in development
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
      // Don't refetch on reconnect if data is fresh
      refetchOnReconnect: "always",
    },
    mutations: {
      retry: false,
    },
  },
});

// Query Keys for consistent cache management
export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (filters: object) => [...movieKeys.lists(), filters] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: number) => [...movieKeys.details(), id] as const,
  suggestions: (id: number) => [...movieKeys.all, "suggestions", id] as const,
  parentalGuides: (id: number) =>
    [...movieKeys.all, "parental-guides", id] as const,
} as const;
