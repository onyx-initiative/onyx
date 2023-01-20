import React from "react";
import styles from '../../../styles/components/EmployerBlock.module.css'
import EmployerBlock from "../../components/employer/EmployerBlock";

export default function AllEmployers(props: any) {
    const employer = sampleData.map(employer => {
        return (
            <EmployerBlock 
                key={employer.companyName}
                logo={employer.logo}
                companyName={employer.companyName}
                link={employer.link}
                info={employer.info}
                
            />
        )
    })


    return (
        <div> 
            <div className={styles.allEmployersList}>
                {employer}
            </div>
        </div>
    )
}

const text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa.  "

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
        link: 'https://careers.google.com/jobs/results/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png',
        companyName: 'Meta',
        location: 'Toronto, ON',
        info: text,
        link:'https://www.metacareers.com/',
    },
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
        link: 'https://careers.google.com/jobs/results/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png',
        companyName: 'Meta',
        location: 'Toronto, ON',
        info: text,
        link:'https://www.metacareers.com/',
    },
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
        link: 'https://careers.google.com/jobs/results/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png',
        companyName: 'Meta',
        location: 'Toronto, ON',
        info: text,
        link:'https://www.metacareers.com/',
    },
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
        link: 'https://careers.google.com/jobs/results/',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png',
        companyName: 'Meta',
        location: 'Toronto, ON',
        info: text,
        link:'https://www.metacareers.com/',
    }
]