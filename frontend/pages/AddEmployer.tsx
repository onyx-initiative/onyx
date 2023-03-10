import React, { useEffect, useState} from 'react';
import { Checkbox } from '@mantine/core';
import { CREATE_EMPLOYER } from '../graphql/mutations/employerMutations';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styles from "../styles/components/AddJobForm.module.css";
import Image from 'next/image';
import EmployerInfo from '../src/components/employer/EmployerInfo';
import { Employer } from "../../backend/src/types/db.types";
import {Button} from '@mantine/core'

type EmployerInfo = {
  employer_id: string,
    admin_id: string,
    name: string,
    contact_email: string,
    address: string,
    website: string,
    description: string,
}


export default function AddEmployer() {
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [completed, setCompleted] = useState(null as boolean | null);
  const [EmployerInfo, setEmployerInfo] = useState({} as EmployerInfo)

  const [createEmployer, {data: employerData, loading, error}] = useMutation(CREATE_EMPLOYER, {variables: {
    employer_id: EmployerInfo.employer_id,
    admin_id: EmployerInfo.admin_id,
    name: EmployerInfo.name,
    contact_email: EmployerInfo.contact_email,
    address: EmployerInfo.address,
    website: EmployerInfo.website,
    description: EmployerInfo.description
  }})



  const handleSubmit = () => {
    console.log(EmployerInfo)
    createEmployer();
    router.push('/Admin')
}

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
          <h1>Create an Employer!</h1>
          <InputElement label="Name" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <InputElement label="Contact Email" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <InputElement label="Address" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <InputElement label="Website" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <InputElement label="Description" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <Button color="dark" onClick={() => {
            // 1. Check all fields are filled
            console.log(EmployerInfo)
            checkCompletion(EmployerInfo, setCompleted);
          }}>
            Create Job
          </Button>

        </div>
  

  </div>
)

}

const checkCompletion = async (employerInfo: EmployerInfo, setCompleted: any) => {
  if (employerInfo.name && employerInfo.contact_email && employerInfo.address && employerInfo.website && employerInfo.description) {
    setCompleted(true)
  } else {
    setCompleted(false)
  }
}

export type InputElementProps = {
  label: string;
  EmployerInfo: EmployerInfo | {};
  setEmployerInfo: any;
}


export const InputElement = ({label, EmployerInfo, setEmployerInfo}: InputElementProps) => {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setEmployerInfo({ ...EmployerInfo, [label.toLowerCase()]: inputValue } as EmployerInfo)
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

