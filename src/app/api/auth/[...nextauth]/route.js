import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "@/app/firebase.config";
import { cert } from "firebase-admin/app";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt"
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  // adapter: FirestoreAdapter(firestore),
  adapter: FirestoreAdapter({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
    })
}),
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}