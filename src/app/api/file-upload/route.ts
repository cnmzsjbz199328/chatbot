import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const userId: string | null = data.get('userId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'No userId provided' }, { status: 400 });
    }

    // 验证文件类型
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/markdown',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
    }

    // 限制文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 创建唯一文件名
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const uploadDir = join(process.cwd(), 'public/uploads', userId);
    
    // 确保目录存在
    try {
      const { mkdirSync } = await import('fs');
      mkdirSync(uploadDir, { recursive: true });
    } catch (error) {
      console.log('Directory creation error:', error);
    }

    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // 返回文件信息
    return NextResponse.json({
      id: timestamp.toString(),
      filename: fileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
      url: `/uploads/${userId}/${fileName}`,
      uploadTime: new Date().toISOString()
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
