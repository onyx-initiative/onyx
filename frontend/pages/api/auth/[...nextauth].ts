import NextAuth from "next-auth";
import HubspotProvider from "next-auth/providers/hubspot";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        HubspotProvider({
            clientId: process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_SECRET as string,
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