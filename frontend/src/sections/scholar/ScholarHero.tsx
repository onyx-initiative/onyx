import React, { useEffect } from 'react'
import { Carousel } from '@mantine/carousel';
import { createStyles, Paper, Text, Title, Button, useMantineTheme } from '@mantine/core';
import styles from '../../../styles/components/ScholarHero.module.css'
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYERS } from '../../../graphql/queries/employerQueries';
import { Employer } from '../../../../backend/src/types/db.types';
import Loading from '../../../pages/Loading';
import { useMediaQuery } from 'react-responsive';
import { getLogo, unsupportedCompanies } from '../../utils/microservices';
import {Drawer} from '@mantine/core';
import { useState } from 'react';
import EmployerJobList from '../../components/employer/EmployerJobList';
import { EmployerBlock } from '../../components/employer/EmployerBlock';
import { GET_EMPLOYER_BY_ID } from '../../../graphql/queries/employerQueries';
import { GET_JOBS, GET_JOBS_BY_EMPLOYER_ID } from '../../../graphql/queries/jobQueries';

export default function ScholarHero(props: any) {
    const { employerData, employerLoading } = props
    const { data: jobData, loading: jobLoading } = useQuery(GET_JOBS)

    const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });
    if (employerLoading || jobLoading) {
        return (
            <Loading />
    )}

    

    const employers = employerData.map(
        (employer: Employer) => {
            return (
                <Carousel.Slide key={employer.name}>
                    <EmployerBlock
                        key={employer.employer_id}
                        className={styles.card}
                        employer={employer}
                        jobs={jobData?.getJobs}
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
                controlSize={30}
                slideSize={isLargeScreen ? '10%' : '25%'}
                loop
                align="start"
                withIndicators
                styles={{ indicators: { position: 'relative', top: 10, marginBottom: 20 }, controls: { position: 'absolute' } }}
                slidesToScroll={2}
            >
                {employers}
            </Carousel>
        </div>
    </div>
  )
}
