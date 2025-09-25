import { NextRequest, NextResponse } from "next/server";
import { getIndex } from "@/lib/pinecone";
import { deleteFileById } from "@/db";
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
          return unauthorizedResponse();
        }

        // Await params before using its properties
        const { id } = await context.params;
        const fileId = parseInt(id, 10);

        if (isNaN(fileId)) {
            return NextResponse.json({ error: 'Invalid file ID' }, { status: 400 });
        }

        console.log(`Attempting to delete file with ID: ${fileId} for user: ${user.id}`);
        const index = getIndex();

        // Step 1: Query Pinecone to get the IDs of vectors to delete.
        // Use dummy vector for query.
        const dummyVector = new Array(384).fill(0);
        const queryResult = await index.query({
            vector: dummyVector,
            topK: 1000,
            filter: {
                file_id: { '$eq': fileId },
                user_id: { '$eq': user.id }
            }
        });

        const vectorIdsToDelete = queryResult.matches.map((match: { id: string }) => match.id);

        // Step 2: Delete the vectors by their specific IDs.
        if (vectorIdsToDelete.length > 0) {
            await index.deleteMany(vectorIdsToDelete);
            console.log(`Pinecone deletion successful for ${vectorIdsToDelete.length} vectors.`);
        } else {
            console.log(`No vectors found in Pinecone for file_id: ${fileId}, user: ${user.id}. Nothing to delete.`);
        }

        // Step 3: Delete the file record from PostgreSQL (with user validation).
        console.log(`Deleting record from PostgreSQL with ID: ${fileId}, user: ${user.id}`);
        await deleteFileById(fileId, undefined, user.id); // Pass user.id instead of sessionId
        console.log(`PostgreSQL deletion successful.`);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}
