import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../db';
import { notes } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

export const GET = async (req: NextApiRequest) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ data: [] });
  }

  const data = await prisma.notes.findMany({
    where: {
      userId,
    },
  });

  return NextResponse.json({ data });
};

const CreateNoteSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  isPublished: z.boolean().optional().default(false),
});

export const POST = async (req: Request) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ data: [] });
  }

  const body = CreateNoteSchema.safeParse(await req.json());

  if (body.success === false) {
    return NextResponse.json({ code: 'VALIDATION_ERROR' }, { status: 400 });
  }

  const data = await prisma.notes.create({
    data: {
      userId,
      ...body.data,
    },
  });

  return NextResponse.json({ data });
};
