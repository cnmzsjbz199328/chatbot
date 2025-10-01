'use client';
import { useState, useRef, useCallback } from 'react';
import { useAuth } from './AuthProvider';

interface ImageUploadFieldProps {
  value?: string; // 当前的图片URL
  onChange: (imageUrl: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function ImageUploadField({ 
  value, 
  onChange, 
  placeholder = "Select an image...",
  className = "",
  disabled = false 
}: ImageUploadFieldProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!user) {
      setError('Please log in to upload images');
      return;
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPEG, PNG, GIF, and WebP images are allowed');
      return;
    }

    // 验证文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file too large. Maximum size is 5MB.');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user.id);

      // 模拟上传进度
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (response.ok) {
        onChange(result.imageUrl);
        setTimeout(() => setUploadProgress(0), 1000);
      } else {
        setError(result.error || 'Upload failed');
        setUploadProgress(0);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please try again.');
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  }, [user, onChange]);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user || !value) return;
    
    // 从 URL 中提取文件名
    const urlParts = value.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    try {
      const response = await fetch(`/api/upload-image?fileName=${encodeURIComponent(fileName)}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': user.id
        }
      });
      
      if (response.ok) {
        onChange('');
        setError(null);
      } else {
        console.error('Failed to delete image from storage');
        // 即使删除失败，也清除本地状态
        onChange('');
        setError(null);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      // 即使删除失败，也清除本地状态
      onChange('');
      setError(null);
    }
  };

  // 拖拽处理
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, [disabled, handleFileSelect]);

  return (
    <div className={`w-full ${className}`}>
      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* 上传区域 */}
      <div
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${value 
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
            : dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        {uploading ? (
          // 上传中状态
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Uploading... {uploadProgress}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-[var(--primary-color)] h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : value ? (
          // 已上传图片
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={value}
                alt="Uploaded"
                className="max-w-full max-h-48 rounded-lg shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {!disabled && (
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ Image uploaded successfully
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Click to change image
            </p>
          </div>
        ) : (
          // 默认状态
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-400 text-2xl">
                image
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {dragActive ? 'Drop image here' : placeholder}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {dragActive ? 'Release to upload' : 'PNG, JPG, GIF, WebP up to 5MB'}
            </p>
          </div>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}

