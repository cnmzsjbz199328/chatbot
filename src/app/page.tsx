import ChatContainer from "@/components/ChatContainer";
import UploadContainer from "@/components/UploadContainer";
import SessionControl from "@/components/SessionControl";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Session Control - 放在顶部 */}
      <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <SessionControl />
      </div>
      {/* 移动端：垂直布局，桌面端：水平布局 */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] w-full max-w-7xl mx-auto">
        {/* 上传区域 */}
        <div className="w-full lg:w-1/3 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-200 border-dashed h-1/2 lg:h-full">
          <UploadContainer />
        </div>
        {/* 聊天区域 */}
        <div className="w-full lg:w-2/3 h-1/2 lg:h-full">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}
