import { 
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_URI
})

export const ApolloContextProvider = ({ children }: any) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}