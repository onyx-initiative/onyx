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
import BackButton from '../src/components/admin/BackButton';
import { getLogo } from '../src/utils/microservices';

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
          <BackButton />
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

    async function confirmDelete() {
      try {
        var result = confirm(`Are you sure you want to delete ${employer.name}?`);
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

    return (
      <div>
        <div className={styles.removeEmployerCard}>
            <Image width={50} height={100} src={employer.logo_url ? employer.logo_url : getLogo(employer.name)} alt='employer logo' loader={({ src }) => src }/>
            <BsFillTrashFill onClick={confirmDelete} size={20} color="black"></BsFillTrashFill>
        </div>
        <h4>{employer.name}</h4>
      </div>
    )
}
