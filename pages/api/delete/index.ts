import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

// DELETE /api/post/:id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' })
    return
  }

  if (req.method === 'DELETE') {
    const subject = await prisma.subject.deleteMany({
      where: { authorId: Number(session.id) },
    })
    res.json(subject)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
