'use client';

import { useRef } from 'react';

interface FileUploaderProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  dragActive: boolean;
  uploading: boolean;
}

export default function FileUploader({ 
  onFileSelect, 
  onDrop, 
  onDrag, 
  dragActive, 
  uploading 
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
        dragActive 
          ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10' 
          : 'border-[var(--border-color)] bg-[var(--accent-color)]/50 hover:bg-[var(--accent-color)]'
      }`}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <span className="material-symbols-outlined text-4xl text-[var(--text-secondary)] mb-2">
          {uploading ? 'sync' : 'cloud_upload'}
        </span>
        <p className="mb-2 text-sm text-[var(--text-secondary)]">
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
        onChange={onFileSelect}
        disabled={uploading}
      />
    </div>
  );
}