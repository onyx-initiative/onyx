import React from 'react'
import { gql } from '@apollo/client'

export default function ServerCheck() {

    const gqlUrl = 'https://da865d592f.execute-api.ca-central-1.amazonaws.com/dev/';

    const query = gql`
        query GetEmployerById($employerId: ID!) {
            getEmployerById(employer_id: $employerId) {
                employer_id
            }
        }
    `

    const healthCheck = async () => {
        const response = await fetch(gqlUrl + 'healthcheck', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        const data  = await response.json();
        console.log(data);
        return data
    }

    const getEmployer = async () => {
        const response = await fetch(gqlUrl + 'graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                query: query,
                variables: { employerId: '14' },
            }),
        });
        const data  = await response.json();
        console.log(data);
        return data
    }


    return (
        <div>
            <button onClick={getEmployer}>Health Check</button>
        </div>
    )
}
