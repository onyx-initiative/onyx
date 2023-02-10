import styles from "../../../styles/components/EmployerBlock.module.css";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Drawer, Button, Group } from '@mantine/core';
import { job_type, Job } from '../../../../backend/src/types/db.types';
import EmployerJobList from './EmployerJobList';
import {Employer} from '../../../../backend/src/types/db.types'
import { GET_EMPLOYER_BY_ID } from '../../../graphql/queries/employerQueries';
import { useQuery } from "@apollo/client";
import { GET_JOBS_BY_EMPLOYER_ID } from "../../../graphql/queries/jobQueries";



export const EmployerBlock = (props: any) => {
    const {employer} = props
    const [opened, setOpened] = useState(false);
    const { data, loading } = useQuery(GET_EMPLOYER_BY_ID, {
        variables: { employerId: employer.employer_id }
      });

    const {data: JobList, loading: jobLoading, error}  = useQuery(GET_JOBS_BY_EMPLOYER_ID, {
      variables: { employerId: employer.employer_id}
    });
    
    console.log(JobList)
    console.log(data)
    const [jobs, setJobs] = useState([])
    console.log(JobList)
    
    let website: string;
      if (employer.name) {
        website = websiteURL(employer.name)
      } else {
        if (loading) {
          website = 'www.onyxinitiative.org/'
        } else {
          website = websiteURL(data.getEmployerById.name);
        }
      }
    3
      let logo = fetchLogo(website);

      
      useEffect(() => {
        if (!jobLoading) {
            console.log(error, "Error")
            console.log("JobList", JobList)
            setJobs(JobList?.getJobsByEmployerId)
        }
        // Ignore, this is intentional
      }, [JobList, jobLoading])
    
  

    return (
        
        <>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding="xl"
          size="xl"
          position="right"
        >
            <Image src={logo} 
                    alt="Company Logo" 
                    width={200}
                    height={150}
            />
            <p>{employer.description}</p>
            <h3>Job Postings</h3>
            <EmployerJobList jobs={jobs} />
            
        </Drawer>
  
        <Button  className={styles.employerContainer} onClick={() => setOpened(true)}>
            <div>
                <Image src={logo} 
                    alt="Company Logo" 
                    width={200}
                    height={180} />
            </div>

        </Button>
        
      </>
        
    ) 
    }

    export const websiteURL = (company: string) => {
        // Temp fix
        if (company == 'Facebook') {
          return 'www.facebook.com';
        } else if (company === '') {
          return 'www.onyxinitiative.org/';
        } else {
          return "www." + company.toLowerCase().replace(/ /g, "-") + ".com";
        }
      }
      
      // Helper function to get logos dynamically
      // @todo: try to update this to get higher quality logos
      export const fetchLogo = (websiteURL: string) => {
        return `https://logo.clearbit.com/${websiteURL}`;
      }

    








