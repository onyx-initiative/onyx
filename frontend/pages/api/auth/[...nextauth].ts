import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
        })
    ],
    secret: process.env.NEXT_PUBLIC_JWT_SECRET as string,
    pages: {
        signIn: "/Login",
        signOut: "/",
        error: "/Login",
        verifyRequest: "/Login",
    },
});