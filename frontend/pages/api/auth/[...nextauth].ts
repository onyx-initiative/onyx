import { randomBytes, randomUUID } from "crypto";
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
    secret: process.env.NEXT_AUTH_SECRET as string,
    pages: {
        signIn: "/Login",
        signOut: "/",
        error: "/Login",
        verifyRequest: "/Login",
    },
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days
        maxAge: 60 * 60 * 24, // 1 day

        updateAge: 24 * 60 * 60, // 24 hours
        
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    jwt: {
        maxAge: 60,
    }
});