import { NextResponse } from "next/server";

export const YTS_API_BASE = process.env.YTS_API_BASE || "https://yts.mx/api/v2";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "Pain Hub Movie App",
};

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const DEFAULT_TIMEOUT = 10000;

export interface YTSApiResponse<T = unknown> {
  status: string;
  status_message: string;
  data: T;
  "@meta": {
    server_time: number;
    server_timezone: string;
    api_version: number;
    execution_time: string;
  };
}

export interface YTSErrorResponse {
  status: "error";
  status_message: string;
  error?: string;
}

export async function fetchFromYTS(
  endpoint: string,
  params?: URLSearchParams
): Promise<Response> {
  const url = params
    ? `${YTS_API_BASE}${endpoint}?${params.toString()}`
    : `${YTS_API_BASE}${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: DEFAULT_HEADERS,
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT),
  });

  if (!response.ok) {
    throw new Error(`YTS API responded with status: ${response.status}`);
  }

  return response;
}

export function createSuccessResponse<T>(data: T): NextResponse<T> {
  return NextResponse.json(data, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

export function createErrorResponse(
  message: string,
  error?: unknown,
  status: number = 500
): NextResponse<YTSErrorResponse> {
  console.error("API Proxy Error:", error);

  return NextResponse.json(
    {
      status: "error",
      status_message: message,
      error: error instanceof Error ? error.message : "Unknown error",
    },
    { status }
  );
}

export function validateRequiredParam(
  value: string | null,
  paramName: string
): string {
  if (!value) {
    throw new Error(`${paramName} is required`);
  }
  return value;
}
