import styles from "../../../styles/components/EmployerBlock.module.css";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Drawer, Button, ScrollArea, Center } from '@mantine/core';
import { job_type, Job } from '../../../../backend/src/types/db.types';
import EmployerJobList from './EmployerJobList';
import {Employer} from '../../../../backend/src/types/db.types'
import { GET_EMPLOYER_BY_ID } from '../../../graphql/queries/employerQueries';
import { useQuery } from "@apollo/client";
import { GET_JOBS_BY_EMPLOYER_ID } from "../../../graphql/queries/jobQueries";
import { getLogo, unsupportedCompanies } from "../../utils/microservices";
import va from '@vercel/analytics';


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
    // }, [JobList, jobLoading]);)

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
                    width={80}
                    height={80}
                    loader={({ src }) => src }
                    unoptimized
            />
            <p>
                <a href={employer.website}>{"Learn more: " + employer.website}</a>
            </p>
            {employer.contact_email ? <p>{"Contact: " + employer.contact_email}</p> : null }
            
            <p>{filterNewlines(employer.description)}</p>
            {employer.student_new_grad_link ? <ApplyButton link={employer.student_new_grad_link} /> : null}
            <h3>Job Postings</h3>
            <EmployerJobList jobs={jobs.filter((job: Job) => job.employer_id === employer.employer_id)} />
            
        </Drawer>
        <div style={{
            display: "flex", 
            flexDirection: "column", 
            width: "100%", 
            padding: "0.5rem",
            alignItems: "center",
        }}>
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
            <h3>{employer.name}</h3>
        </div>
      </>
        
    ) 
}
    

export const filterNewlines = (text: string) => {
    if (!text) return "";
    const result = text.split('\n').map((str: string, indx: number) => <p key={indx}>{str}</p>);
    return result;
}

const ApplyButton = (props: any) => {

    const { link } = props;
  
    let regex = /^https:\/\//;
  
    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: '#806E53', 
            marginTop: 10, 
            paddingRight: 20, 
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            borderRadius: 5,
            width: 'fit-content',
        }}>
              <button 
                style={{ border: 'none', backgroundColor: 'transparent', padding: 0, margin: 0}}
              >
                <a 
                  href={regex.test(link) ? link : "https://" + link} 
                  style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem'}} 
                  target='_blank' 
                  rel="noreferrer"
                  onClick={() => {
                    va.track("Students and New Grads", { link: link });
                  }}
                >
                  Students and New Grads
                </a>
              </button>
            </div>
    )
  }








