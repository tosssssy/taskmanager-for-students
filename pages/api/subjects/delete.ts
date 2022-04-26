import prisma from '../../../lib/prisma'
import { HandlerArgs } from '../../../types/handler'

export const deleteHandler = async ({ req, res, session }: HandlerArgs) => {
  try {
    await prisma.subject.deleteMany({
      where: { authorId: Number(session.id) },
    })
    return res.status(204).end()
  } catch (error) {
    return res.status(500).json(error)
  }
}
