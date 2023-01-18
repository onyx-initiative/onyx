import { 
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink
} from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "",
        // uri: "http://localhost:4000/dev/graphql",
        fetchOptions: {
            mode: 'no-cors'
        }
    }),
    // uri: "http://localhost:4000/dev/graphql"
})

export const ApolloContextProvider = ({ children }: any) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}