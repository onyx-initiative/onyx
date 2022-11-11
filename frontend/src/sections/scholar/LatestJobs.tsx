import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import styles from '../../../styles/components/ScholarHero.module.css'

export default function LatestJobs() {
  return (
    <div>

    </div>
  )
}

type JobSnippet = {
    logo: string;
    positionTitle: string;
    companyName: string;
    location: string;
    type: string;
    deadline: string;
}

const JobSnippet = ({logo, positionTitle, companyName, location, type, deadline}: JobSnippet) => {
    <div>
        <Image 
            src={logo} 
            alt="Company Logo" 
            width={150} 
            height={100}
        />
    </div>
}

const sampleData = [
    {
        logo: '',
        positionTitle: 'Software Engineer',
        companyName: 'RBC',
        location: 'Toronto, ON',
        type: 'Full Time',
        deadline: '2021-12-31'
    }
]
