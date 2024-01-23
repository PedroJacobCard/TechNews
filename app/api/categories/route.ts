import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const response = await prisma.category.findMany()
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json('Something went wrong', error as any)
  }
}