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
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  database: process.env.DATABASE_URL,
  callbacks: {
    redirect: async (url, _) => {
      if (url === '/api/auth/signin') {
        return Promise.resolve('/')
      }
      return Promise.resolve('/api/auth/signin')
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
