import { 
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://netgbz47ie.execute-api.ca-central-1.amazonaws.com/dev/graphql'
})

export const ApolloContextProvider = ({ children }: any) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}