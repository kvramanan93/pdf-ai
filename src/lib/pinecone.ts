import {Pinecone} from  '@pinecone-database/pinecone';

let pinecone : Pinecone | null = null;

export const getPineconeClient = async() => {
    if(!pinecone){
        pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY || '',
        });
    }
    return pinecone;
}

export async function loads3intoPinecone(file_key:string){
    // 1. Obtaining the pdf -> download and read from pdf

}