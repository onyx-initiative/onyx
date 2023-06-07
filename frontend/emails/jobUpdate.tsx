import * as React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Img } from '@react-email/img';
import { Hr } from '@react-email/hr';
import { Link } from '@react-email/link';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { Body } from '@react-email/body';
import { Job, job_type } from '../../backend/src/types/db.types';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import { Capitalize } from '../src/components/jobs/JobCard';
import { IoLocationSharp, IoTimeSharp, IoBagSharp } from "react-icons/io5";
import briefcase from './assets/*.png';
import clock from './assets/*.png';
import pin from './assets/*.png';


export type Recommendation = {
    scholar: string;
    email: string;
    scholar_id: string;
    view_name: string;
    employer: string;
    title: string;
    description: string;
    job_type: job_type;
    location: string;
    deadline: string;
}

type EmailInfo = {
    scholarName: string;
    jobs: Recommendation[];
    employers: any[];
}

export function Email({ scholarName, jobs, employers }: EmailInfo) {

    const previewText: string = 'Check out recently added jobs that match your filters!';

    const formatDate = (date: string) => {
        const formattedDate = new Date(parseInt(date)).toDateString() as string;
        return formattedDate;
    }

    const checkDeadline = (deadline: string) => {
        const check = new Date(deadline);
        const year = check.getFullYear();
        return year > 2090;
    }
  
    return (
      <Html lang="en">
        <Head />
        <Preview>{previewText}</Preview>
        <Body style={styles.main}>
            <Container>
                <Section style={styles.logo}>
                    <Img src={'https://onyxinitiative.org/assets/img/onyxlogo_nav.png'} alt="logo" width={250} />
                </Section>
                <Section style={styles.content}>
                    <Text style={styles.text}>Hi {scholarName},</Text>
                    <Text style={{ fontSize: 16 }}>{"Here are some jobs we think you'll like:"}</Text>
                    {jobs.map((recommendation: Recommendation, index: number) => (
                        <Section key={index}>
                            <Container style={styles.jobContainer}>
                                <Row>
                                <Column style={{ padding: '0px', width: '80px', verticalAlign: 'top' as const, }}>
                                    {/* <Img 
                                        src={fetchLogo(recommendation.employer)} 
                                        alt="logo" 
                                        width={80} 
                                        height={80}
                                        style={ styles.companyLogo }    
                                    /> */}
                                </Column>
                                <Column align='left' style={styles.jobInfo}>
                                    <Section style={{ margin: 0, padding: 0, alignContent: 'top' as const, alignItems: "top" as const }}>
                                        <Text style={styles.title}>{recommendation.title}</Text>
                                        <Row
                                            style={{  
                                                alignSelf: "left", 
                                                alignItems: "top", 
                                                alignContent: "top",
                                                padding: 0, 
                                                margin: 0,
                                                marginTop: -10
                                            }}
                                            align='left'
                                        >
                                            <Column align='left'>
                                            <Text style={{ fontWeight: "bold"}}>{recommendation.employer}</Text>
                                            </Column>
                                        </Row>
                                        <Row align='left' style={{ marginTop: -25, alignItems: "left",}}>
                                            <Column width={"20%"}>
                                            <Text>{recommendation.location}</Text>
                                            </Column>
                                            <Column width={"5%"}>
                                            <Text style={{ fontSize: 18}}>•</Text>
                                            </Column>
                                            <Column>
                                            <Text>{Capitalize(recommendation.job_type)}</Text>
                                            </Column>
                                            </Row>
                                        <Text
                                            style={{ padding: 0, margin: 0, fontSize: 16, marginTop: 0 }}
                                        >{recommendation.description}</Text>
                                    </Section>
                                </Column>
                                </Row>
                                <Row>
                                    <Hr style={{ borderColor: '#666', marginTop: 20}}/>
                                </Row>
                                <Row>
                                <Text
                                    style={{ padding: 0, margin: 0, fontSize: 14, color: '#666' }}
                                >
                                    <p>{checkDeadline(recommendation.deadline) ? "No Deadline" : 'Deadline: ' + formatDate(recommendation.deadline)}</p>
                                </Text>
                                </Row>
                            </Container>
                        </Section>
                    ))}
                    {/* @todo: Update this link with website URL */}
                    <Section style={styles.btnContainer}>
                        <Button style={styles.button} href="jobs.onyxinitiative.org">Explore All Jobs</Button>
                    </Section>
                    <Hr style={styles.hr} />
                    <div style={{ alignItems: 'center', margin: 0, padding: 0 }}>
                        <p style={styles.footer}>info@onyxinitiative.org</p>
                        <p style={styles.footer}>334 Lakeshore Road E #203, Oakville, ON L6J 1J6</p>
                    </div>
                    <div style={{ ...styles.footer, justifyContent: 'center', display: 'flex', alignItems: 'center', alignContent: 'center', margin: 0, padding: 0, alignSelf: "center", verticalAlign: "center" }}>
                            <a style={{ ...styles.footer, padding: 0, margin: 0, paddingLeft: 0, paddingRight: 10 }} href='https://www.linkedin.com/company/onyx-initiative/' target="_blank" rel="noreferrer">
                                <Text>LinkedIn</Text>
                            </a>
                            <p style={{ fontSize: 20 }}>|</p>
                            <a style={{ ...styles.footer, padding: 0, margin: 0, paddingLeft: 10, paddingRight: 10 }} href='https://twitter.com/onyxinitiative' target="_blank" rel="noreferrer">
                                <Text>Twitter</Text>
                            </a>
                            <p style={{ fontSize: 20 }}>|</p>
                            <a style={{ ...styles.footer, padding: 0, margin: 0, paddingLeft: 10, paddingRight: 10 }} href='https://www.instagram.com/onyxinitiative/' target="_blank" rel="noreferrer">
                                <Text>Instagram</Text>
                            </a>
                    </div>
                </Section>
            </Container>
        </Body>
      </Html>
    );
  }

