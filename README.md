# RAG-Based PDF Chatbot

This is a [Next.js](https://nextjs.org) project that implements a Retrieval-Augmented Generation (RAG) chatbot. Users can upload PDF documents, and the application will process and embed them into a vector database. Subsequently, users can ask questions, and the chatbot will use the content of the uploaded documents as context to provide accurate answers.

**Key Feature**: This project features a decoupled, high-performance **Embedding Microservice**. Instead of running the embedding model within the main application (which is inefficient in Serverless environments), it calls a dedicated, independently deployed API for all text-to-vector conversion tasks. This improves performance by over 10x and makes the overall architecture more robust and scalable.

## Features

-   **PDF Upload:** Users can upload PDF files through a drag-and-drop interface.
-   **Decoupled Document Processing:** Uploaded PDFs are parsed, chunked, and then sent to a dedicated microservice for vector embedding.
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
-   **Embeddings Model:** **Custom-deployed microservice** using `sentence-transformers/all-MiniLM-L6-v2`.

## Workflows

### 1. File Upload & Processing

1.  A user uploads a PDF file via the `UploadContainer` component.
2.  The file is sent to the `/api/upload` API endpoint in the Next.js application.
3.  The API route uses `WebPDFLoader` to load the PDF's content.
4.  The text is split into smaller, overlapping chunks using `RecursiveCharacterTextSplitter`.
5.  The Next.js backend makes a **batch API call** to the external **Embedding Service**, sending all text chunks at once.
6.  The Embedding Service converts each text chunk into a vector and returns them to the Next.js backend.
7.  The file metadata (name, hash) is stored in the PostgreSQL database via Drizzle.
8.  The text chunks and their corresponding vectors are upserted into the `chatbot` index in Pinecone.

### 2. Chat & Retrieval-Augmented Generation (RAG)

1.  A user submits a question through the chat interface.
2.  The question is sent to the `/api/chat` API endpoint.
3.  The Next.js backend calls the **Embedding Service** to convert the user's question into a query vector.
4.  This query vector is used to search the Pinecone index, retrieving the most relevant text chunk(s).
5.  This retrieved chunk is inserted into a system prompt that instructs the LLM to answer the user's question based on the provided context.
6.  The prompt, conversation history, and the user's latest question are sent to the Cohere `command-r` model via the Vercel AI SDK.
7.  The response from the LLM is streamed back to the user in the chat interface.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   A PostgreSQL database
-   A Pinecone account and API key
-   A Cohere account and API key
-   A running instance of the Embedding Service.

### 1. Setup Environment Variables

Create a `.env` file in the root of the project and add the following variables.

```
# Example .env file

# Connection string for your PostgreSQL database
DATABASE_URL='postgresql://USER:PASSWORD@HOST:PORT/DATABASE'

# Pinecone credentials
PINECONE_API_KEY='YOUR_PINECONE_API_KEY'

# The Vercel AI SDK uses this for Cohere
COHERE_API_KEY='YOUR_COHERE_API_KEY'

# URL for your deployed embedding service
EMBEDDING_SERVICE_URL='https://embedding.badtom.dpdns.org'
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Push Database Schema

Apply the schema defined in `src/db/schema.ts` to your PostgreSQL database:

```bash
npx drizzle-kit push
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

Follow these steps to deploy your application to Vercel.

### 1. Import Project

-   Fork this repository to your GitHub account.
-   Go to your [Vercel Dashboard](https://vercel.com/new) and import the forked repository.
-   Vercel will automatically detect that it is a Next.js project and configure the build settings.

### 2. Connect Database

-   In the project creation wizard, navigate to the **Storage** tab.
-   Select **Postgres** and click **Create & Connect**.
-   This will create a new Vercel Postgres database and automatically set the `DATABASE_URL` environment variable in your project.

### 3. Configure Environment Variables

-   In your Vercel project settings, go to **Settings -> Environment Variables**.
-   Add the following secrets:
    -   `PINECONE_API_KEY`: Your API key for Pinecone.
    -   `COHERE_API_KEY`: Your API key for Cohere.
    -   `EMBEDDING_SERVICE_URL`: The full URL to your deployed embedding service (e.g., `https://embedding.badtom.dpdns.org`).

### 4. Configure Build Command for Database Schema

-   To ensure the database schema is up-to-date with every deployment, you need to run `drizzle-kit push` as part of the build process.
-   In your Vercel project settings, go to **Settings -> General**.
-   Find the **Build & Development Settings** section and override the **Build Command**.
-   Set it to the following:

    ```bash
    npx drizzle-kit push && next build
    ```

-   This command will first apply any schema changes to your Vercel Postgres database and then build the Next.js application.

### 5. Deploy

-   After configuring the database and environment variables, trigger a new deployment from your Vercel project dashboard.
-   Your application will be built and deployed. Vercel will provide you with a public URL.

## CI/CD Pipeline

This project uses Vercel for continuous deployment and GitHub Actions for automated quality checks.

### Vercel Deployment

The application is automatically deployed to Vercel when changes are pushed to the `main` branch. The deployment configuration is defined in `vercel.json`.

### GitHub Actions Workflows

Several automated workflows are configured in `.github/workflows/`:

- **`code-quality.yml`**: Runs on every push and PR to check code quality
  - ESLint for code style
  - TypeScript type checking
  - Build verification

- **`security.yml`**: Weekly security scans and dependency audits
  - npm audit for vulnerability checking
  - Snyk security scanning (requires SNYK_TOKEN secret)

- **`deployment-check.yml`**: Validates successful Vercel deployments
  - Health checks on deployed URLs
  - Deployment status notifications

- **`auto-tag.yml`**: Automatic versioning and release tagging
  - Creates version tags on main branch pushes
  - Generates GitHub releases

### Environment Variables

Required environment variables for deployment (set in Vercel Dashboard):

```bash
# AI/ML Services
EMBEDDING_SERVICE_URL=...
COHERE_API_KEY=...
PINECONE_API_KEY=...
PINECONE_INDEX_NAME=...

# Database
DATABASE_URL=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Storage
SUPABASE_S3_ENDPOINT=...
SUPABASE_S3_ACCESS_KEY=...
SUPABASE_S3_SECRET_KEY=...
SUPABASE_S3_BUCKET=...
SUPABASE_S3_REGION=...
```

## API Endpoints

-   `POST /api/upload`: Handles PDF file uploads, processing, and embedding.
-   `POST /api/chat`: Manages the chat logic, including context retrieval and LLM interaction.
-   `GET /api/get-files`: Retrieves a list of all uploaded files from the PostgreSQL database.
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

This API route handles the entire file processing pipeline. It receives a file, loads its content, splits it into chunks, **calls the embedding service**, and stores the results in both PostgreSQL and Pinecone.

```typescript
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextResponse } from 'next/server';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { pc } from "@/lib/pinecone";
import { insertFile } from "@/db";
import axios from "axios";
// ... other imports

// Main function to handle POST requests
export async function POST(request: Request) {
    try {
        // 1. Receive file from FormData
        const formData = await request.formData();
        const file = formData.get('file');
        // ... file validation ...

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

        // 4. Call Embedding Service for all chunks
        const embeddingResponse = await axios.post(process.env.EMBEDDING_SERVICE_URL + '/embed/batch', {
            texts: allChunks
        });
        const vectors = embeddingResponse.data.embeddings;

        // 5. Upsert to Pinecone and store metadata in PostgreSQL
        // ...

        return NextResponse.json({ message: `File processed successfully.` });
    } catch (error) {
        // ... error handling
    }
}
```

### Chat API (`src/app/api/chat/route.ts`)

This route powers the RAG functionality. It takes a user's query, **calls the embedding service**, finds relevant context from Pinecone, and streams a response from the Cohere LLM.

```typescript
import { cohere } from '@ai-sdk/cohere';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { pc } from '@/lib/pinecone';
import axios from "axios";
// ... other imports

export async function POST(req: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await req.json();
        const lastUserMessage = messages[messages.length - 1];
        const queryText = lastUserMessage.content as string;

        // 1. Embed the user's query via Embedding Service
        const embeddingResponse = await axios.post(process.env.EMBEDDING_SERVICE_URL + '/embed', {
            text: queryText
        });
        const queryVector = embeddingResponse.data.embedding;

        // 2. Query Pinecone for context
        const queryResult = await pc.index('chatbot').query({
            topK: 1,
            vector: queryVector,
            includeMetadata: true,
        });
        const context = queryResult.matches[0].metadata?.text;

        // 3. Construct the system prompt with context
        const systemPrompt = `...`;

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
