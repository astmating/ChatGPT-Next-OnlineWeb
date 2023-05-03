import { NextRequest, NextResponse } from "next/server";

const WEB_SEARCH_BASE_URL = process.env.WEB_SEARCH_BASE_URL;

async function makeRequest(req: NextRequest) {
  try {
    const content = req.nextUrl.searchParams.get("query");
    console.log(content);
    if (!console) return;
    console.log(WEB_SEARCH_BASE_URL);
    const query = encodeURIComponent(content!);
    const api = await fetch(
      `${WEB_SEARCH_BASE_URL}/search?q=${query}&max_results=3`,
    );
    const res = new NextResponse(api.body);
    res.headers.set("Content-Type", "application/json");
    res.headers.set("Cache-Control", "no-cache");
    return res;
  } catch (e) {
    console.error("[OpenAI] ", req.body, e);
    return NextResponse.json(
      {
        error: true,
        msg: JSON.stringify(e),
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req: NextRequest) {
  return makeRequest(req);
}

export const runtime = "edge";
