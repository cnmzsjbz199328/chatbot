import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const formData = await request.formData()
    const file = formData.get('file')
    console.log('Received file:', file)
        if (!file || !(file instanceof Blob)) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }


    //1.分割成docs
    const buffer = await file.arrayBuffer()
    const blob = new Blob([buffer], { type: "application/pdf" });

    const loader = new WebPDFLoader(blob, {
        //required params =
        //optional params =
    })
    const docs = await loader.load()
    console.log(docs[0]?.pageContent)
    //2.split docs

    //3.上传至向量库

    return NextResponse.json({ message: 'File uploaded successfully' })
}
