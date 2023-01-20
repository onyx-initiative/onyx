import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ADMINS } from '../graphql/queries/adminQueries'


// This is only for testing, delete after

export default function ServerCheck() {

    const {loading, error, data } = useQuery(GET_ADMINS)

    return (
        <div>
            <button
                onClick={() => {
                    console.log(data)
                }}
            >
                Make Admin
            </button>
            <button
                onClick={() => {
                    GET_ADMINS
                    console.log(data)
                }}
            >
                Check Admins
            </button>
        </div>
    )
}