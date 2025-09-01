// src/lib/pipeline.ts

import { pipeline, PipelineType, FeatureExtractionPipeline } from '@xenova/transformers';

// Define the interface for the progress callback's argument
interface ProgressStatus {
    status: string;
    name: string;
    file: string;
    progress: number;
    loaded: number;
    total: number;
}

// This is a TypeScript trick to extend the global scope of Node.js.
// It allows us to safely store the pipeline instance on the 'global' object.
declare global {
    var __embedding_pipeline: Promise<FeatureExtractionPipeline> | undefined;
}

const task: PipelineType = 'feature-extraction';
const model = 'Xenova/multilingual-e5-large';

// This is the core function. It will either create a new pipeline instance
// or return the existing one from the global cache.
export async function getEmbeddingPipeline(progress_callback?: (progress: ProgressStatus) => void) {
    // If the pipeline instance doesn't exist in the global cache, create it
    if (!global.__embedding_pipeline) {
        console.log("No pipeline instance found in global cache. Creating a new one...");
        global.__embedding_pipeline = pipeline(task, model, { progress_callback }) as Promise<FeatureExtractionPipeline>;
    } else {
        console.log("Found pipeline instance in global cache. Reusing it.");
    }
    
    // Return the promise of the pipeline instance from the global cache
    return global.__embedding_pipeline;
}