import dayjs from 'dayjs'
import prisma from '../../../lib/prisma'
import { HandlerArgs } from '../../../types/handler'

export const getHandler = async ({ req, res, session }: HandlerArgs) => {
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
}
