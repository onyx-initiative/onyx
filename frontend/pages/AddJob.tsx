import React, {useEffect, useState} from "react";
import styles from "../styles/components/AddJobForm.module.css";
import { Checkbox } from "@mantine/core";
import { CREATE_JOB } from "../graphql/mutations/jobMutations";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from 'next/image';
import {GET_EMPLOYER_BY_NAME, GET_EMPLOYERS} from "../../frontend/graphql/queries/employerQueries";
import {Select, MultiSelect, Button} from '@mantine/core';



type JobInfo = {
    employerId: string,
    adminId: string,
    title: string,
    description: string,
    longDescription: string
    requirements: string,
    experience: string,
    education: string,
    howToApply: string,
    additionalInfo: string | null,
    employerIndustries: string,
    jobFunction: string,
    contactEmail: string
    jobType: string,
    term: string,
    location: string,
    applicantYear: number[],
    deadline: string | null,
    tags: string[], 
    link: string,
}

export default function AddJob() {
    const [JobInfo, setJobInfo] = useState({
        deadline: "",
    } as JobInfo)
    const [checked, setChecked] = useState(false)
    const [createJob, {data: jobData, loading, error}] = useMutation(CREATE_JOB, {variables: {
        employerId: JobInfo.employerId,
        adminId:JobInfo.adminId,
        title:JobInfo.title,
        description: JobInfo.description,
        jobType: JobInfo.jobType,
        term: JobInfo.term,
        location: JobInfo.location,
        applicantYear: JobInfo.applicantYear,
        deadline: JobInfo.deadline !== "" ?  JobInfo.deadline : "2100-01-01",
        tags: JobInfo.tags,
        live: !checked,
        contactEmail: JobInfo.contactEmail,
        longDescription: JobInfo.longDescription,
        requirements: JobInfo.requirements,
        experience: JobInfo.experience,
        education: JobInfo.education,
        howToApply: JobInfo.howToApply,
        additionalInfo: JobInfo.additionalInfo ? JobInfo.additionalInfo : null,
        employerIndustries: JobInfo.employerIndustries,
        jobFunction: JobInfo.jobFunction,
        link: JobInfo.link
    }})
    const router = useRouter()
    const [completed, setCompleted] = useState(null as boolean | null)

    const handleSubmit = () => {
      console.log(JobInfo.deadline)
      createJob().catch((err) => alert("Error creating job. Please check that all fields were correctly filled out and try again."));
      router.push('/Admin')
  }

  const { data: employerData, loading: employerLoading, } = useQuery(GET_EMPLOYERS)

  const [empData, setEmpData] = useState([])



  useEffect(() => {
    if (completed) {
      // if (!JobInfo.deadline) {
      //   setJobInfo({...JobInfo, deadline: "2100-01-01"})
      // }
      console.log(JobInfo)
      var result = confirm("Are you sure you want to add this Job?");
        if (result == true) {
          handleSubmit();
    } else {
      console.log("Create Job Aborted")
    }}
  }, [completed])

  useEffect(() => {
    if (!employerLoading) {
      setEmpData(employerData?.getEmployers)
    }
    // Ignore, this is intentional
  }, [empData, employerLoading])

  const current_year= new Date().getFullYear()

  const [searchValue, onSearchChange] = useState('');
  const [applicationYearSearchValue, onSearchApplicationYear] = useState('');
  const [tagSearchValue, onSearchTag] = useState('');
  const [tagData, setTagData] = useState([{ value: 'Technology', label:  'Technology' },
    { value: 'Business ', label: 'Business' }, { value: 'Marketing', label:  'Marketing' }, { value: 'Engineering', label:  'Engineering' }, { value: 'Finance', label:  'Finance' }, { value: 'HR', label:  'HR' }, { value: 'IT', label:  'IT' }, { value: 'Research', label:  'Research' }, { value: 'Sales', label:  'Sales' }, { value: 'Security', label:  'Security' }, { value: 'Accounting', label:  'Accounting' }, { value: 'Administration', label:  'Administration' }, { value: 'Automotive', label:  'Automotive' }, { value: 'Arts&Entertainment', label:  'Arts&Entertainment' }, { value: 'Communication', label:  'Communication' }, { value: 'Design', label:  'Design' }, { value: 'Gaming', label:  'Gaming' }, { value: 'Healthcare', label:  'HealthCare' }, { value: 'Mathematics', label:  'Mathematics' }, { value: 'Telecommunications', label:  'Telecommunications'},{ value: 'Default', label:  'Default' }
    ])
  

    const {loading: employerIdLoading, data: employerId} = useQuery(GET_EMPLOYER_BY_NAME, {variables: {name: searchValue}})

  
    useEffect(() => {
      console.log(applicationYearSearchValue)
      if(!employerIdLoading && searchValue != "") {
        JobInfo.employerId = employerId.getEmployerByName.employer_id
        JobInfo.adminId = "1"
      }
    }, [searchValue, employerIdLoading])
    const [selected, setSelected] = useState([] as any[])




    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
              src="https://onyxinitiative.org/assets/img/onyxlogo_nav.png" 
              alt="Onyx Logo" 
              width={250} 
              height={100} 
          />
        </div>
        <div className={styles.formContainer}> 
          <h1> Create a Job!</h1>
          <InputElement label="title" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <Select
            className={styles.inputContainer}
            label="Employer Name"
            placeholder="Pick one"
            dropdownComponent="div"
            searchable
            clearable
            onSearchChange={onSearchChange}
            searchValue={searchValue}
            nothingFound="No options"
            data={formatEmpData(empData)}
          />
          <InputElement label="description" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElement label="jobType" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElement label="term" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElement label="location" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <MultiSelect
            className={styles.inputContainer}
            label="applicantYear"
            placeholder="Pick one"
            searchable
            clearable
            onSearchChange={onSearchApplicationYear}
            searchValue={applicationYearSearchValue}
            nothingFound="No options"
            dropdownPosition="bottom"
            data={[
              current_year.toString(),
              (current_year+1).toString(),
              (current_year+2).toString(),
              (current_year+3).toString(),
              (current_year+4).toString()
            ]}
            onChange={(query) => {
              let x: number[] = [];
              for (let i = 0; i < query.length; i++) {
                x.push(parseInt(query[i]))
              }
              console.log(x)
              setJobInfo(state => ({...state, applicantYear: x}))
            }}
          />
            <InputElement label="deadline" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <MultiSelect
            className={styles.inputContainer}
            label="tags"
            placeholder="Pick one"
            searchable
            clearable
            creatable
            onSearchChange={onSearchTag}
            getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
              const item = { value: query, label: query };
              setTagData((current) => [...current, item]);
              return item;
               }}
            searchValue={tagSearchValue}
            nothingFound="No options"
            data={tagData}
            onChange={(query) => {
              setJobInfo(state => ({...state, tags: query}))
            }}
          />
          <InputElement label="contactEmail" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElement label="link" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElementLong label="longDescription" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElementLong label="requirements" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElementLong label="experience" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElementLong label="education" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElementLong label="howToApply" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElementLong label="additionalInfo" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElement label="employerIndustries" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElement label="jobFunction" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <Checkbox
            label="Save to Drafts?"
            color="dark"
            size="md"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <Button color="dark" onClick={() => {
            // 1. Check all fields are filled
            console.log(checkCompletion(JobInfo, setCompleted));
          }}>
            Create Job
          </Button>
        </div>


      </div>
      
    )
  }
  

