import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  key?: string;
}

export interface DeleteResult {
  success: boolean;
  error?: string;
}

export interface UserFile {
  name: string | undefined;
  key: string | undefined;
  size: number | undefined;
  lastModified: Date | undefined;
  url: string | undefined;
}

class SupabaseStorageClient {
  private s3: S3Client;
  private endpoint: string;
  private bucket: string;
  private publicBaseUrl: string;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL for storage public URL construction');
    }
    const projectHost = new URL(supabaseUrl).host; // e.g. phjuvvnhdasdvxmzyowg.supabase.co

    const endpoint = process.env.SUPABASE_S3_ENDPOINT || `https://${projectHost}/storage/v1/s3`;
    const accessKeyId = process.env.SUPABASE_S3_ACCESS_KEY;
    const secretAccessKey = process.env.SUPABASE_S3_SECRET_KEY;
    const region = process.env.SUPABASE_S3_REGION || 'ap-southeast-1';
    const bucket = process.env.SUPABASE_S3_BUCKET || 'pictureOfProject';

    this.endpoint = endpoint;
    this.bucket = bucket;
    this.publicBaseUrl = `https://${projectHost}/storage/v1/object/public`;

    this.s3 = new S3Client({
      region,
      credentials: accessKeyId && secretAccessKey ? { accessKeyId, secretAccessKey } : undefined,
      endpoint,
      forcePathStyle: true,
    });
  }
  
  /**
   * 上传文件到 Supabase Storage
   */
  async uploadFile(
    file: File | Buffer,
    buffer?: Buffer,
    bucket: string = this.bucket,
    fileName?: string,
    userId?: string
  ): Promise<UploadResult> {
    try {
      // 生成文件名
      const timestamp = Date.now();
      const name = typeof file === 'object' && 'name' in file ? file.name : fileName || `file_${timestamp}`;
      const fileExtension = typeof file === 'object' && 'name' in file ? 
        file.name.split('.').pop() : 'jpg';
      
      const key = userId ? `${userId}/${timestamp}_${name}` : `${timestamp}_${name}`;
      
      // 转换为 Buffer
      let fileBuffer: Buffer;
      if (buffer) {
        fileBuffer = buffer;
      } else if (Buffer.isBuffer(file)) {
        fileBuffer = file;
      } else {
        const arrayBuffer = await file.arrayBuffer();
        fileBuffer = Buffer.from(arrayBuffer);
      }

      const contentType = typeof file === 'object' && 'type' in file && file.type
        ? file.type
        : `image/${fileExtension}`;

      // 使用 S3 兼容 API 上传
      await this.s3.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      }));

      const publicUrl = `${this.publicBaseUrl}/${bucket}/${encodeURI(key)}`;

      return {
        success: true,
        url: publicUrl,
        key,
      };
      
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown upload error',
      };
    }
  }
  
  /**
   * 删除文件
   */
  async deleteFile(
    fileName: string,
    bucket: string = this.bucket
  ): Promise<DeleteResult> {
    try {
      await this.s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: fileName }));
      
      return { success: true };
      
    } catch (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown delete error',
      };
    }
  }
  
  /**
   * 列出用户文件
   */
  async listUserFiles(
    userId: string,
    bucket: string = this.bucket
  ): Promise<UserFile[]> {
    try {
      const res = await this.s3.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: `${userId}/` }));
      const items = (res.Contents || []).map(obj => ({
        name: obj.Key?.split('/').pop(),
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
        url: obj.Key ? `${this.publicBaseUrl}/${bucket}/${encodeURI(obj.Key)}` : undefined,
      }));
      return items;
      
    } catch (error) {
      console.error('List files error:', error);
      return [];
    }
  }
}

// 导出单例实例
export const supabaseStorage = new SupabaseStorageClient();
