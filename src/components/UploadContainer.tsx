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

    // Mutation to handle file deletions
    const { mutate: deleteFile } = useMutation({
        mutationFn: (fileId: number) => axios.delete(`/api/files/${fileId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] });
        },
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        uploadFile(acceptedFiles[0])
    }, [uploadFile])
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className='h-full w-full flex flex-col items-center'>
            <div {...getRootProps()} className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer ${isDragActive ? 'bg-gray-100' : ''}`}>
                <input {...getInputProps()} />
                {
                    isPending ? <p className='text-center text-gray-500 text-sm'>Uploading...</p> :
                        <p className='text-center text-gray-500 text-sm'>
                            Drop the files here Or Click to select files
                        </p>
                }
            </div>
            {
                isLoading ? <p className='text-center text-gray-500 text-sm mt-20'>Loading files...</p> : (
                    <ul className="mt-4 w-full max-w-md">
                        {files?.data.map((file: FileModel) => (
                            <li key={file.id} className="flex justify-between items-center p-2 border-b border-gray-200">
                                <span className="truncate">{file.file_name}</span>
                                <button 
                                    onClick={() => deleteFile(file.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            }

        </div>
    )
}
export default UploadContainer