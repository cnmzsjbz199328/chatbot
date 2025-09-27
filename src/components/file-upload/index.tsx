'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import { UploadedFile } from './types';
import FileUploader from './FileUploader';
import FileList from './FileList';
import UploadStatus from './UploadStatus';
import UsageInstructions from './UsageInstructions';

export default function FileUploadContainer() {
  const { user } = useAuth();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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

    if (file.type !== 'application/pdf') {
      setUploadMessage('只支持PDF格式的文件');
      return;
    }

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
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        setUploadMessage(`文档上传成功！已处理${result.message.split('.')[1]?.trim() || '完成向量化处理'}`);
        fetchFiles();
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
        fetchFiles();
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
      <FileUploader 
        onFileSelect={handleFileSelect}
        onDrop={handleDrop}
        onDrag={handleDrag}
        dragActive={dragActive}
        uploading={uploading}
      />
      <UploadStatus uploadMessage={uploadMessage} />
      <FileList files={files} onDelete={handleDelete} deletingId={deletingId} />
      <UsageInstructions />
    </div>
  );
}
