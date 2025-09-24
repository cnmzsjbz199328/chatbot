'use client';

export default function UsageInstructions() {
  return (
    <div className="bg-blue-800/10 border border-blue-800 rounded-lg p-4">
      <h4 className="text-sm font-medium text-blue-400 mb-2">💡 功能说明</h4>
      <ul className="text-xs text-gray-300 space-y-1">
        <li>• 上传的PDF文档会被AI学习和理解</li>
        <li>• 访客可以通过聊天询问您的背景信息</li>
        <li>• 建议上传简历、个人介绍、项目说明等文档</li>
        <li>• 文档内容会被安全地存储在您的专属空间中</li>
      </ul>
    </div>
  );
}
