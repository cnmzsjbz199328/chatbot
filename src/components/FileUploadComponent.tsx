'use client';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from './ui/button';

interface UploadedFile {
  id: number;
  file_name: string;
  createdAt: string;
}

export default function FileUploadComponent() {
  const { user } = useAuth();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing files on mount
  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user]);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/get-files', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!user) {
      setUploadMessage('请先登录');
      return;
    }

    // 验证文件类型（只支持PDF）
    if (file.type !== 'application/pdf') {
      setUploadMessage('只支持PDF格式的文件');
      return;
    }

    // 验证文件大小（限制为10MB）
    if (file.size > 10 * 1024 * 1024) {
      setUploadMessage('文件大小不能超过10MB');
      return;
    }

    setUploading(true);
    setUploadMessage('正在上传并处理文档...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadMessage(`文档上传成功！已处理${result.message.split('.')[1]?.trim() || '完成向量化处理'}`);
        
        // Refetch files to update list
        fetchFiles();
        
        // 清除输入
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setUploadMessage(`上传失败: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadMessage('上传过程中发生错误，请重试');
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const handleDelete = async (fileId: number) => {
    if (!confirm('确定要删除此文件吗？删除后相关向量数据也会被清除。')) {
      return;
    }

    setDeletingId(fileId);
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setUploadMessage('文件删除成功');
        fetchFiles(); // Refetch to update list
      } else {
        const error = await response.json();
        setUploadMessage(`删除失败: ${error.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setUploadMessage('删除过程中发生错误');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 文件上传区域 */}
      <div
        className={`flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
          dragActive 
            ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10' 
            : 'border-gray-600 bg-gray-700/50 hover:bg-gray-700'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
            {uploading ? 'sync' : 'cloud_upload'}
          </span>
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold">点击上传</span> 或拖拽文件至此
          </p>
          <p className="text-xs text-gray-500">
            支持PDF格式，用于AI个人资料学习（最大10MB）
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </div>

      {/* 上传状态消息 */}
      {uploadMessage && (
        <div className={`p-3 rounded-lg ${
          uploadMessage.includes('成功') 
            ? 'bg-green-800/20 text-green-400 border border-green-800' 
            : uploadMessage.includes('失败') || uploadMessage.includes('错误')
            ? 'bg-red-800/20 text-red-400 border border-red-800'
            : 'bg-blue-800/20 text-blue-400 border border-blue-800'
        }`}>
          <p className="text-sm">{uploadMessage}</p>
        </div>
      )}

      {/* 已上传文件列表 */}
      {files.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-3">已上传的文档：</p>
          <ul className="space-y-3">
            {files.map((file) => (
              <li key={file.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{file.file_name}</p>
                    <p className="text-xs text-gray-400">
                      上传时间: {formatDate(file.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleDelete(file.id)}
                    disabled={deletingId === file.id}
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                  >
                    {deletingId === file.id ? '删除中...' : '删除'}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 使用说明 */}
      <div className="bg-blue-800/10 border border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-400 mb-2">💡 功能说明</h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• 上传的PDF文档会被AI学习和理解</li>
          <li>• 访客可以通过聊天询问您的背景信息</li>
          <li>• 建议上传简历、个人介绍、项目说明等文档</li>
          <li>• 文档内容会被安全地存储在您的专属空间中</li>
        </ul>
      </div>
    </div>
  );
}
