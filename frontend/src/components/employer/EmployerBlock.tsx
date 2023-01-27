import React from "react";
import styles from "../../../styles/components/EmployerBlock.module.css";
import Image from 'next/image';
import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';
import { job_type, Job } from '../../../../backend/src/types/db.types';
import EmployerJobList from './EmployerJobList';



type EmployerBlock = {
    logo: string;
    companyName: string;
    link: string;
    info: string
}

export default function EmployerBlock({logo, companyName, link, info}: EmployerBlock) {
    const [opened, setOpened] = useState(false);
    
    const jobs = sampleJob

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
                    height={120}
            />
            <p>{info}</p>
            <h3>Job Postings</h3>
            <EmployerJobList jobs={jobs} />
            
        </Drawer>
  
        <Button  className={styles.employerContainer} onClick={() => setOpened(true)}>
            <div>
                <Image src={logo} 
                    alt="Company Logo" 
                    width={200}
                    height={120} />
            </div>

        </Button>
        
      </>
        
    ) 

}




//Sample Data
const sampleJob: Job[] = [
    {
    job_id: '123',
    employer_id: '123',
    admin_id: '123',
    title: 'Software Engineer',
    description: "This is a sample job description for a software engineer in Toronto. Please visit www.mckinsey.com/careers to apply.",
    job_type: 'Full Time',
    location: 'Toronto, ON',
    applicant_year: [2023, 2024],
    deadline: new Date(),
    total_views: 0,
    tags: ['Software', 'Engineering', 'Internship', 'DevOps', 'Backend'],
    },
    {
      job_id: '456',
      employer_id: '456',
      admin_id: '456',
      title: 'Business Analyst',
      description: "This is a sample job description for a software engineer in Toronto. Please visit www.mckinsey.com/careers to apply.",
      job_type: 'Full Time',
      location: 'Toronto, ON',
      applicant_year: [2023, 2024],
      deadline: new Date(),
      total_views: 0,
      tags: ['Software', 'Engineering', 'Internship', 'DevOps', 'Backend'],
    },
    {
      job_id: '2',
      employer_id: '2',
      admin_id: '2',
      title: 'Software Engineer',
      description: "This is a sample job description for a software engineer in Toronto. Please visit www.mckinsey.com/careers to apply.",
      job_type: 'Full Time',
      location: 'Toronto, ON',
      applicant_year: [2023, 2024],
      deadline: new Date(),
      total_views: 0,
      tags: ['Software', 'Engineering', 'Internship', 'DevOps', 'Backend'],
    },
]
