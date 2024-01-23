import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const response = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json("Something went wrong when getting the posts. Try again.", error as any)
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
  }

  const { title, content, links, selectedCategory, imageUrl, publicId } = await req.json();

  const authorEmail = session.user?.email as string;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and Content are required"},
      { status: 400 }
      )
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title, content, links, catName: selectedCategory, imageUrl, publicId,  authorEmail
      }
    })

    return NextResponse.json(newPost)

  } catch (error) {
    return NextResponse.json("Something went wrong when creating the post. Try again.", error as any)
  }
}