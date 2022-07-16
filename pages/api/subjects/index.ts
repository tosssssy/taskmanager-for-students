import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  if (req.method === 'GET') {
    const page = Number(req.query['page'])
    try {
      const result = await prisma.subject.findMany({
        where: {
          author: { id: Number(session.id) },
          date: {
            gte: dayjs().day(-1).add(page, 'week').toISOString(),
            lte: dayjs().day(6).add(page, 'week').toISOString(),
          },
        },
      })

      return res.json(result)
    } catch (error) {
      return res.status(500).json(error)
    }
  } else if (req.method === 'POST') {
    try {
      const result = await prisma.subject.createMany({
        data: [...req.body],
      })
      return res.json(result)
    } catch (error) {
      return res.status(500).json(error)
    }
  } else if (req.method === 'PUT') {
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
  } else if (req.method === 'DELETE') {
    try {
      await prisma.subject.deleteMany({
        where: { authorId: Number(session.id) },
      })
      return res.status(204).end()
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(405).json({ message: 'メソッドが定義されていません' })
  }
}
