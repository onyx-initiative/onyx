import React, {useEffect, useState} from "react";
import styles from "../styles/components/AddJobForm.module.css";
import { Checkbox } from "@mantine/core";
import { CREATE_JOB } from "../graphql/mutations/jobMutations";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from 'next/image';
import {GET_EMPLOYER_BY_NAME, GET_EMPLOYERS} from "../../frontend/graphql/queries/employerQueries";
import {Select, MultiSelect, Button} from '@mantine/core';
import BackButton from "../src/components/admin/BackButton";
import { job_type, Job, Employer } from "../../backend/src/types/db.types";




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
        link: JobInfo.link
    }})
    const router = useRouter()
    const [completed, setCompleted] = useState(null as boolean | null)

  

  const handleSubmit = () => {
    if (
      !JobInfo.employerId ||
      !JobInfo.adminId ||
      !JobInfo.title ||
      !JobInfo.description ||
      !JobInfo.jobType ||
      !JobInfo.location ||
      !JobInfo.deadline
    ) {alert("Please fill out all required fields before submitting.");
      return;
    }
    createJob()
      .catch((err) => {
        console.error("Error creating job:", err); // Log the error message
        alert("Error creating job. Please check that all fields were correctly filled out and try again.");
      });
    router.push('/Admin');
  }

  const { data: employerData, loading: employerLoading, } = useQuery(GET_EMPLOYERS)

  const [empData, setEmpData] = useState([])

  useEffect(() => {
    if (completed) {
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
    const sortedTagData = tagData.slice().sort((a, b) => a.label.localeCompare(b.label));
  

    const {loading: employerIdLoading, data: employerId} = useQuery(GET_EMPLOYER_BY_NAME, {variables: {name: searchValue}})

    const initialJobTypes: job_type[] = ["Full Time", "Part Time", "Internship", "New Grad"];
    const [jobTypes, setJobTypes] = useState(initialJobTypes);

  
    useEffect(() => {
      console.log(applicationYearSearchValue)
      if(!employerIdLoading && searchValue != "") {
        JobInfo.employerId = employerId?.getEmployerByName?.employer_id
        JobInfo.adminId = "1"
      }
    }, [searchValue, employerIdLoading])

    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <BackButton />
          <Image src="https://onyxinitiative.org/assets/img/onyxlogo_nav.png" alt="Onyx Logo" width={250} height={100} />
        </div>
        <div className={styles.formContainer}> 
          <h1> Create a Job!</h1>
          <InputElement label="title" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <Select className={styles.inputContainer} label="Employer Name" placeholder="Pick one" dropdownComponent="div" searchable clearable onSearchChange={onSearchChange} searchValue={searchValue} nothingFound="No options" data={formatEmpData(empData)}/>
          <InputElement label="location" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <MultiSelect className={styles.inputContainer} label="applicantYear" placeholder="Pick one" searchable clearable onSearchChange={onSearchApplicationYear} searchValue={applicationYearSearchValue} nothingFound="No options" dropdownPosition="bottom" data={[
              (current_year-3).toString(),
              (current_year-2).toString(),
              (current_year-1).toString(),
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
          <InputElement label="description" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElementLong label="longDescription" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElementLong label="requirements" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElement label="contactEmail" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElement label="link" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <InputElementLong label="howToApply" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <Select className={styles.inputContainer} label="jobType" placeholder="Pick one" searchable clearable creatable data={jobTypes} nothingFound="No options" onChange={(query: any) => setJobInfo(state => ({...state, jobType: query}))}/>
          <InputElement label="term" JobInfo={JobInfo} setJobInfo={setJobInfo} />
          <MultiSelect className={styles.inputContainer} label="tags" placeholder="Pick one" searchable clearable creatable onSearchChange={onSearchTag} getCreateLabel={(query) => `+ Create ${query}`} onCreate={(query) => { const item = { value: query, label: query }; setTagData((current) => [...current, item]); return item; }} searchValue={tagSearchValue} nothingFound="No options" data={sortedTagData} onChange={(query) => setJobInfo(state => ({...state, tags: query}))} />
          <Checkbox label="Save to Drafts?" color="dark" size="md" checked={checked} onChange={() => setChecked(!checked)}/>
          <Button color="dark" onClick={() => {console.log(checkCompletion(JobInfo, setCompleted));}}>Create Job</Button>
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

const formatEmpData = (empData: Employer[]): string[] => {
  const formatted = empData
    .map((employer) => employer.name)
    .sort((a, b) => a.localeCompare(b));

  return formatted;
};

const validateJobInfo = (jobInfo: JobInfo) => {
  const errors = [];
  if (!jobInfo.title) {
    errors.push("Title is required.");
  }
  if (!jobInfo.description) {
    errors.push("Description is required.");
  }
  if (!jobInfo.jobType) {
    errors.push("Job type is required.");
  }
  if (!jobInfo.location) {
    errors.push("Location is required.");
  }
  if (!jobInfo.longDescription) {
    errors.push("Long description is required.");
  }
  const deadlineRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (jobInfo.deadline !== "" && jobInfo.deadline != null && !deadlineRegex.test(jobInfo.deadline)) {
    errors.push("Deadline format should be YYYY-MM-DD");
  }
  return errors;
};

const checkCompletion = async (jobInfo: JobInfo, setCompleted: any) => {
  const errors = validateJobInfo(jobInfo);

  if (errors.length === 0) {
    setCompleted(true);
  } else {
    setCompleted(false);
    alert("Please fix the following issues:\n" + errors.join("\n"));
  }
};


