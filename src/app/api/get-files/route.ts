import { NextResponse } from "next/server";
import {getFile} from "@/db";


export async function GET(){
    try{
        const files = await getFile();
        return NextResponse.json(files);
    }catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }
}