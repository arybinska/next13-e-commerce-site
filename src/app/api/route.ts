import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(_request: NextRequest): Promise<Response> {
	return NextResponse.json("Hello from Next13masters");
}
