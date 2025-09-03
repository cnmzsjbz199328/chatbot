import { NextResponse } from "next/server";
import { pc } from "@/lib/pinecone";
import { deleteFileById } from "@/db";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Await params before using its properties
        const { id } = await context.params;
        const fileId = parseInt(id, 10);

        if (isNaN(fileId)) {
            return NextResponse.json({ error: 'Invalid file ID' }, { status: 400 });
        }

        console.log(`Attempting to delete file with ID: ${fileId}`);
        const index = pc.index('chatbot');
        const ns = index.namespace('__default__');

        // Step 1: Query Pinecone to get the IDs of vectors to delete.
        // We must provide a vector for a query, so we use a dummy one of zeros.
        // The model multilingual-e5-large has a dimension of 1024.
        const dummyVector = new Array(1024).fill(0);
        const queryResult = await ns.query({
            vector: dummyVector,
            topK: 1000, // Use a high topK to fetch all possible chunks for the file
            filter: {
                file_id: { '$eq': fileId }
            }
        });

        const vectorIdsToDelete = queryResult.matches.map(match => match.id);

        // Step 2: Delete the vectors by their specific IDs.
        if (vectorIdsToDelete.length > 0) {
            await ns.deleteMany(vectorIdsToDelete);
            console.log(`Pinecone deletion successful for ${vectorIdsToDelete.length} vectors.`);
        } else {
            console.log(`No vectors found in Pinecone for file_id: ${fileId}. Nothing to delete.`);
        }

        // Step 3: Delete the file record from PostgreSQL.
        console.log(`Deleting record from PostgreSQL with ID: ${fileId}`);
        await deleteFileById(fileId);
        console.log(`PostgreSQL deletion successful.`);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}