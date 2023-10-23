## Talking Doc

As the name suggest you chat with your pdf format document.

Upload the file than ask question about the content.

Get reasonable answer/response form it.

![talking doc 1](https://github.com/Mohdaman01/talkingdoc/assets/108982559/0241933c-8492-4a8d-b7d2-ae37f9553c0c)

![talking doc 2](https://github.com/Mohdaman01/talkingdoc/assets/108982559/691d92f4-9433-477a-823b-f4bde05b437c)

![talking doc 3](https://github.com/Mohdaman01/talkingdoc/assets/108982559/8b8e9dcd-8b14-4e3b-8241-89a1746ef373)

### Tech Stack

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- For user interface "client side rendering" of next.js is used and for api end points next.js as a backend sever is used.

- For styling [Tailwind.css](https://tailwindcss.com) is used.

- For "Chat/QA model , pfd-loader, vectorstore and retrieval" [langChain](https://www.langchain.com) is used.

- For "vectorstore" [MongoDB Atlas](https://www.mongodb.com/atlas/database) is used.

### Reasons for choosing this tech stack

- Next.js is a very powerfull and stable framework which has many features for this kind of application and can use node.js features on sever side.
    
- Tailwind.css is a css framework which increases the speed for development significantly by using their utility classes.

- LangChain is a framework designed to simplify the creation of applications using large language models.
LainChain also supports mongoDB as a vectorstore for the parsed content of the document.

## Getting Started

- First, clone or downlaod the zip of from project repository.

- Second, open the project in a code editor of your choice, than type "npm install" in the terminal.

- Third, create a new .env file and make to these environment variables: 

    - You can get MongoDB Atlas URI from [mongoDB](https://www.mongodb.com/atlas/database)
    - You can get Open AI key from [Open AI](https://platform.openai.com/overview).

```
MONGODB_ATLAS_URI = "Your MongoDB Atlas URI"
OPENAI_KEY = "Your Open AI key"
```
- All done now, just start the sever by typing below command in the terminal :

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Features to add in future

- Login/SignUp system.

- Add/delete multiple documents.

- Store chat history in database.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
