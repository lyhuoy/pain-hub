import { NextRequest } from "next/server";
import {
  fetchFromYTS,
  createSuccessResponse,
  createErrorResponse,
  validateRequiredParam,
} from "../../../lib/yts-api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Validate required movie_id parameter
    validateRequiredParam(searchParams.get("movie_id"), "Movie ID");

    // Forward all query parameters to YTS API
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    const response = await fetchFromYTS("/movie_suggestions.json", params);
    const data = await response.json();

    return createSuccessResponse(data);
  } catch (error) {
    if (error instanceof Error && error.message.includes("required")) {
      return createErrorResponse(error.message, error, 400);
    }
    return createErrorResponse(
      "Failed to fetch movie suggestions from YTS API",
      error
    );
  }
}
