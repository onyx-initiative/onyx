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
            
            <div>
                <Image src={logo} 
                alt="Company Logo" 
                width={200}
                height={120} />
            </div>
            <div className={styles.employerInfo}>
                <h4 className={styles.companyName}>{companyName}</h4>
                <p>{info}</p>
            </div>
            
        </div>
    )
}