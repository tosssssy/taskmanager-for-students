import prisma from '../../../lib/prisma'
import { HandlerArgs } from '../../../types/handler'

export const postHandler = async ({ req, res, session }: HandlerArgs) => {
  try {
    const result = await prisma.subject.createMany({
      data: [...req.body],
    })
    return res.json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}
