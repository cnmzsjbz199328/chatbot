import { NextRequest, NextResponse } from "next/server";
import { getFile } from "@/db";
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        // 1. 验证用户认证
        const user = await getAuthenticatedUser();
        
        // 2. 获取session_id（兼容模式）
        const sessionId = request.headers.get('X-Session-Id');
        
        // 3. 如果有用户认证，优先使用用户ID；否则回退到session模式
        if (!user && !sessionId) {
            return unauthorizedResponse();
        }

        // 4. 获取对应用户或session的文件
        const files = await getFile(sessionId || undefined, user?.id);
        return NextResponse.json(files);
    } catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }
}