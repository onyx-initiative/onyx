import styles from "../../../styles/components/EmployerBlock.module.css";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Drawer, Button, ScrollArea } from '@mantine/core';
import { job_type, Job } from '../../../../backend/src/types/db.types';
import EmployerJobList from './EmployerJobList';
import {Employer} from '../../../../backend/src/types/db.types'
import { GET_EMPLOYER_BY_ID } from '../../../graphql/queries/employerQueries';
import { useQuery } from "@apollo/client";
import { GET_JOBS_BY_EMPLOYER_ID } from "../../../graphql/queries/jobQueries";
import { getLogo, unsupportedCompanies } from "../../utils/microservices";



export const EmployerBlock = (props: any) => {
    const { employer, jobs } = props
    const [opened, setOpened] = useState(false);

    // const {data: JobList, loading: jobLoading, error}  = useQuery(GET_JOBS_BY_EMPLOYER_ID, {
    //   variables: { employerId: employer.employer_id}
    // });
    
    // const [jobs, setJobs] = useState([])
      
    // useEffect(() => {
    //   if (!jobLoading && JobList?.getJobsByEmployerId) {
    //       setJobs(JobList?.getJobsByEmployerId)
    //   } else {
    //       setJobs([])
    //   }
    //   // Ignore, this is intentional
    // }, [JobList, jobLoading]);

    return (
        
        <>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding="xl"
          size="xl"
          position="right"
          scrollAreaComponent={ScrollArea.Autosize}
        >
          
            <Image src={employer.logo_url} 
                    alt="Company Logo" 
                    width={90}
                    height={90}
                    loader={({ src }) => src }
                    unoptimized
            />
            <p>{employer.description}</p>
            <h3>Job Postings</h3>
            <EmployerJobList jobs={jobs.filter((job: Job) => job.employer_id === employer.employer_id)} />
            
        </Drawer>
  
        <Button  className={styles.employerContainer} onClick={() => setOpened(true)}>
            <div>
                <Image src={employer.logo_url} 
                    alt="Company Logo" 
                    width={90}
                    height={90} 
                    // layout="fill"
                    objectFit="contain"
                    unoptimized={true}
                    priority={true}
                    loader={({ src }) => src }
                    />
            </div>

        </Button>
        
      </>
        
    ) 
}
    








