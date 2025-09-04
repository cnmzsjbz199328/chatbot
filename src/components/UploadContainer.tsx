'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { FileModel } from '@/db/schema';

const UploadContainer = () => {
    const queryClient = useQueryClient()
    
    // Query to fetch the list of files
    const { data: files, isLoading } = useQuery({
        queryKey: ['files'],
        queryFn: () => axios.get('/api/get-files')
    })

    // Mutation to handle file uploads
    const { mutate: uploadFile, isPending } = useMutation({
        mutationFn: (file: File) => {
            const formData = new FormData()
            formData.append('file', file)
            return axios.post('/api/upload', formData)
        },
        onSuccess: () => {
            // Invalidate and refetch the files list
            queryClient.invalidateQueries({ queryKey: ['files'] })
        },
    })

    // Mutation to handle file deletions with optimistic updates
    const { mutate: deleteFile } = useMutation({
        mutationFn: (fileId: number) => axios.delete(`/api/files/${fileId}`),
        onMutate: async (deletedFileId) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['files'] })

            // Snapshot the previous value
            const previousFiles = queryClient.getQueryData(['files'])

            // Optimistically update to the new value
            queryClient.setQueryData(['files'], (old: { data: FileModel[] } | undefined) => {
                if (!old?.data) return old
                return {
                    ...old,
                    data: old.data.filter((file: FileModel) => file.id !== deletedFileId)
                }
            })

            // Return a context object with the snapshotted value
            return { previousFiles }
        },
        onError: (err, deletedFileId, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            queryClient.setQueryData(['files'], context?.previousFiles)
        },
        onSettled: () => {
            // Always refetch after error or success to ensure server state sync
            queryClient.invalidateQueries({ queryKey: ['files'] });
        },
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        uploadFile(acceptedFiles[0])
    }, [uploadFile])
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className='h-full w-full flex flex-col items-center p-4 lg:p-6'>
            {/* 文件上传区域 */}
            <div 
                {...getRootProps()} 
                className={`
                    border-2 border-dashed border-gray-300 rounded-xl p-6 lg:p-8 
                    text-center cursor-pointer transition-all duration-200 w-full max-w-md
                    ${isDragActive ? 'bg-blue-50 border-blue-400 scale-105' : 'hover:bg-gray-50 hover:border-gray-400'}
                    ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <input {...getInputProps()} />
                <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        📁
                    </div>
                    {isPending ? (
                        <div className="space-y-2">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className='text-sm text-gray-600'>Processing your file...</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <p className='text-sm font-medium text-gray-700'>
                                {isDragActive ? 'Drop your PDF here!' : 'Upload PDF Document'}
                            </p>
                            <p className='text-xs text-gray-500'>
                                Drag & drop or click to browse
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* 文件列表 */}
            <div className="mt-6 w-full max-w-md">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Uploaded Documents ({files?.data?.length || 0})
                </h3>
                
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <span className="ml-2 text-sm text-gray-500">Loading files...</span>
                    </div>
                ) : (
                    <div className="space-y-2 max-h-64 lg:max-h-96 overflow-y-auto">
                        {files?.data?.length === 0 ? (
                            <p className="text-center text-gray-500 text-sm py-4">
                                No documents uploaded yet
                            </p>
                        ) : (
                            files?.data.map((file: FileModel) => (
                                <div 
                                    key={file.id} 
                                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-red-600 text-xs font-semibold">PDF</span>
                                        </div>
                                        <span className="text-sm text-gray-700 truncate font-medium">
                                            {file.file_name}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => deleteFile(file.id)}
                                        className="ml-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-md text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                                        aria-label={`Delete ${file.file_name}`}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
export default UploadContainer