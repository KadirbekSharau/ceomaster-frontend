// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await api.post('/auth/google', {
            email: user.email,
            googleId: account.providerAccountId
          })
          
          if (response.data.isNewUser) {
            return '/onboarding'
          }
          return true
        } catch (error) {
          return false
        }
      }
      return false
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }