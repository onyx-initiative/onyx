import { DELETE_JOB } from "../graphql/mutations/jobMutations";
import { GET_JOBS } from "../graphql/queries/jobQueries";
import React, {useState, useEffect} from 'react';
import styles from '../../frontend/styles/components/RemoveJob.module.css';
import Image from 'next/image';
import { useMutation, useQuery } from "@apollo/client";
import { Job } from "../../backend/src/types/db.types";
import loading_svg from "../../frontend/src/assets/loading.svg";
import SearchBar from "../src/components/general/SearchBar";
import {GET_EMPLOYER_BY_ID} from "../graphql/queries/employerQueries";
import {BsFillTrashFill } from "react-icons/bs";
import { ApolloClient, InMemoryCache } from '@apollo/client';


//Search Bar



type SelectedJob = {
    jobID: string
}

export default function RemoveJob(props: SelectedJob) {


    //Mutations and Queries Needed
    const { data: jobsData, loading: loading, error: AllJobQueryError, refetch } = useQuery(GET_JOBS)

    const refetchQueries = [{ query: GET_JOBS }];

    
    // For if the page is loading 
    if (loading) {
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
            <h1>Search for a Job to remove!</h1>
            <SearchBar/>
            <div className={styles.jobContainer}>
                <div>
                {loading ? <p>loading</p> : jobsData.getJobs.map((job: Job, index:any) => <RemoveJobCard  job={job} key={index} refetchQueries={refetchQueries} />
                )}
                </div>
            </div>
        </div>

    )
}



export function RemoveJobCard(props: any) {
  const {job, refetchQueries } = props
  const [deleteJob, {data: jobData, loading: deleteLoading, error}] = useMutation(DELETE_JOB, {refetchQueries})


    const {data: employer_name, loading, error: queryError} = useQuery(GET_EMPLOYER_BY_ID, {variables: {
        employerId: job.employer_id
    }})


    const deadline_date = new Date(parseInt(job.deadline)).toDateString();
    const date_posted = new Date(parseInt(job.date_posted)).toDateString();

    async function confirmDelete() {
      try {
        console.log(job.job_id.toString())
        await deleteJob({variables: {jobId: job.job_id.toString()}})
        console.log("job deleted")
      }catch(queryError){
        console.error('Error occurred: ', queryError);
      }
    }

    if (loading) return <p>Loading...</p>;
    if (queryError) return <p>Error occurred. Please try again later.</p>;


    return (
        <div className={styles.removeJobCard}>
            <p>{job.title}</p>
            <p>{ loading ? <p>loading</p> : employer_name.getEmployerById.name}</p>
            <p>Deadline: {deadline_date}</p>
            <p>Date Posted: {date_posted}</p>
            <BsFillTrashFill onClick={confirmDelete} size={50} color="black"></BsFillTrashFill>
        </div>
    )
}


 
  
  