import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
      refetchOnReconnect: "always",
    },
    mutations: {
      retry: false,
    },
  },
});

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
