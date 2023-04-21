import React, { useState, useEffect } from 'react'
import {REMOVE_EMPLOYER} from "../graphql/mutations/employerMutations"
import {GET_EMPLOYERS, GET_EMPLOYER_BY_ID} from "../graphql/queries/employerQueries"
import Image from 'next/image';
import { useMutation, useQuery } from '@apollo/client';
import styles from '../../frontend/styles/components/RemoveJob.module.css';
import loading_svg from "../../frontend/src/assets/loading.svg";
import SearchBar from "../src/components/jobs/SearchBar";
import { Employer } from '../../backend/src/types/db.types';
import { BsFillTrashFill } from 'react-icons/bs';
import {fetchLogo} from "../src/components/jobs/JobCard"

type SelectedEmployer = {
    employerId: string
}

export default function RemoveEmployer(props: SelectedEmployer) {
    const {} = props

    const {data:employersData, loading: employersLoading, error: employerLoadingError} = useQuery(GET_EMPLOYERS)



    const refetchQueries = [{ query: GET_EMPLOYERS }];

    const [search, setSearch] = useState('')
    const [employers, setEmployers] = useState([])

    useEffect(() => {
      if (!employersLoading) {
          setEmployers(employersData?.getEmployers)
        }
      }
      // Ignore, this is intentional
     ,[employersData, employersLoading])

     
    // For if the page is loading 
    if (employersLoading) {
        return (
          <div className={styles.loading}>
            <Image src={loading_svg} alt="Loading..." width={100} height={100}/>
            <h1>Loading...</h1>
          </div>
        )
      }
    
    

    return (
        <div>
          <Image
              src="https://onyxinitiative.org/assets/img/onyxlogo_nav.png" 
              alt="Onyx Logo" 
              width={250} 
              height={100} 
          />
            <h1>Find an Employer to Remove!</h1>
            <div >
                <div className={styles.employerContainer}>
                {employersLoading ? <p>loading</p> : employers.map((employer: Employer, index:any) => <RemoveEmployerCard  employer={employer} key={index} refetchQueries={refetchQueries} />
                )}
                </div>
            </div>
        </div>

    )
}



export function RemoveEmployerCard(props: any) {
  const {employer, refetchQueries } = props
  const [RemoveEmployer, {data: employerData, loading: deleteLoading, error}] = useMutation(REMOVE_EMPLOYER, {refetchQueries})

   

    const {data: employer_name, loading, error: queryError} = useQuery(GET_EMPLOYER_BY_ID, {variables: {
        employerId: employer.employer_id
    }})

    let logo = fetchLogo(employer_name?.getEmployerById.website)

    async function confirmDelete() {
      try {
        var result = confirm("Are you sure you want to delete this Employer?");
        if (result == true) {
        console.log(employer.employer_id)
        await RemoveEmployer({variables: {employerId: employer.employer_id}})
        console.log("Employer deleted")}
        else {
    } }
      catch(queryError){
        console.error('Error occurred: ', queryError);
      }
    }

    if (loading) return <p>Loading...</p>;
    if (queryError) return <p>Error occurred. Please try again later.</p>;


    return (
        <div className={styles.removeJobCard}>
            <Image width={200} height={50} src={logo} />
            <BsFillTrashFill onClick={confirmDelete} size={20} color="black"></BsFillTrashFill>
        </div>
    )
}
