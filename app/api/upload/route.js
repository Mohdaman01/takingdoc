import { NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MongoClient } from "mongodb";
import { writeFile } from 'fs/promises';
import { existsSync } from "fs";


const storeDocToVectorstore = async (file) => {

    try {

        const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");

        const collection = client.db("talking_doc").collection("docs");

        const loader = new PDFLoader(`uploads/${file.name}`, {
            splitPages: false,
        });

        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 0,
        });

        const splitDocs = await textSplitter.splitDocuments(docs);

        const vectorstore = await MongoDBAtlasVectorSearch.fromDocuments(
            splitDocs,
            new OpenAIEmbeddings({
                openAIApiKey: process.env.OPENAI_KEY
            }),
            {
                collection,
                indexName: "default",
                textKey: "text",
                embeddingKey: "embedding",
            }
        )
        
        await client.close();

    } catch (err) {
        console.log(err)
        return;
    }
}

export const POST = async (req) => {

    try {

        const data = await req.formData();

        const file = data.get('file');

        console.log(file);

        if (!file) {
            return new NextResponse.json({
                success: false
            })
        }

        if(existsSync(`uploads/${file.name}`)){
            console.log('fired')
            return new NextResponse("file already exists!",{
                status: 200
            })
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await writeFile(`uploads/${file.name}`, buffer);

        storeDocToVectorstore(file);

        return NextResponse.json({
            success: true
        })

    } catch (err) {
        console.log(err);
        return new Response('Failed to upload', {
            status: 500
        })
    }

}
