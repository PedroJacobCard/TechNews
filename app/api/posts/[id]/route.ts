import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params : { id: string } } ) {
  try {
    const id = params.id
    const post = await prisma.post.findUnique({ 
        where: {
        id
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json('Something went wrong  when getting the post. Try again.', error as any)
  }
  
}

export async function PUT(req: Request, { params }: { params : { id: string } } ) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
  }

  const { title, content, links, selectedCategory, imageUrl, publicId } = await req.json();

  const id = params.id;

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        catName: selectedCategory,
        imageUrl,
        publicId
      }
    });

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json('Something went wrong when updating the post. Try again.', error as any)
  }
}

export async function DELETE(req: Request, { params }: { params : { id: string } } ) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
  }

  const id = params.id;

  try {
    const post = await prisma.post.delete({
      where: { id }
    });

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(`Something went wrong when deleting the post. Try again.`)
  }
}