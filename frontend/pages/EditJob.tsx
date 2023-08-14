import React, {useState, useCallback} from 'react'
import BackButton from '../src/components/admin/BackButton'
import Image from 'next/image'
import { useQuery, useMutation } from '@apollo/client';
import styles from '../styles/components/EditJob.module.css';
import {GET_JOBS, GET_JOB_BY_ID} from "../graphql/queries/jobQueries";
import {EDIT_JOB} from "../graphql/mutations/jobMutations";
import { Job } from '../../backend/src/types/db.types';
import { getLogo } from '../src/utils/microservices';
import loading_svg from "../src/assets/loading.svg";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, TextInput, Textarea } from '@mantine/core';
import { GET_EMPLOYERS } from '../graphql/queries/employerQueries';
import {NativeSelect} from '@mantine/core'
import { Employer } from '../../backend/src/types/db.types';
import { DatePicker } from '@mantine/dates';
import { format } from 'path';


interface Props {}

function EditJob(props: Props) {
    const {data:jobsData, loading: jobsLoading, error: jobLoadingError} = useQuery(GET_JOBS)
    const refetchQueries = [{ query: GET_JOBS }];
    const { data: employerData, loading: employerLoading } = useQuery(GET_EMPLOYERS)
    const [selectedEmployerId, setSelectedEmployerId] = useState('')
    const handleEmployerFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEmployerId(event.target.value);
      };
    
    const filteredJobsData = selectedEmployerId
    ? jobsData.getJobs.filter((job: Job) => job.employer_id === selectedEmployerId)
    : jobsData?.getJobs;

    if (jobsLoading) {
        return (
          <div className={styles.loading}>
            <Image src={loading_svg} alt="Loading..." width={100} height={100}/>
            <h1>Loading...</h1>
          </div>
        )
      }

    return (
        <div> 
            <BackButton />
            <Image
              src="https://onyxinitiative.org/assets/img/onyxlogo_nav.png" 
              alt="Onyx Logo" 
              width={250} 
              height={100} 
          />
          <h1>Find an Job to Edit!</h1>
          <p>Filter by Employer:</p>
          <NativeSelect
                data={[
                  { label: 'Select an Employer', value: '' }, // Placeholder option
                  ...(employerData?.getEmployers?.map((employer: Employer) => ({
                      label: employer.name,
                      value: employer.employer_id,
                  })) || [])
              ]}
              value={selectedEmployerId || ''}
              onChange={handleEmployerFilterChange}
                
            />
          <div className={styles.jobContainer}>
          {jobsLoading ? (
            <p>Loading</p>
          ) : (
            // Step 6: Use the filteredJobsData instead of jobsData
            filteredJobsData?.map((job: Job) => (
              <EditJobCard job={job} key={job.job_id} refetchQueries={refetchQueries} />
            ))
          )}
        </div>


        </div>
        
    )
}

export default EditJob


