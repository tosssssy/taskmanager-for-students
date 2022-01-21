// pages/api/post/index.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({ message: 'Not authenticated' })
    return
  }
  await prisma.subject.createMany({
    data: [...req.body],
  })
  res.end()
}
