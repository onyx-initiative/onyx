import { randomBytes, randomUUID } from "crypto";
import NextAuth, { Awaitable, RequestInternal, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from 'next-auth/providers/credentials'
import { compare, hash } from 'bcrypt'
import AzureADProvider from "next-auth/providers/azure-ad";
import AppleProvider from "next-auth/providers/apple";

export interface Admin extends User { 
    admin: boolean
}

// http://localhost:3000/api/auth/callback/apple
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        AppleProvider({
            clientId: process.env.APPLE_ID as string,
            clientSecret: process.env.APPLE_SECRET as string,
          }),
        AzureADProvider({
            clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_AZURE_CLIENT_SECRET as string,
            // tenantId: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID as string,
          }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'email'
                },
                password: { label: 'Password', type: 'password', placeholder: 'password' },
            },
            authorize: async function (credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "headers" | "body" | "query" | "method">): Promise<Admin | null> {
                const { email, password } = credentials as {
                    email: string,
                    password: string
                  }

                const checkValid = await fetch('https://3uyqf7fpea.execute-api.ca-central-1.amazonaws.com/dev/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query GetAdminByEmail($email: String!) {
                                getAdminByEmail(email: $email) {
                                admin_id
                                email
                                password
                                }
                            }
                        `,
                    variables: {
                        email: email,
                    }
                    })
                })
                const valid = await checkValid.json();
                let admin;
                if (valid.data) {
                    admin = valid.data.getAdminByEmail;
                } else {
                    admin = null;
                }
                if (!admin) {
                    // Create the user
                    // First, check if the user is a valid admin
                    const checkValid = await fetch('https://3uyqf7fpea.execute-api.ca-central-1.amazonaws.com/dev/graphql', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            query: `
                                query Query($email: String!) {
                                    checkAllowedAdmin(email: $email)
                                }
                            `,
                        variables: {
                            email: email,
                        }
                        })
                    })
                    const valid = await checkValid.json();
                    if (valid.data.checkAllowedAdmin) {
                        // Create the user
                        const createUser = await fetch('https://3uyqf7fpea.execute-api.ca-central-1.amazonaws.com/dev/graphql', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                                query: `
                                    mutation Mutation($email: String!, $password: String!) {
                                        createAdmin(email: $email, password: $password) {
                                            admin_id
                                            email
                                        }
                                    }
                                `,
                            variables: {
                                email: email,
                                password: await hash(password, 12)
                            }
                            })
                        })
                        const user = await createUser.json();
                        return { id: user.data.createAdmin.admin_id, email: email, admin: true };
                    } else {
                        throw new Error('This email is not permitted to access the admin panel.');
                    }
                } else {
                    // The user is valid
                    const isValid = await compare(password, admin.password);

                    if (!isValid) {
                        throw new Error('Wrong credentials. Try again.')
                    }
              
                    return { id: admin.admin_id, email: email, admin: true };
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
          // IMPORTANT: Persist the access_token to the token right after sign in
          if (account) {
            token.idToken = account.id_token;
          }
          return token;
        },},
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
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days
        maxAge: 60 * 60 * 2, // 2 hours

        updateAge: 60 * 60 * 2, // 2 hours
        
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        },
    },
    cookies: {
        pkceCodeVerifier: {
          name: 'next-auth.pkce.code_verifier',
          options: {
            httpOnly: true,
            sameSite: 'none',
            path: '/',
            secure: true,
          },
        },
    },
    jwt: {
        maxAge: 60 * 60 * 24, // 1 day
    },
    secret: process.env.NEXTAUTH_SECRET as string,
});