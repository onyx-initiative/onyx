import { DELETE_JOB } from "../graphql/mutations/jobMutations";
import { GET_JOBS } from "../graphql/queries/jobQueries";
import React, {useState} from 'react';
import styles from '../../frontend/styles/components/RemoveJob.module.css';
import Image from 'next/image';
import { useMutation, useQuery } from "@apollo/client";
import { Job } from "../../backend/src/types/db.types";
import loading_svg from "../../frontend/src/assets/loading.svg";
import SearchBar from "../src/components/general/SearchBar";
import {GET_EMPLOYER_BY_ID} from "../graphql/queries/employerQueries";
import {BsFillTrashFill } from "react-icons/bs";

//Search Bar



type SelectedJob = {
    jobID: string
}

export default function RemoveJob(props: SelectedJob) {


    //Mutations and Queries Needed
    const [deleteJob, {data: jobData, loading: deleteLoading, error}] = useMutation(DELETE_JOB)
    const { data: jobsData, loading: loading, error: AllJobQueryError } = useQuery(GET_JOBS)


    
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
                {loading ? <p>loading</p> : jobsData.getJobs.map((job: Job) => <RemoveJobCard deleteJob={deleteJob} job={job}/>
                )}
                </div>
            </div>
        </div>

    )
}



export function RemoveJobCard(props: any) {

    const {job, deleteJob} = props
    const {data: employer_name, loading, error} = useQuery(GET_EMPLOYER_BY_ID, {variables: {
        employerId: job.employer_id
    }})


    const deadline_date = new Date(parseInt(job.deadline)).toDateString();
    const date_posted = new Date(parseInt(job.date_posted)).toDateString();

    const confirmDelete = () => {
        if (confirm("Are you sure you want to delete this job?")) {
          // If the user clicks "OK", proceed with the deletion logic here
          // For example, you can make an API call to delete a resource, or update the UI to remove the deleted item
          console.log("Deleting...");
          deleteJob({variables: {jobId: job.job_id}})
          
        } else {
          // If the user clicks "Cancel", do nothing
          console.log("Cancelled deletion.");
        }
      }

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


 
  
  