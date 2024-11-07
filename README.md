This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

ShadeCN- built on radix UI - Component lib that gives acce4sibnility of blocks - uses tailwin css

Clerk Auth
neon - serverless branchable postgres database -
DRIZZLE orm - typescript object relational maper - way to interact with db wo using sQL
prisma slower and not edge compatible while drizzle is edge comp

Set up S3 buckets with configured bucket policies and cross-origin resource sharing (CORS) to streamline input handling and data storage

IAM - identity and access management - method to use presigned url thats valid for a short time allowing direct file upload w/o exposing the access keys.

RAG:

1. Obntain PDF
2. Split and segment the PDF
3. Vectorize and embed individual documents
4. Store vectors in DB

--Search-- 5. Embed the query 6. Query the pineconedb for similar vecotrs 7. Extract out the metadata of the similar vector 8. Feed metadata into AI prompt

Langchain helps in splitting and segmenting the pdf
