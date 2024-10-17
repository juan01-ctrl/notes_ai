This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

Create a .env file at the root of your project based on the .env.template file. This file will hold all sensitive environment variables.

Make sure to replace placeholder values with your actual keys.

.env.template


## Prisma Setup

After setting up your .env file, generate Prisma client using the following command:

```npx prisma generate```

This will create the Prisma client to interact with your database based on the schema defined in prisma/schema.prisma.


## Run project

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
