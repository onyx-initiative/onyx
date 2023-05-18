import React, { useState, useEffect, useMemo } from 'react'
import { Select, Pagination, Slider, RangeSlider, Drawer } from '@mantine/core';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { IoLocationSharp } from "react-icons/io5";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_EMPLOYER_BY_ID } from '../../../graphql/queries/employerQueries';
import { Job } from '../../../../backend/src/types/db.types';
import Image from 'next/image';
import styles from '../../../styles/components/Jobs.module.css'
import { BOOKMARK_JOB } from '../../../graphql/mutations/scholarMutations';
import { useSession } from 'next-auth/react';
import { CHECK_BOOKMARK } from '../../../graphql/queries/scholarQueries';
import va from '@vercel/analytics';
import { getLogo, unsupportedCompanies } from '../../utils/microservices';

const JobCard = (props: any) => {
    const { job, email } = props;
    const [bookmarked, setBookmarked] = useState(false);
    const [opened, setOpened] = useState(false);
    const [logo, setLogo] = useState('');
    const { data, loading } = useQuery(GET_EMPLOYER_BY_ID, {
      variables: { 
        employerId: job.employer_id
      }
    });
    // console.log(job)
  
    // @todo: Add a call to get the employer website
    let website: string;
    if (job.name) {
      website = websiteURL(job.name)
    } else {
      if (loading) {
        website = 'www.onyxinitiative.org/'
      } else {
        website = data?.getEmployerById.website;
      }
    }

    useEffect(() => {
      setLogo('https://logo.clearbit.com/www.onyxinitiative.org/');
      if (!loading) {
          if (data?.getEmployerById?.name in unsupportedCompanies) {
              const newLogo = unsupportedCompanies[data?.getEmployerById?.name as keyof typeof unsupportedCompanies]
              setLogo(newLogo)
          } else {
              getLogo(data?.getEmployerById?.name).then(logo => {
                  setLogo(logo.logo)
              });
          }
      }
    }, [loading]);

    const date = new Date(parseInt(job.deadline)).toDateString();
  
    return (
      <div key={job.job_id} className={styles.mainContainer}>
      <div className={styles.jobCard}>
        <div>
          <div className={styles.jobCardHeader}>
            <div className={styles.jobCardImage}>
              <Image 
                onClick={() => setOpened(!opened)}
                src={logo}
                alt="Company Logo"
                width={60}
                height={60}
                objectFit='cover'
                priority
                quality={100}
              />
            </div>
            <div className={styles.jobHeader}
              onClick={() => setOpened(!opened)}
            >
              <h3>{job.title}</h3>
              <div className={styles.additionalInfo}>
                <IoLocationSharp size={16} color='gray' />
                <h6>{job.location} • {Capitalize(job.job_type)}</h6>
              </div>
            </div>
          </div>
          
          <div className={styles.jobCardBody}
            onClick={() => setOpened(!opened)}
          >
            <h4>{'Targetted Years: ' + formatYears(job.applicant_year)}</h4>
            <p>{job.description}</p>
          </div>
          <div className={styles.jobTags}>
            {job.tags.map((tag: string, index:number) => <Tag key={tag} tag={tag}/>)}
          </div>
          <p className={styles.deadline}>{'Deadline: ' + date}</p>
        </div>
        <Bookmarked bookmarked={bookmarked} setBookmarked={setBookmarked} job_id={job.job_id} />
      </div>
      
      {/* @todo: add other necessary info */}
      { email ? null : 
      <Drawer
          opened={opened}
          onClose={() => setOpened(!opened)}
          padding="xl"
          size="60%"
          position='right'
        >
          <div className={styles.jobCardHeaderDrawer}>
            <Image 
              src={logo}
              alt="Company Logo"
              width={60}
              height={60}
            />
            <div className={styles.jobHeaderDrawer}>
              <h3>{job.title}</h3>
              <div className={styles.additionalInfo}> 
                <IoLocationSharp size={16} color='gray' />
                <h6>{job.location} • {Capitalize(job.job_type)}</h6>
              </div>
            </div>
          </div>
          <h4>Job Description:</h4>
            <p>{job.long_description}</p>
            <p>{"Term: " + job.term}</p>
          {job.contact_email ? <h4>{"Contact: " + job.contact_email}</h4> : null}
          <ApplyButton link={job.link} />
        </Drawer>
      }
      </div>
    )
  }
  
  // @todo: Add logic so if there's more than x #, it renders +total - x more
  const Tag = (props: { tag: any; }) => {
    const tag = props.tag;
    return (
      <div className={styles.tag}>
        {tag}
      </div>
    )
  }
  
  const Bookmarked = (props: any) => {
    const { bookmarked, setBookmarked, job_id } = props;
    const { data: session, status } = useSession({ required: true })
    const [bookmarkJob, { data, loading }] = useMutation(BOOKMARK_JOB)
    const { data: bookmark, loading: bookmarkLoading, refetch } = useQuery(CHECK_BOOKMARK, {
      variables: { email: session?.user?.email, jobId: job_id }
    });

    useEffect(() => {
      if (!bookmarkLoading) {
        setBookmarked(bookmark?.checkBookmark);
      }
    }, [bookmark, bookmarkLoading])

    return (
      <button 
        className={styles.bookmarkContainer}
        onClick={() => {
          // @todo: This should create a relation in the favourites table of the db
          bookmarkJob({
            variables: { email: session?.user?.email, jobId: job_id }
          })
          refetch({ email: session?.user?.email, jobId: job_id })
          setBookmarked(!bookmarked)
        }}
      >
        {bookmarked ? <FaBookmark size={24} color='#806E53' /> : <FaRegBookmark size={24} color='gray' />}
      </button>
    )
  }

  //@todo: Pull logos programmatically
export const websiteURL = (company: string) => {
    // Temp fix
    if (company === 'Facebook') {
      return 'www.facebook.com';
    } else if (company) {
      return "www." + company.toLowerCase().replace(/ /g, "-") + ".com";
    }
    return 'www.onyxinitiative.org/';
}
  
  // Helper function to get logos dynamically
  // @todo: try to update this to get higher quality logos
export const fetchLogo = (websiteURL: string) => {
  return `https://logo.clearbit.com/${websiteURL}`;
}

const formatYears = (years: number[]) => {
  let formattedYears: string = '';
  for (let i = 0; i < years.length; i++) {
    if (i === years.length - 1) {
      formattedYears += years[i].toString();
    } else {
      formattedYears += years[i].toString() + ', ';
    }
  }
  return formattedYears;
}

export const Capitalize = (str: string) => {
  // Capitalize each word in the string separated by a space
  const sub = str.split(' ');
  let capitalized = '';
  for (let i = 0; i < sub.length; i++) {
    capitalized += sub[i].charAt(0).toUpperCase() + sub[i].slice(1) + ' ';
  }
  return capitalized;
}

const ApplyButton = (props: any) => {

  const { link } = props;

  return (
      <div style={{ display: 'flex', alignItems: 'center'}}>
            <h4>{"Apply here:"}</h4>
            <button 
              style={{ backgroundColor: 'white', border: 'none'}}
              onClick={() => {
                va.track("Apply", { link: link });
                window.open(link, '_blank');
              }}
            >
              <a href={link} style={{ color: '#806E53', fontWeight: 'bold', fontSize: '1rem'}}>{link}</a>
            </button>
          </div>
  )
}

export default JobCard;