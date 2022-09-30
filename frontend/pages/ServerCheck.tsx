import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_EMPLOYER_BY_ID } from '../graphql/queries/employerQueries'


// This is only for testing, delete after

export default function ServerCheck() {

    const {loading, error, data } = useQuery(GET_EMPLOYER_BY_ID, {
        variables: { employerId: '14' }
    })

    console.log(data)

    return (
        <div>
            {!loading && !error ?
            <div>
                <h1>{data.getEmployerById.name}</h1>
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