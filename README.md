# Node Serverless AWS Prisma Mongo Skeleton

This is a skeleton project for deploying a Node.js serverless function to AWS Lambda using the Serverless Framework. It uses Prisma Client to connect to a MongoDB database.

## 🚀 Project Structure

The project structure is as follows:

```css
├── src
│   └── status.ts
├── .gitignore
├── package.json
├── README.md
```

## 💻 Prerequisites

- Node.js 14+
- Yarn or npm

👾 Necesary environment variables:

Copy the `.env.example` file to `.env` and fill in the required environment variables.
Replicate the `.env.example` file to `.env.test` and fill in the required environment variables.
Replicate the `.env.example` file to `.env.developemnt` and fill in the required environment variables.


## 📖 How to use

- ⚡ Install dependencies

```bash
npm install
```

- 📂 Run prisma

```bash
npx prisma generate && npx prisma db push --preview-feature
```

- ⚒️ Run development App

```bash
npm run dev
```

- 🚀 Start App

```bash
npm run start
```

<!-- - 🔦 Run Lint

```bash
npm run lint
```

- 👾 Run test

```bash
npm run test
``` -->