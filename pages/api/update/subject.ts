import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({ message: 'Not authenticated' })
    return
  }
  const { id, status, memo } = req.body
  const result = await prisma.subject.update({
    where: { id: Number(id) },
    data: {
      status: Number(status),
      memo: String(memo),
    },
  })
  res.json(result)
}
