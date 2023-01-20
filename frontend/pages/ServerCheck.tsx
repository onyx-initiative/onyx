import React from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { GET_ADMINS } from '../graphql/queries/adminQueries'
import { CREATE_ADMIN } from '../graphql/mutations/adminMutations'


// This is only for testing, delete after

export default function ServerCheck() {

    const {
        loading: adminLoading, 
        error: adminError, 
        data: adminData, 
        refetch: refetchAdmins 
    } = useQuery(GET_ADMINS, {
        pollInterval: 500,
        fetchPolicy: 'cache-and-network'
    })
    const [getAdmins, 
        { 
            loading: lazyAdminLoading, 
            error: lazyAdminError, 
            data: lazyAdminData 
        }
    ] = useLazyQuery(GET_ADMINS, {
        // This ensures that the query is up to date
        fetchPolicy: 'cache-and-network'
    })
    const [createAdmin, { data, loading, error }] = useMutation(CREATE_ADMIN, {
        // Every time this mutation is called, the query will be refetched
        // This is a better solution than the one above
        refetchQueries: [{ query: GET_ADMINS }]
    });

    return (
        <div>
            <button
                onClick={() => {
                    createAdmin({ variables: { name: "Test", email: "new_email@onyx.org"}})
                    console.log(data)
                }}
            >
                Make Admin
            </button>
            <button
                onClick={() => {
                    getAdmins()
                    console.log(lazyAdminData)
                }}
            >
                Check Admins
            </button>
        </div>
    )
}