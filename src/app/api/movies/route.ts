import { NextRequest } from "next/server";
import {
  fetchFromYTS,
  createSuccessResponse,
  createErrorResponse,
} from "../lib/yts-api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    const response = await fetchFromYTS("/list_movies.json", params);
    const data = await response.json();

    return createSuccessResponse(data);
  } catch (error) {
    return createErrorResponse("Failed to fetch movies from YTS API", error);
  }
}
