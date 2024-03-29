import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get("path") || "/"
    revalidatePath(path)
    return NextResponse.json({revaldated: true, now: Date.now()})
}