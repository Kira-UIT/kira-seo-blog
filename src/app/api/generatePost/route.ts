import prisma from "@/libs/prismaDb";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const POST = withApiAuthRequired(async (req: NextRequest) => {
  if (!openai) {
    return new NextResponse("OpenAI API Key not configured", { status: 500 });
  }

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

  const body = await req.json();
  const { topic, keywords } = body;

  if ((!topic || !keywords) && (topic.length > 80 || keywords.length > 80)) {
    return NextResponse.json(
      {
        message: "Unprocessable entity",
      },
      {
        status: 422,
      }
    );
  }

  const postContentResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a blog post generator.",
      },
      {
        role: "user",
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
      The response should be formatted in SEO-friendly HTML,
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
    ],
    temperature: 0,
  });

  const postContent = postContentResponse.choices[0].message.content;

  const postTitleResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a blog post generator.",
      },
      {
        role: "user",
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. The response should be formatted in SEO-friendly HTML, limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
      {
        role: "assistant",
        content: postContent as any,
      },
      {
        role: "user",
        content: "Generate appropriate title tag text for the above blog post",
      },
    ],
    temperature: 0,
  });

  const postMetaResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a blog post generator.",
      },
      {
        role: "user",
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. The response should be formatted in SEO-friendly HTML, limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
      {
        role: "assistant",
        content: postContent as any,
      },
      {
        role: "user",
        content:
          "Generate SEO-friendly meta description content for the above blog post",
      },
    ],
    temperature: 0,
  });

  const title = postTitleResponse.choices[0]?.message.content;
  const metaDescription = postMetaResponse.choices[0]?.message.content;

  const newPost = await prisma.posts.create({
    data: {
      topic: topic,
      content: postContent || "",
      title: title || "",
      description: metaDescription || "",
      userId: session?.user?.sub,
    },
  });

  return NextResponse.json({
    postId: newPost?.id,
  });
});

export { POST };
