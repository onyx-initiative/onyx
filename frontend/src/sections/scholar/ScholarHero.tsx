import React from 'react'
import { Carousel } from '@mantine/carousel';
import { createStyles, Paper, Text, Title, Button, useMantineTheme } from '@mantine/core';
import styles from '../../../styles/components/ScholarHero.module.css'
import Image from 'next/image';
import { websiteURL, fetchLogo } from '../../components/jobs/JobCard';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYERS } from '../../../graphql/queries/employerQueries';
import { Employer } from '../../../../backend/src/types/db.types';
import Loading from '../../../pages/Loading';
import {Drawer} from '@mantine/core';
import { useState } from 'react';
import EmployerJobList from '../../components/employer/EmployerJobList';
import { EmployerBlock } from '../../components/employer/EmployerBlock';
import { GET_EMPLOYER_BY_ID } from '../../../graphql/queries/employerQueries';
import { GET_JOBS_BY_EMPLOYER_ID } from '../../../graphql/queries/jobQueries';

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
                    <EmployerBlock
                        className={styles.card}
                        employer={employer}
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
                sx={{ maxWidth: '90%' }}
                mx="auto"
                slideGap="xl"
                controlSize={29}
                slideSize="25%"
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


