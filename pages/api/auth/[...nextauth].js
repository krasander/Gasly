import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
    server: process.env.EMAIL_SERVER, 
    from: process.env.EMAIL_FROM
  }),
  ],
  // Session is valid for 30 days
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)
