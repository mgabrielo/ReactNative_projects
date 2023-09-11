import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { PropsWithChildren } from 'react';

const client = new ApolloClient({
    uri:"https://calvizzano.stepzen.net/api/fun-ant/__graphql",
    headers:{
        Authorization:'apikey '
    },
    cache: new InMemoryCache(),
})

const ApolloClientProvider=({children}:PropsWithChildren) =>{
    return(
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default ApolloClientProvider;