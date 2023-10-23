import { NextResponse } from "next/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain } from "langchain/chains";
import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
const collection = client.db("talking_doc").collection("docs");

export const POST = async (req) => {

    try {

        const data = await req.formData();
        const query = data.get('query');

        const vectorstore = new MongoDBAtlasVectorSearch(
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


        const model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_KEY,
        });

        const template = `Use the following pieces of context to answer the question at the end.
        If you don't know the answer, just say that you don't know, don't try to make up an answer.
        Use three sentences maximum and keep the answer as concise as possible.
        Always say "thanks for asking!" at the end of the answer.
        {context}
        Question: {question}
        Helpful Answer:`;

        const chain = RetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
            prompt: PromptTemplate.fromTemplate(template)
        });

        const res = await chain.call({
            query,
        })
        

        return NextResponse.json({
            answer : res.text,
            success: true
        })


    } catch (err) {
        console.log(err);
        return new Response('Internal Server Error', {
            status: 500
        })
    }

}