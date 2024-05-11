import styles from "../../../styles/components/EmployerBlock.module.css";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Drawer, Button, ScrollArea, Center } from '@mantine/core';
import { job_type, Job } from '../../../../backend/src/types/db.types';
import EmployerJobList from './EmployerJobList';
import {Employer} from '../../../../backend/src/types/db.types'
import { GET_EMPLOYER_BY_ID } from '../../../graphql/queries/employerQueries';
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOBS_BY_EMPLOYER_ID } from "../../../graphql/queries/jobQueries";
import { getLogo, unsupportedCompanies } from "../../utils/microservices";
import va from '@vercel/analytics';
import { useMediaQuery } from "react-responsive";
import { LOG_EMPLOYER_CLICK } from "../../../graphql/mutations/analyticsMutations";
import { useSession } from "next-auth/react";
import { GET_SCHOLAR_BY_EMAIL } from "../../../graphql/queries/scholarQueries";



export const EmployerBlock = (props: any) => {
  const { data: session } = useSession({ required: true })
    const { employer, jobs } = props
    const [opened, setOpened] = useState(false);
    const [logEmployerClick] = useMutation(LOG_EMPLOYER_CLICK);
    const { data: scholarData, loading: loadingScholar, error: scholarError } = useQuery(GET_SCHOLAR_BY_EMAIL, {
      variables: { email: session?.user?.email }
    })

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

    const isLargeScreen = useMediaQuery({ query: '(min-width: 800px)' })

    const handleEmployerClick = async () => {
      
      setOpened(!opened);
      try {
        // Ensure scholarId and jobId are integers before passing them to the mutation
        const scholarIdInt = parseInt(scholarData?.getScholarByEmail?.scholar_id, 10);
        const EmployerIdInt = parseInt(employer.employer_id, 10);
        const currentDate = new Date();
        console.log(session?.user?.email)
        await logEmployerClick({
          variables: { scholarId: scholarIdInt, employerId: EmployerIdInt }
        });
      } catch (err) {
        const scholarIdInt = scholarData?.getScholarByEmail?.scholar_id
        const EmployerIdInt = parseInt(employer.employer_id, 10);
        console.log(scholarIdInt)
        console.log(EmployerIdInt)
        console.error(err);
      }
    }

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
          
            <Image src={employer.logo_url ? employer.logo_url : getLogo(employer.name)} 
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
            <Button  className={styles.employerContainer} onClick={handleEmployerClick}>
                <div>
                    <Image src={employer.logo_url ? employer.logo_url : getLogo(employer.name)} 
                        alt="Company Logo" 
                        width={isLargeScreen ? 200 : 90}
                        height={isLargeScreen ? 200 : 90}
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








