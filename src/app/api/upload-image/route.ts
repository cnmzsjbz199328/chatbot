import { NextRequest, NextResponse } from 'next/server';
import { supabaseStorage } from '@/lib/supabaseStorage';

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

    // 验证图片文件类型
    const allowedImageTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml'
    ];

    if (!allowedImageTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Only image files are allowed (JPEG, PNG, GIF, WebP, SVG)' 
      }, { status: 400 });
    }

    // 限制文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image file too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // 上传到 Supabase Storage（使用默认 bucket，自环境变量读取）
    const uploadResult = await supabaseStorage.uploadFile(
      file,
      undefined, // buffer参数，这里我们让函数内部处理
      undefined, // 不显式传入，使用客户端默认的 bucket
      file.name,
      userId
    );

    if (!uploadResult.success) {
      return NextResponse.json({ 
        error: `Upload failed: ${uploadResult.error}` 
      }, { status: 500 });
    }

    // 返回成功信息
    return NextResponse.json({
      success: true,
      imageUrl: uploadResult.url,
      fileName: uploadResult.key,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error during image upload' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');
    const userId = request.headers.get('x-user-id');

    if (!fileName) {
      return NextResponse.json({ error: 'No fileName provided' }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'No userId provided' }, { status: 400 });
    }

    // 删除文件（使用默认 bucket）
    const deleteResult = await supabaseStorage.deleteFile(fileName);

    if (!deleteResult.success) {
      return NextResponse.json({ 
        error: `Delete failed: ${deleteResult.error}` 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Image delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error during image deletion' },
      { status: 500 }
    );
  }
}

