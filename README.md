# RAG-Based PDF Chatbot

This is a [Next.js](https://nextjs.org) project that implements a Retrieval-Augmented Generation (RAG) chatbot. Users can upload PDF documents, and the application will process and embed them into a vector database. Subsequently, users can ask questions, and the chatbot will use the content of the uploaded documents as context to provide accurate answers.

## Features

-   **PDF Upload:** Users can upload PDF files through a drag-and-drop interface.
-   **Document Processing:** Uploaded PDFs are parsed, chunked, and converted into vector embeddings.
-   **Vector Storage:** Embeddings are stored in a [Pinecone](https://www.pinecone.io/) vector database for efficient similarity search.
-   **Database Integration:** File metadata is stored in a PostgreSQL database using [Drizzle ORM](https://orm.drizzle.team/).
-   **RAG Chat Interface:** A chat interface allows users to ask questions related to the document content.
-   **Contextual Answers:** The backend retrieves relevant document chunks from Pinecone to provide context to a Large Language Model (LLM), which then generates an answer.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Frontend State Management:** [TanStack Query v5](https://tanstack.com/query/latest)
-   **File Uploads:** [React Dropzone](https://react-dropzone.js.org/)
-   **Backend API:** Next.js API Routes

---

-   **Relational Database:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
-   **Vector Database:** [Pinecone](https://www.pinecone.io/)
-   **AI/LLM:** [Cohere (Command R model)](https://cohere.com/) via [Vercel AI SDK](https://sdk.vercel.ai/docs)

---

-   **Document Processing:**
    -   **PDF Parsing:** [@langchain/community](https://js.langchain.com/docs/integrations/document_loaders/web_loaders/pdf) (`WebPDFLoader`)
    -   **Text Chunking:** [@langchain/textsplitters](https://js.langchain.com/docs/modules/data_connection/document_transformers/)
-   **Embeddings Model:** [@xenova/transformers](https://github.com/xenova/transformers.js) (`Xenova/multilingual-e5-large` model)

## Workflows

### 1. File Upload & Processing

1.  A user uploads a PDF file via the `UploadContainer` component.
2.  The file is sent to the `/api/upload` API endpoint.
3.  The API route uses `WebPDFLoader` to load the PDF's content.
4.  The text is split into smaller, overlapping chunks using `RecursiveCharacterTextSplitter`.
5.  The `@xenova/transformers` library loads the `multilingual-e5-large` model to convert each text chunk into a vector embedding.
6.  The file metadata (name, hash) is stored in the PostgreSQL database via the `insertFile` Drizzle function.
7.  The text chunks and their corresponding vectors are upserted into the `chatbot` index in Pinecone.

### 2. Chat & Retrieval-Augmented Generation (RAG)

1.  A user submits a question through the chat interface.
2.  The question is sent to the `/api/chat` API endpoint.
3.  The API route uses the same embeddings model to convert the user's question into a query vector.
4.  This query vector is used to search the Pinecone index, retrieving the single most relevant text chunk (`topK: 1`).
5.  This retrieved chunk is inserted into a system prompt that instructs the LLM to answer the user's question based on the provided context.
6.  The prompt, conversation history, and the user's latest question are sent to the Cohere `command-r` model via the Vercel AI SDK.
7.  The response from the LLM is streamed back to the user in the chat interface.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   A PostgreSQL database
-   A Pinecone account and API key
-   A Cohere account and API key (for use with the Vercel AI SDK)

### 1. Setup Environment Variables

Create a `.env` file in the root of the project and add the following variables. Replace the placeholder values with your actual credentials.

```
# Example .env file

# Connection string for your PostgreSQL database
DATABASE_URL=\'postgresql://USER:PASSWORD@HOST:PORT/DATABASE\'

# Pinecone credentials
PINECONE_API_KEY=\'YOUR_PINECONE_API_KEY\'

# The Vercel AI SDK uses this for Cohere
COHERE_API_KEY=\'YOUR_COHERE_API_KEY\'
```

### 2. Install Dependencies

Install the project dependencies using your preferred package manager:

```bash
npm install
```

### 3. Push Database Schema

Apply the schema defined in `src/db/schema.ts` to your PostgreSQL database using Drizzle Kit:

```bash
npx drizzle-kit push
```

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

-   `POST /api/upload`: Handles PDF file uploads, processing, and embedding.
-   `POST /api/chat`: Manages the chat logic, including context retrieval and LLM interaction.
-   `GET /api/get-files`: Retrieves a list of all uploaded files from the PostgreSQL database.
-   `DELETE /api/files/[id]`: Deletes a specific file and all its associated vectors from the databases.
-   `DELETE /api/files/[id]`: Deletes a specific file and all its associated vectors from the databases.

## Code Summaries

This section provides an overview of the key code components of the application to facilitate understanding and future development.

### Database Schema (`src/db/schema.ts`)

This file defines the database schema using Drizzle ORM. The `fileTable` stores metadata for each uploaded document, and a `FileModel` type is inferred from this schema for use throughout the application.

```typescript
import {pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const fileTable = pgTable("files", {
  id: serial('id').primaryKey(),
  file_name: varchar('file_name').notNull(),
  file_key: varchar('file_key').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export type FileModel =  typeof fileTable.$inferSelect;
```

### File Upload API (`src/app/api/upload/route.ts`)

This API route handles the entire file processing pipeline. It receives a file, loads its content, splits it into chunks, generates embeddings, and stores the results in both PostgreSQL and Pinecone.

```typescript
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextResponse } from 'next/server';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { pc } from "@/lib/pinecone";
import { getEmbeddingPipeline } from "@/lib/pipeline";
import { insertFile } from "@/db";
// ... other imports

// Main function to handle POST requests
export async function POST(request: Request) {
    try {
        // 1. Receive file from FormData
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // 2. Load PDF content
        const blob = new Blob([await file.arrayBuffer()], { type: "application/pdf" });
        const loader = new WebPDFLoader(blob, {});
        const docs = await loader.load();

        // 3. Split document into chunks
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400,
            chunkOverlap: 50,
        });
        const allChunks = await textSplitter.splitText(docs[0].pageContent);

        // 4. Process chunks (embed and store)
        await processAndEmbedChunks(allChunks, file.name);

        return NextResponse.json({ message: `File processed successfully.` });
    } catch (error) {
        // ... error handling
    }
}

// Helper function to process chunks
async function processAndEmbedChunks(chunks: string[], fileName: string) {
    // ... gets embedding model

    // ... generates embeddings for chunks

    // ... prepares records for Pinecone

    // ... upserts records to Pinecone

    // 5. Store file metadata in PostgreSQL
    await insertFile(fileName, Md5.hashStr(fileName));
}
```

### Chat API (`src/app/api/chat/route.ts`)

This route powers the RAG functionality. It takes a user's query, finds relevant context from Pinecone, and streams a response from the Cohere LLM.

```typescript
import { cohere } from '@ai-sdk/cohere';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { pc } from '@/lib/pinecone';
import { getEmbeddingPipeline } from '@/lib/pipeline';
// ... other imports

export async function POST(req: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await req.json();
        const lastUserMessage = messages[messages.length - 1];
        const queryText = lastUserMessage.content as string;

        // 1. Embed the user's query
        const extractor = await getEmbeddingPipeline();
        const queryEmbedding = await extractor(queryText, { pooling: 'mean', normalize: true });
        const queryVector = Array.from(queryEmbedding.data);

        // 2. Query Pinecone for context
        const queryResult = await pc.index('chatbot').query({
            topK: 1,
            vector: queryVector,
            includeMetadata: true,
        });
        const context = queryResult.matches[0].metadata?.text;

        // 3. Construct the system prompt with context
        const systemPrompt = `You are a helpful assistant. Please answer the user's question based on the following context. If the context does not contain the answer, say that you don't know.

Context:
${context}`;

        // 4. Stream response from Cohere LLM
        const result = await streamText({
            model: cohere('command-r'),
            system: systemPrompt,
            messages: convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        // ... error handling
    }
}
```

### Frontend Upload Component (`src/components/UploadContainer.tsx`)

This React component provides the user interface for uploading files and viewing the list of uploaded documents. It uses TanStack Query to manage server state.

```typescript
'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { FileModel } from '@/db/schema';

const UploadContainer = () => {
    const queryClient = useQueryClient()

    // 1. Query to fetch the list of files
    const {data: files, isLoading} = useQuery({
        queryKey: ['files'],
        queryFn: () => axios.get('/api/get-files')
    })

    // 2. Mutation to handle file uploads
    const {mutate, isPending} = useMutation({
        mutationFn: (file: File) => {
            const formData = new FormData()
            formData.append('file', file)
            return axios.post('/api/upload', formData)
        },
        onSuccess: () => {
            // 3. Invalidate the query to auto-refresh the list
            queryClient.invalidateQueries({ queryKey: ['files'] })
        },
    })

    // 4. Dropzone handler
    const onDrop = useCallback((acceptedFiles: File[]) => {
        mutate(acceptedFiles[0])
    }, [mutate])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        // ... JSX for the dropzone and file list
        // ... maps over `files?.data` to render the list
    )
}
export default UploadContainer
```