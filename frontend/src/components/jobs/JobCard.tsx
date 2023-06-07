import React, { useState, useEffect } from 'react'
import { Drawer, ScrollArea } from '@mantine/core';
import { IoLocationSharp, IoTimeSharp, IoBagSharp } from "react-icons/io5";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import styles from '../../../styles/components/Jobs.module.css'
import { BOOKMARK_JOB } from '../../../graphql/mutations/scholarMutations';
import { useSession } from 'next-auth/react';
import { CHECK_BOOKMARK } from '../../../graphql/queries/scholarQueries';
import va from '@vercel/analytics';

const JobCard = (props: any) => {
    const { job, email, employerData } = props;
    const [bookmarked, setBookmarked] = useState(false);
    const [opened, setOpened] = useState(false);
    const [logo, setLogo] = useState('https://logo.clearbit.com/www.onyxinitiative.org/');
    const [employerName, setEmployerName] = useState('');

    const date = new Date(parseInt(job.deadline)).toDateString();
    const check = new Date(parseInt(job.deadline)).getFullYear();

    useEffect(() => {
      if (employerData) {
        setLogo(employerData?.getEmployers?.find((employer: any) => employer.employer_id === job.employer_id).logo_url);
        setEmployerName(employerData?.getEmployers?.find((employer: any) => employer.employer_id === job.employer_id).name);
        // console.log(formatText(job.requirements));
        console.log(filterNewlines(job.long_description))
      }
    }, [employerData, job.employer_id])
  
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
                loader={({ src }) => src }
                unoptimized
              />
            </div>
            <div className={styles.jobHeader}
              onClick={() => setOpened(!opened)}
              style={{ marginLeft: '0.4rem'}}
            >
              <h3 style={{ padding: 0, margin: 0, marginBottom: "0.4rem"}}>{job.title}</h3>
              <div className={styles.additionalInfo}>
                <IoBagSharp size={16} color='rgb(54, 54, 54)' />
                <h5>{employerName} • </h5>
                <div></div>
                <IoLocationSharp size={16} color='rgb(54, 54, 54)' />
                <h5>{job.location} • </h5>
                <div></div>
                <IoTimeSharp size={16} color='rgb(54, 54, 54)' />
                <h5>{Capitalize(job.job_type)}</h5>
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
          <p className={styles.deadline}>{check > 2090 ? "No Deadline" : 'Deadline: ' + date}</p>
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
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <div className={styles.jobCardHeaderDrawer}>
            <Image 
              src={logo}
              alt="Company Logo"
              width={60}
              height={60}
              loader={({ src }) => src }
              unoptimized
            />
            <div className={styles.jobHeaderDrawer}>
              <h3>{job.title}</h3>
              <div className={styles.additionalInfo} style={{ marginTop: "-16px"}}> 
                <IoBagSharp size={16} color='rgb(54, 54, 54)' />
                <h5>{employerName} • </h5>
                <div></div>
                <IoLocationSharp size={16} color='rgb(54, 54, 54)' />
                <h5>{job.location} • </h5>
                <div></div>
                <IoTimeSharp size={16} color='rgb(54, 54, 54)' />
                <h5>{Capitalize(job.job_type)}</h5>
              </div>
            </div>
          </div>
          <div className={styles.jobTags}>
            {job.tags.map((tag: string, index: number) => <Tag key={tag} tag={tag}/>)}
          </div>
          <div className={styles.jobCardBodyDrawer}>
            <div>
              <ApplyButton link={job.link} />
            </div>
          <div>
            <h4>Job Description</h4>
            <p>{filterNewlines(job.long_description)}</p>
            <p>{"Job Function: " + job.job_function}</p>
            <h4>Requirements</h4> 
              <JobListElement textItems={job.requirements}/>
            <h4>Experience</h4>
            <p>{job.experience}</p>
            <h4>Education</h4>
            <JobListElement textItems={job.education}/>
          </div>
          <div style={{ display: "flex" }}>
              <p style={{ fontWeight: "bold", marginRight: "0.3rem" }}>Term: </p>
              <p>{job.term}</p>
          </div>
          {job.contact_email ? <h4>{"Contact: " + job.contact_email}</h4> : null}
          {job.additional_info ?  
            <div> 
              <h5>Additional Information</h5>
              <p>{job.additional_info}</p>
            </div>
            : null}
          <div style={{ display: "flex" }}>
              <p className={styles.deadline}>{check > 2090 ? "No Deadline" : 'Deadline: ' + date}</p>
          </div>
          </div>
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
    }, [bookmark, bookmarkLoading, setBookmarked])

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

  let regex = /^https:\/\//;

  return (
      <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: '#806E53', 
          marginTop: 10, 
          paddingRight: 30, 
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 30,
          borderRadius: 5,
          width: 'fit-content',
      }}>
            <button 
              style={{ border: 'none', backgroundColor: 'transparent', padding: 0, margin: 0}}
            >
              <a 
                href={regex.test(link) ? link : "https://" + link} 
                style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem'}} 
                target='_blank' 
                rel="noreferrer"
                onClick={() => {
                  va.track("Apply", { link: link });
                }}
              >
                Apply
              </a>
            </button>
          </div>
  )
}

const formatText = (text: string) => {
  if (!text) return "";
  if (text[0] === '-' || text[0] === '•') {
    const result = text.split('- ');
    // Trim whitespaces
    let final = result.map(str => str.trim());
    // Remove empty strings
    final = final.filter(str => str !== "");
    return final;
  } else {
    return text;
  }
}

const filterNewlines = (text: string) => {
  if (!text) return "";
  const result = text.split('\\n').map((str: string, indx: number) => <p key={indx}>{str}</p>);
  return result;
}

const JobListElement = (props: any) => {
  const { textItems } = props;
  const formatted = formatText(textItems);
  const listItems = Array.isArray(formatted) ? formatted.map((str: string, index: number) => <li key={index}>{str}</li>) : <li>{formatted}</li>;
  return (
    <div>
      <ul>
        {listItems}
      </ul>
    </div>
  )
}

export default JobCard;