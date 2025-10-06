'use client';

import FileListItem from './FileListItem';
import { UploadedFile } from './types';

interface FileListProps {
  files: UploadedFile[];
  onDelete: (fileId: number) => void;
  deletingId: number | null;
}

export default function FileList({ files, onDelete, deletingId }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div>
      <p className="text-sm text-gray-400 mb-3">已上传的文档：</p>
      <ul className="space-y-3">
        {files.map((file) => (
          <FileListItem 
            key={file.id} 
            file={file} 
            onDelete={onDelete} 
            deletingId={deletingId} 
          />
        ))}
      </ul>
    </div>
  );
}
