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
    const { id, status, memo } = req.body
    const result = await prisma.subject.update({
      where: { id: Number(id) },
      data: {
        status: Number(status),
        memo: String(memo),
      },
    })
    return res.json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}
