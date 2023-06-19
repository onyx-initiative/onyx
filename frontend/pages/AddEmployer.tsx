import React, { useEffect, useState} from 'react';
import { CREATE_EMPLOYER } from '../graphql/mutations/employerMutations';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styles from "../styles/components/AddJobForm.module.css";
import Image from 'next/image';
import EmployerInfo from '../src/components/employer/EmployerInfo';
import { Employer } from "../../backend/src/types/db.types";
import {Button} from '@mantine/core'
import { loadavg } from 'os';
import { getLogo } from '../src/utils/microservices';
import BackButton from '../src/components/admin/BackButton';

type EmployerInfo = {
  employer_id: string,
  admin_id: string,
  name: string,
  contact: string,
  address: string,
  website: string,
  description: string,
}


export default function AddEmployer() {
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [completed, setCompleted] = useState(null as boolean | null);
  const [EmployerInfo, setEmployerInfo] = useState({} as EmployerInfo)
  const [logo, setLogo] = useState('' as string)

  const [createEmployer, {data: employerData, loading, error}] = useMutation(CREATE_EMPLOYER, {variables: {
    adminId: "1",
    name: EmployerInfo.name,
    contactEmail: EmployerInfo.contact,
    address: EmployerInfo.address,
    website: EmployerInfo.website,
    description: EmployerInfo.description,
  }})

  // useEffect(() => {
  //   if(!loading) {
  //     EmployerInfo.admin_id = "1"
  //   }
  // }, [loading])

  console.log(EmployerInfo)


  useEffect(() => {
    if (completed) {
      var result = confirm("Are you sure you want to add this Employer?");
        if (result == true) {
          handleSubmit();
        }
    }else {
      console.log("Create Employer")
      
    }}
  , [completed])

  const handleSubmit = () => {
    console.log(EmployerInfo)
    createEmployer().catch((err) => {
      alert("Error creating Employer. Please check that you entered the information correctly and try again.")
      console.log(err)
    });
    router.push('/Admin')
}

return (
    <div className={styles.container}>
        <div className={styles.logo}>
          <BackButton />
          <Image
              src="https://onyxinitiative.org/assets/img/onyxlogo_nav.png" 
              alt="Onyx Logo" 
              width={250} 
              height={100} 
              style={{
              }}
          />
        </div>
        <div className={styles.formContainer}>
          <h1>Create an Employer!</h1>
          <InputElement label="Name" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <InputElement label="Contact" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <InputElement label="Address" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <InputElement label="Website" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <InputElementLong label="Description" EmployerInfo={EmployerInfo} setEmployerInfo={setEmployerInfo} />
          <Button color="dark" onClick={() => {
            // 1. Check all fields are filled
            console.log(EmployerInfo)
            checkCompletion(EmployerInfo, setCompleted);
          }}>
            Create Employer
          </Button>

        </div>
  

  </div>
)

}

const checkCompletion = async (employerInfo: EmployerInfo, setCompleted: any) => {
  console.log(employerInfo.contact)
  console.log(employerInfo.address)
  console.log(employerInfo.description)
  console.log(employerInfo.website)
  console.log(employerInfo.name)

  if (employerInfo.name && employerInfo.contact && employerInfo.address && employerInfo.website && employerInfo.description) {
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

export const InputElementLong = ({label, EmployerInfo, setEmployerInfo}: InputElementProps) => {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setEmployerInfo({ ...EmployerInfo, [label.toLowerCase()]: inputValue } as EmployerInfo)
    // Ignore warning, this is intentional
  }, [inputValue])

  return (
    <div className={styles.inputContainerLarge}>
      <h3 className={styles.inputText}>{label}</h3>
      <textarea
        rows={20} 
        cols={50}
        id={label} 
        placeholder={label}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }} ></textarea>
        
    </div>
  )
}


