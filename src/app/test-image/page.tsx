'use client';
import { useState } from 'react';
import Image from 'next/image';
import ImageUploadField from '@/components/ImageUploadField';
import Layout from '@/components/Layout';

export default function TestImagePage() {
  const [imageUrl, setImageUrl] = useState<string>('');

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            🧪 图片上传功能测试
          </h1>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">上传图片测试</h2>
            
            <ImageUploadField
              value={imageUrl}
              onChange={setImageUrl}
              placeholder="点击选择项目图片..."
              className="mb-6"
            />

            {/* 显示当前状态 */}
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium mb-2">当前状态:</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">图片 URL:</span>
                  <span className="text-gray-300 ml-2">
                    {imageUrl || '未选择图片'}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">状态:</span>
                  <span className={`ml-2 ${imageUrl ? 'text-green-400' : 'text-gray-400'}`}>
                    {imageUrl ? '✅ 已上传' : '⏳ 待上传'}
                  </span>
                </p>
              </div>
            </div>

            {/* 测试链接预览 */}
            {imageUrl && (
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
                <h3 className="text-lg font-medium mb-2">🗂️ Supabase Storage 测试结果:</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Public URL:</span>
                    <br />
                    <a 
                      href={imageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline break-all"
                    >
                      {imageUrl}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">URL 类型:</span>
                    <span className="text-green-400 ml-2">
                      {imageUrl.includes('supabase') ? '✅ Supabase Storage URL' : '⚠️ 其他类型 URL'}
                    </span>
                  </p>
                </div>
                
                {/* 图片预览 */}
                <div className="mt-4 pt-4 border-t border-blue-500/50">
                  <h4 className="font-medium mb-2">预览:</h4>
                  <div className="relative w-full h-64 mx-auto">
                    <Image
                      src={imageUrl}
                      alt="上传的图片"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md shadow-md"
                      onError={(e) => {
                        console.error('图片加载失败:', imageUrl);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 说明和使用指南 */}
          <div className="mt-8 p-6 bg-yellow-900/20 border border-yellow-500 rounded-lg">
            <h3 className="text-lg font-medium text-yellow-400 mb-3">📋 测试说明</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 点击上传区域选择图片文件</li>
              <li>• 支持格式：JPEG, PNG, GIF, WebP</li>
              <li>• 最大文件大小：5MB</li>
              <li>• 需要登录用户身份</li>
              <li>• 图片将上传到 Supabase Storage 的 &lsquo;project-images&rsquo; bucket</li>
              <li>• 成功上传后返回公共访问 URL</li>
            </ul>
          </div>

          {/* 环境信息 */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg text-sm">
            <h4 className="font-medium mb-2">🔧 环境信息:</h4>
            <div className="space-y-1 text-gray-300">
              <p>API Endpoint: <code className="bg-gray-800 px-2 py-1 rounded">/api/upload-image</code></p>
              <p>Storage Bucket: <code className="bg-gray-800 px-2 py-1 rounded">project-images</code></p>
              <p>Storage Provider: <code className="bg-gray-800 px-2 py-1 rounded">Supabase Storage</code></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

