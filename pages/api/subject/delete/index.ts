import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../../lib/prisma'

// DELETE /api/post/:id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  try {
    const subject = await prisma.subject.deleteMany({
      where: { authorId: Number(session.id) },
    })
    return res.json(subject)
  } catch (error) {
    return res.status(500).json(error)
  }
}