export function EditJobCard(props: any) {
  const { job, refetchQueries } = props;
  const [EditJob, { data: jobData, loading: editLoading, error }] = useMutation(EDIT_JOB);
  const [isModalOpen, setModalOpen] = useState(false);
  const [jobEdited, setJobEdited] = useState(false);
  const formatDate = () => {
    const date = new Date(parseInt(job.deadline)).toDateString();
    return date // Adjust the format as needed
  };
  const [updatedData, setUpdatedData] = useState({
    title: job.title || "",
    description: job.description || "",
    long_description: job.long_description || "",
    requirements: job.requirements || "",
    experience: job.experience || "",
    education: job.education || null,
    term: job.term || "",
    how_to_apply: job.how_to_apply || null,
    additional_info: job.additional_info || null,
    categories: job.categories || null,
    contact_email: job.contact_email || null,
    job_type: job.job_type,
    location: job.location,
    applicant_year: job.applicant_year || [],
    deadline: formatDate() || "2100-01-01", // Convert to Date object
    tags: job.tags || [],
    live: job.live || false,
    link: job.link || null,
  });

  const handleEditJob = useCallback(async (updatedData: any, job: any) => {
    const applicantYearsArray = updatedData.applicant_year.map((year:string) => parseInt(year, 10));
    updatedData.applicant_year = applicantYearsArray;
    console.log(updatedData);
    try {
      await EditJob({
        variables: { jobId: job.job_id, fields: updatedData },
        refetchQueries: refetchQueries
      });

      setJobEdited(true);
      closeModal();
      alert(`Successfully edited job with ID ${job.job_id}!`);
    } catch (error) {
      console.log(error);
    }
  }, [job.job_id, updatedData]);

  const closeModal = () => {
    setModalOpen(false);
    setJobEdited(false);
  };

  const handleDeadlineChange = (date: Date) => {
    console.log(date)
    const formattedDate = date.toISOString().split('T')[0]; // Convert to "YYYY-MM-DD" format
    setUpdatedData({ ...updatedData, deadline: formattedDate });
  };
  



  return (
    <div>
      <div className={styles.jobCard}>
            <h4>{job.title}</h4>
            <p>Job ID: {job.job_id}</p>
            <p>Deadline: {formatDate()}</p>
            <p>Location: {job.location}</p>
            <p>Job Type: {job.job_type}</p>
        <button onClick={() => setModalOpen(true)}>Edit</button>
        <Modal
          styles={{
            body: {
              maxWidth: '600px',
              height: '700px', // Set the desired width here
              // Center the modal horizontally (optional)
            },
          }}
          opened={isModalOpen}
          onClose={closeModal}
          size="100%"
          title={'Edit Job - ' + job.title + ' (Job ID: ' + job.job_id + ')'}
        >
          {/* Render job editing fields here, similar to EditEmployerCard */}
          <TextInput
            label="Title"
            value={updatedData.title}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, title: event.currentTarget.value })
            }
          />
          <Textarea
          rows={10}
            label="Description"
            value={updatedData.description}
            minRows={5}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, description: event.currentTarget.value })
            }
          />
          <Textarea
          minRows={20}
            label="Long Description"
            value={updatedData.long_description}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, long_description: event.currentTarget.value })
            }
          />
          <Textarea
          minRows={10}
            label="Requirements"
            value={updatedData.requirements}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, requirements: event.currentTarget.value })
            }
          />
          <Textarea
            minRows={10}
            label="Experience"
            value={updatedData.experience}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, experience: event.currentTarget.value })
            }
          />
          <TextInput
            label="Education"
            value={updatedData.education}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, education: event.currentTarget.value })
            }
          />
          <TextInput
            label="Tags"
            value={updatedData.tags}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, tags: event.currentTarget.value })
            }
          />
          <TextInput
            label="Applicant year"
            value={updatedData.applicant_year.join(', ')}
            onChange={(event) =>
              setUpdatedData({
                ...updatedData,
                applicant_year: event.currentTarget.value.split(',').map((year) => year.trim())
              })
            }
          />
          <Textarea
            minRows={15}
            label="How to Apply"
            value={updatedData.how_to_apply}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, how_to_apply: event.currentTarget.value })
            }
          />
          <Textarea
            rows={10}
            label="Additional Info"
            value={updatedData.additional_info}
            minRows={5}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, additional_info: event.currentTarget.value })
            }
          />
          <TextInput
            label="Contact Email"
            value={updatedData.contact_email}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, contact_email: event.currentTarget.value })
            }
          />
          <TextInput
            label="Term"
            value={updatedData.term}
            onChange={(event) => setUpdatedData({ ...updatedData, term: event.currentTarget.value })}
          />
          <TextInput
            label="Location"
            value={updatedData.location}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, location: event.currentTarget.value })
            }
          />
          <p>Deadline</p>
          <DatePicker
            onChange={handleDeadlineChange}
            />
          <TextInput
            label="Link"
            value={updatedData.link}
            onChange={(event) => setUpdatedData({ ...updatedData, link: event.currentTarget.value })}
          />
          {/* Add more fields for other job attributes */}
          {/* ... */}

          <button className={styles.finishEditButton} onClick={() => handleEditJob(updatedData, job)}>
            Finish Editing
          </button>
        </Modal>
      </div>
    </div>
  );
}


