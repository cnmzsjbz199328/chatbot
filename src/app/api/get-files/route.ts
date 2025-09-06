import { NextRequest, NextResponse } from "next/server";
import { getFile } from "@/db";

export async function GET(request: NextRequest) {
    try {
        // 获取session_id从请求头
        const sessionId = request.headers.get('X-Session-Id');
        if (!sessionId) {
            return NextResponse.json(
                { error: 'X-Session-Id header is required' }, 
                { status: 400 }
            );
        }

        // 只返回当前session的文件
        const files = await getFile(sessionId);
        return NextResponse.json(files);
    } catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }
}