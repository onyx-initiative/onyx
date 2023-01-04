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

const text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. "

//sample data for employer tag
const sampleData = [
    {
        logo: 'https://1000logos.net/wp-content/uploads/2018/10/RBC-Logo-500x281.png',
        companyName: 'Royal Bank of Canada',
        location: 'Toronto, ON',
        info: text,
        link: 'https://jobs.rbc.com/ca/en',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2021/05/Scotiabank-logo-500x281.png',
        companyName: 'Scotiabank',
        location: 'Toronto, ON',
        info: text,
        link: 'https://jobs.scotiabank.com/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png',
        companyName: 'Amazon',
        location: 'Toronto, ON',
        info: text,
        link: 'https://www.amazon.jobs/en-gb/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png',
        companyName: 'Google',
        location: 'Toronto, ON',
        info: text,
        link: 'https://www.amazon.jobs/en-gb/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png',
        companyName: 'Facebook',
        location: 'Toronto, ON',
        info: text,
        link: 'https://www.amazon.jobs/en-gb/',
    }
]