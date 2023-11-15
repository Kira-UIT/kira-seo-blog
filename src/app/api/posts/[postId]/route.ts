import prisma from "@/libs/prismaDb";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  const session = await getSession();
  const postId = params.postId;

  const post = await prisma.posts.findUnique({
    where: {
      id: postId,
    },
  });

  return NextResponse.json(post);
};

export { GET };
