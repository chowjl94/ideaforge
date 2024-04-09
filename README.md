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

## /api/create-chat

- checks for auth with clerk
- sends file_key and file_name through req body
- loads takes the pdf stores in s3
- and then stores into pine cone by embedding vectors of the chunks of pdf
- in pineconeDB each file_name is a name space
- inserts record into neonDB
- each pdf has a chat,
- each chat has a message table relation

## /api/chat

- takes the chatId, and references the chat
- creates a context by feeding the user mesasge
- a context is created by when the user message is being query by pineconeDB and find the closest matching vector of the pdf when the pdf has been uploaded
- this context string template is then spend to openAi as a prompt
- and then we will stream data to the user
- when data is streamed , will create a new row in messageSchema
