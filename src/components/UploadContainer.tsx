'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'


const UploadContainer = () => {
    const mutation = useMutation({
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
        mutation.mutate(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className='h-full w-full flex flex-col items-center'>
            <div {...getRootProps()} className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer ${isDragActive ? 'bg-gray-100' : ''}`}>
                <input {...getInputProps()} />
                {

                    <p className='text-center text-gray-500 text-sm'>
                        Drop the files here Or Click to select files
                    </p>
                }
            </div>
        </div>
    )
}
export default UploadContainer