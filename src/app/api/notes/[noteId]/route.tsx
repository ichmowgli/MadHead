import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { prisma } from '../../db';
import { z } from 'zod';

export const GET = async (
  req: Request,
  { params: { noteId } }: { params: { noteId: string } }
) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ data: [] });
  }

  const data = await prisma.notes.findFirst({
    where: {
      userId,
      id: Number(noteId),
    },
  });

  return NextResponse.json({ data });
};

export const DELETE = async (
  req: Request,
  { params: { noteId } }: { params: { noteId: string } }
) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ code: 'UNAUTHORIZED' }, { status: 401 });
  }

  const data = await prisma.notes.delete({
    where: {
      userId,
      id: Number(noteId),
    },
  });

  return NextResponse.json({ data });
};

const PatchNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const PATCH = async (
  req: Request,
  { params: { noteId } }: { params: { noteId: string } }
) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ data: [] });
  }

  const body = PatchNoteSchema.safeParse(await req.json());

  if (!body.success) {
    return NextResponse.json({ code: 'VALIDATION_ERROR' }, { status: 400 });
  }

  const data = await prisma.notes.update({
    where: {
      userId,
      id: Number(noteId),
    },
    data: {
      ...body.data,
    },
  });

  return NextResponse.json({ data });
};
