import React from "react";
import styles from "../../../styles/components/EmployerBlock.module.css";
import Image from 'next/image';

type EmployerBlock = {
    logo: string;
    companyName: string;
    link: string;
    info: string
}

export default function EmployerBlock({logo, companyName, link, info}: EmployerBlock) {
    return (
        <div className={styles.employerContainer}>
            <Image
            src={logo} 
            alt="Company Logo" 
            width={200}
            height={100} />
            
            <div className={styles.employerInfo}>
                <h4>{companyName}</h4>
                <p>{info}</p>
                
            </div>
            <a href={link}>Click here for their job board</a>
        </div>
    )
}