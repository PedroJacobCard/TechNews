import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { catName: string } }) {
  const catName = params.catName;

  try {
    const posts = await prisma.category.findUnique({
      where: {
        catName
      },
      include: {
        posts: {
          include: {
            author: {
              select: { name: true, image: true }
            }
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json('Something went wrong when getting the posts')
  }
}