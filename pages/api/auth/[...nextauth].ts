import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'
import prisma from '../../../lib/prisma'

const options: NextAuthOptions = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  callbacks: {
    session: async (session, user) => {
      session.id = Number(user.id)
      return Promise.resolve(session)
    },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
