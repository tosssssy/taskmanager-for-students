import prisma from '../../../lib/prisma'
import { HandlerArgs } from '../../../types/handler'

export const getHandler = async ({ req, res, session }: HandlerArgs) => {
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
