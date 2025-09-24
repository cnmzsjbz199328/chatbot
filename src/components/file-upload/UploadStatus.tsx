'use client';

interface UploadStatusProps {
  uploadMessage: string;
}

export default function UploadStatus({ uploadMessage }: UploadStatusProps) {
  if (!uploadMessage) return null;

  const getStatusStyle = () => {
    if (uploadMessage.includes('成功')) {
      return 'bg-green-800/20 text-green-400 border border-green-800';
    } else if (uploadMessage.includes('失败') || uploadMessage.includes('错误')) {
      return 'bg-red-800/20 text-red-400 border border-red-800';
    } else {
      return 'bg-blue-800/20 text-blue-400 border border-blue-800';
    }
  };

  return (
    <div className={`p-3 rounded-lg ${getStatusStyle()}`}>
      <p className="text-sm">{uploadMessage}</p>
    </div>
  );
}
