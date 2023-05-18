import React, { useEffect } from 'react'
import { Carousel } from '@mantine/carousel';
import { createStyles, Paper, Text, Title, Button, useMantineTheme } from '@mantine/core';
import styles from '../../../styles/components/ScholarHero.module.css'
import Image from 'next/image';
import { websiteURL, fetchLogo } from '../../components/jobs/JobCard';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYERS } from '../../../graphql/queries/employerQueries';
import { Employer } from '../../../../backend/src/types/db.types';
import Loading from '../../../pages/Loading';
import { getLogo, unsupportedCompanies } from '../../utils/microservices';

export default function ScholarHero() {
    const {data: employerData, loading: loadingEmployers } = useQuery(GET_EMPLOYERS)

    if (loadingEmployers) {
        return (
            <Loading />
    )}

    const employers = employerData.getEmployers.map(
        (employer: Employer) => {
            return (
                <Carousel.Slide key={employer.name}>
                    <EmployerCard
                        name={employer.name}
                        description={employer.description}
                        employer_id={employer.employer_id}
                        admin_id={employer.admin_id}
                        contact_email={employer.contact_email}
                        address={employer.address}
                        website={employer.website}
                    />
                </Carousel.Slide>
            )
        }
    )

  return (
    <div className={styles.container}>
        <h2>Featured Employers</h2>
        <div className={styles.carouselContainer}>
            <Carousel
                sx={{ maxWidth: '80%' }}
                mx="auto"
                slideGap="xs"
                controlSize={22}
                slideSize="20%"
                loop
                align="start"
                withIndicators
                styles={{ indicators: { position: 'relative', top: 20, marginBottom: 20 } }}
            >
                {employers}
            </Carousel>
        </div>
    </div>
  )
}

const EmployerCard = (props: Employer) => {
    const { 
        name, 
        description,
        employer_id, 
        admin_id, 
        contact_email, 
        address, 
        website
    } = props
    const [logo, setLogo] = React.useState('')
    
    // NOTE: Logo rendering
    useEffect(() => {
        setLogo('https://logo.clearbit.com/www.onyxinitiative.org/');
        if (name) {
            if (name in unsupportedCompanies) {
                const newLogo = unsupportedCompanies[name as keyof typeof unsupportedCompanies]
                setLogo(newLogo)
            } else {
                getLogo(name).then(logo => {
                    setLogo(logo.logo)
                });
            }
        }
      }, [name]);
      
    return (
        <Paper
            className={styles.card}
        >
            <div>
                <Image 
                    src={logo} 
                    alt="Company Logo" 
                    width={100} 
                    height={100}
                />
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </Paper>
    )
}