const styles = {
    main: {
        fontFamily: 'Helvetica',
        margin: '0 auto',
        backgroundColor: 'black',
        color: 'white',
    },
    logo: {
        padding: '30px 20px',
    },
    content: {
        border: '1px solid gray',
        borderRadius: '3px',
        overflow: 'hidden',
        padding: '20px',
    },
    text: {
        fontWeight: 'bold',
        fontSize: '18px',
    },
    footer: {
        color: 'gray',
        fontSize: '12px',
        cursor: 'pointer',
    },
    btnContainer: {
        textAlign: 'center' as const,
        marginBottom: '20px',
        marginTop: '10px',
    },
    button: {
        backgroundColor: 'white',
        padding: '12px 30px',
        borderRadius: 3,
        color: 'black',
        fontWeight: 'bold',
        border: '1px solid rgb(0,0,0, 0.1)',
        cursor: 'pointer',
        textAlign: 'center' as const,
    },
    hr: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    companyLogo: {
        borderRadius: 3,
        marginRight: 10,
        paddingTop: 0,
        marginTop: 3
    },
    jobContainer: {
        border: '1px solid gray',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '3px',
        overflow: 'hidden',
        alignItems: 'top' as const,
        backgroundColor: '#fff',
        color: 'black',
        width: '100%',
    },
    jobInfo: {
        // textAlign: 'left' as const,
        width: '100%',
        alignContent: 'top' as const,
        verticalAlign: 'top' as const,
        alignItems: 'top' as const,
        margin: 0,
    },
    title: {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: 0,
        padding: 0,
    }
}

// Helper function to get logos dynamically
// @todo: try to update this to get higher quality logos
export const fetchLogo = (company: string) => {
    let websiteURL;
    if (company == 'Facebook') {
      websiteURL = 'www.facebook.com';
    } else if (company === '') {
      return 'https://onyxinitiative.org/assets/img/onyxlogo_nav.png';
    } else {
      websiteURL = "www." + company.toLowerCase().replace(/ /g, "-") + ".com";
    }
    return `https://logo.clearbit.com/${websiteURL}`;
  }
