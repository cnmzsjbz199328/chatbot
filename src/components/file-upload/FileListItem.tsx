'use client';

import { Button } from '@/components/ui/button';
import { UploadedFile } from './types';

interface FileListItemProps {
  file: UploadedFile;
  onDelete: (fileId: number) => void;
  deletingId: number | null;
}

export default function FileListItem({ file, onDelete, deletingId }: FileListItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  return (
    <li className="flex items-center justify-between p-3 bg-[var(--accent-color)]/50 rounded-lg">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">{file.file_name}</p>
          <p className="text-xs text-[var(--text-secondary)]">
            上传时间: {formatDate(file.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onDelete(file.id)}
          disabled={deletingId === file.id}
          variant="destructive"
          size="sm"
          className="ml-2"
        >
          {deletingId === file.id ? '删除中...' : '删除'}
        </Button>
      </div>
    </li>
  );
}