export type InputElementProps = {
  label: string;
  JobInfo: JobInfo | {};
  setJobInfo: any;
}

export const InputElementLong = ({label, JobInfo, setJobInfo}: InputElementProps) => {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setJobInfo({ ...JobInfo, [label]: inputValue } as JobInfo)
    // Ignore warning, this is intentional
  }, [inputValue])

  return (
    <div className={styles.inputContainerLarge}>
      <h3 className={styles.inputText}>{label}</h3>
      <textarea rows={5}
        className={styles.inputForm} 
        id={label} 
        placeholder={label}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></textarea>
    </div>
  )
}


export const InputElement = ({label, JobInfo, setJobInfo}: InputElementProps) => {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setJobInfo({ ...JobInfo, [label]: inputValue } as JobInfo)
    // Ignore warning, this is intentional
  }, [inputValue])

  return (
    <div className={styles.inputContainer}>
      <h3 className={styles.inputText}>{label}</h3>
      <input 
        className={styles.inputForm}
        type="text" 
        id={label} 
        placeholder={label}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </div>
  )
}

const formatEmpData = (empData: any[]) => {
  let formatted = [];
  for (let i = 0; i < empData.length; i++) {
    formatted.push(empData[i].name)
  }
  return formatted
}


const checkCompletion = async (jobInfo: JobInfo, setCompleted: any) => {

  console.log(jobInfo.applicantYear)
  if (jobInfo.title && jobInfo.description && jobInfo.jobType && jobInfo.location && jobInfo.applicantYear && jobInfo.tags) {
    setCompleted(true)
  } else {
    setCompleted(false)
  }
}


