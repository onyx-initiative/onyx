import React from 'react'
import { Carousel } from '@mantine/carousel';
import { createStyles, Paper, Text, Title, Button, useMantineTheme } from '@mantine/core';
import styles from '../../../styles/components/ScholarHero.module.css'
import Image from 'next/image';

export default function ScholarHero() {

    const employers = sampleData.map(
        (employer) => {
            return (
                <Carousel.Slide key={employer.companyName}>
                    <Card 
                        logo={employer.logo} 
                        companyName={employer.companyName} 
                        location={employer.location} 
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
                slideSize="25%"
                loop
                withIndicators
                styles={{ indicators: { position: 'relative', top: 20, marginBottom: 20 } }}
            >
                {employers}
            </Carousel>
        </div>
    </div>
  )
}

type card = {
    logo: string;
    companyName: string;
    location: string;
}

const Card = ({logo, companyName, location}: card) => {
    return (
        <Paper
            className={styles.card}
        >
            <div>
                <Image 
                    src={logo} 
                    alt="Company Logo" 
                    width={150} 
                    height={100}
                />
                <h2>{companyName}</h2>
                <p>{location}</p>
            </div>
        </Paper>
    )
}

// Sample data for carousel
// Fetch this from backend
const sampleData = [
    {
        logo: 'https://1000logos.net/wp-content/uploads/2018/10/RBC-Logo-500x281.png',
        companyName: 'Royal Bank of Canada',
        location: 'Toronto, ON',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2021/05/Scotiabank-logo-500x281.png',
        companyName: 'Scotiabank',
        location: 'Toronto, ON',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png',
        companyName: 'Amazon',
        location: 'Toronto, ON',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png',
        companyName: 'Amazon',
        location: 'Toronto, ON',
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png',
        companyName: 'Amazon',
        location: 'Toronto, ON',
    }
]
