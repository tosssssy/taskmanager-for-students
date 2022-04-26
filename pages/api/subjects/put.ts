import prisma from '../../../lib/prisma'
import { HandlerArgs } from '../../../types/handler'

export const putHandler = async ({ req, res, session }: HandlerArgs) => {
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
