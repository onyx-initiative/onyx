import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ADMINS } from '../graphql/queries/adminQueries'


// This is only for testing, delete after

export default function ServerCheck() {

    const {loading, error, data } = useQuery(GET_ADMINS)

    console.log(data)

    return (
        <div>
            {!loading && !error ?
            <div>
                <h1>{data.getAdmins.name} + {data.getAdmins.email}</h1>
                <button onClick={() => console.log(data)}>Click me</button>
            </div>
            : 
            <div>
                <h1>Loading...</h1>
            </div>
            }
        </div>
    )
}