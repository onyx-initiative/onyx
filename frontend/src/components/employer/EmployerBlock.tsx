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




