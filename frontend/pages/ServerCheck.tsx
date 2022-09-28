import React from 'react'
import { gql, useQuery } from '@apollo/client'


// This is only for testing, delete after

export default function ServerCheck() {

    const GET_EMPLOYER_BY_ID = gql`
        query GetEmployerById($employerId: ID!) {
            getEmployerById(employer_id: $employerId) {
                employer_id
                name
            }
        }
    `
    
    const {loading, error, data } = useQuery(GET_EMPLOYER_BY_ID, {
        variables: { employerId: '14' }
    })

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