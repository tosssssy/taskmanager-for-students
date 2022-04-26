import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { deleteHandler } from './delete'
import { getHandler } from './get'
import { postHandler } from './post'
import { putHandler } from './put'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  const handlerArgs = {
    req,
    res,
    session,
  }

  switch (req.method) {
    case 'GET':
      return getHandler(handlerArgs)
    case 'POST':
      return postHandler(handlerArgs)
    case 'PUT':
      return putHandler(handlerArgs)
    case 'DELETE':
      return deleteHandler(handlerArgs)
    default:
      return res.status(405).json({ message: 'メソッドが定義されていません' })
  }
}
