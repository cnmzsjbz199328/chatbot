'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { FileModel } from '@/db/schema';

const UploadContainer = () => {
    const queryClient = useQueryClient()
    //query
    const { data: files, isLoading } = useQuery({
        queryKey: ['files'],
        queryFn: () => {
            return axios.get('/api/get-files')
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (file: File) => {
            const formData = new FormData()
            formData.append('file', file)
            return axios.post('/api/upload', formData)
        },
        onSuccess: () => {
            // Invalidate and refetch
            //queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        mutate(acceptedFiles[0])
    }, [mutate])
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
                    <ul>
                        {files?.data.map((file: FileModel) => (
                            <p key={file.id} className='text-center text-sm mt-2 w-[80%] border-b-2 border-dashed'>{file.file_name}</p>
                        ))}
                    </ul>
                )
            }

        </div>
    )
}
export default UploadContainer