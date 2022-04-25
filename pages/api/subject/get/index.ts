// pages/api/post/index.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  try {
    const result = await prisma.subject.findMany({
      where: {
        author: { id: Number(session.id) },
      },
      orderBy: {
        id: 'asc',
      },
    })
    return res.json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}
