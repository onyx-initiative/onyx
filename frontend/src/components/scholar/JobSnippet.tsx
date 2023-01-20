import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import styles from '../../../styles/components/LatestJobs.module.css'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi'

type JobSnippet = {
    logo: string;
    positionTitle: string;
    companyName: string;
    location: string;
    type: string;
    deadline: string;
}

export default function JobSnippet({logo, positionTitle, companyName, location, type, deadline}: JobSnippet) {

    return (
        <div className={styles.snippetContainer}>
            <Image 
                src={logo} 
                alt="Company Logo" 
                width={100}
                height={50}
            />
            <div className={styles.jobInfo}>
                <h3>{positionTitle}</h3>
                <div className={styles.info}>
                    <HiOutlineBuildingOffice2 size={20}/>
                    <h4>{companyName}</h4>
                    <HiOutlineLocationMarker size={20}/>
                    <h4>{location}</h4>
                    <HiOutlineClock size={20}/>
                    <h4>{type}</h4>
                </div>
            </div>
            <div className={styles.deadline}>
                <h3>Deadline</h3>
                <h4>{deadline}</h4>
            </div>
        </div>
    )
}