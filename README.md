This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Overview

- Upload pdf to aws S3 , using aws-sdk
- send S3 data into pine cone using /create-chat

### Passing into PineconeDB

- take fileKey from s3 load the PDF (loadS3IntoPinecone)
- Splits pdf to smaller chunks (loadS3IntoPinecone)
- Vectorise the chunks (loadS3IntoPinecone)
- embed the vectors with its metadata (loadS3IntoPinecone)
- Store embedded vectors to pineconeDB (loadS3IntoPinecone)

### Generate an entry in NeonDB to store

- insert a chat entry for chat table
- each chat entry is a table which will be used later to store a conversation content as an entry in a message table

- Generate a query which will be vectorised
- Query PineconeDB and compare vectors in DB with query vector
- Extract the most similar vector meta data

- Feed metadata into Openai

## PineconeDB

- index is like the DB
- in each index there are namespaces
- in each namespeace there are vectors spaces
- index(DB) => namespace(table) => vector(rows)
- each pdf will have its own name space
