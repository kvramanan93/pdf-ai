/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./db/s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { text } from "stream/consumers";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { metadata } from "@/app/layout";
import { FileKey } from "lucide-react";
import { convertToAscii } from "@/lib/utils";

let pinecone: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || "",
    });
  }
  return pinecone;
};

type PDFpage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

type Vector = {
  id: string;
  values: number[];
  metadata?: Record<string, any>;
};

export async function loads3intoPinecone(file_key: string) {
  // 1. Obtaining the pdf -> download and read from pdf
  console.log("Downloading from S3");
  const file_name = await downloadFromS3(file_key);

  // 1.2 Get info from pdf(pdf to text string) -> Langchain

  if (!file_name) {
    throw new Error("Failed to download file from S3");
  }
  const loader = new PDFLoader(file_name); // To make sure that filename passed toe the loader is not NULL
  const pages = (await loader.load()) as PDFpage[]; // To make sure that the pages are loaded from the pdf
  console.log(pages);

  //2. Spliting and segmenting the pdf
  const documents = await Promise.all(pages.map(prepareDocument));

  // 3. Vectorizing and embedding individual documents
  const vectors = await Promise.all(documents.flat().map(vectorizeDocuments));

  // 4. Uploading the vectors to Pinecone
  const client = await getPineconeClient();
  const pineconeIndex = client.Index("ai-pdf");

  console.log("Inserting Vectors into Pinecone");
  const namespace = convertToAscii(file_key);

  const chunks = (array: Vector[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };
  const vectorChunks = chunks(vectors, 10);

  await Promise.all(vectorChunks.map((chunk) => pineconeIndex.upsert(chunk)));
  return documents[0];
}

async function vectorizeDocuments(doc: Document): Promise<Vector> {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent); //md5 to id the embeddings/vector within the pinecone

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    };
  } catch (error) {
    console.log("Error embedding the document", error);
    throw error;
  }
}
export const truncateStringByBytes = (str: string, numBytes: number) => {
  const encoder = new TextEncoder();
  return new TextDecoder("utf-8").decode(
    encoder.encode(str).slice(0, numBytes)
  );
};

async function prepareDocument(page: PDFpage) {
  // eslint-disable-next-line prefer-const
  let { metadata, pageContent } = page;
  pageContent = pageContent.replace(/(\r\n|\n|\r)/gm, " ");
  //Splitting the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
