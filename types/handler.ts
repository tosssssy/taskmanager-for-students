import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'

export type HandlerArgs = {
  req: NextApiRequest
  res: NextApiResponse
  session: Session
}
