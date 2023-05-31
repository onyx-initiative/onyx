import { 
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink
} from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_URI
})

// const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     uri: "http://localhost:4000/dev/graphql"
// })

export const ApolloContextProvider = ({ children }: any) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}