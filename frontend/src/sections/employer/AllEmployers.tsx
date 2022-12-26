import React from "react";
import styles from '../../../styles/components/EmployerBlock.module.css'
import EmployerBlock from "../../components/employer/EmployerBlock";

export default function AllEmployers(props: any) {
    const employer = sampleData.map(employer => {
        return (
            <EmployerBlock 
                logo={employer.logo}
                companyName={employer.companyName}
                link={employer.link}
                info={employer.info}
                
            />
        )
    })


    return (
        <div className="All Employers"> 
            {employer}
        </div>



    )
}


//sample data for employer tag
const sampleData = [
    {
        logo: 'https://1000logos.net/wp-content/uploads/2018/10/RBC-Logo-500x281.png',
        companyName: 'Royal Bank of Canada',
        location: 'Toronto, ON',
        info: 'Bank',
        link: 'https://jobs.rbc.com/ca/en',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2021/05/Scotiabank-logo-500x281.png',
        companyName: 'Scotiabank',
        location: 'Toronto, ON',
        info: 'Bank',
        link: 'https://jobs.scotiabank.com/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png',
        companyName: 'Amazon',
        location: 'Toronto, ON',
        info: 'Tech',
        link: 'https://www.amazon.jobs/en-gb/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png',
        companyName: 'Amazon',
        location: 'Toronto, ON',
        info: 'Tech',
        link: 'https://www.amazon.jobs/en-gb/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png',
        companyName: 'Amazon',
        location: 'Toronto, ON',
        info: 'Tech',
        link: 'https://www.amazon.jobs/en-gb/',
    }
]