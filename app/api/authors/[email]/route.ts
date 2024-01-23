import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { email: string } }) {
  try {
    const posts = await prisma.user.findUnique({ 
      where: { email: params.email },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json('Something went wrong when getting the authors')
  }
}