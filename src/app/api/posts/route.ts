import prisma from "@/libs/prismaDb";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GET = withApiAuthRequired(async (req) => {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const posts = await prisma.posts.findMany({
    where: {
      OR: [
        {
          userId: {
            equals: session?.user?.sub,
          },
        },
        {
          userId: {
            equals: session?.user?.sub,
          },
        },
      ],
    },
  });

  return NextResponse.json(posts);
});

export { GET };
