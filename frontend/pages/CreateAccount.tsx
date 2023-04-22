import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import styles from '../styles/components/CreateAccount.module.css'
import { Checkbox, MultiSelect } from '@mantine/core';
import { CREATE_SCHOLAR, CREATE_VIEW } from '../graphql/mutations/scholarMutations';
import { useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { randomUUID } from 'crypto';


type UserInfo = {
  name: string,
  email: string,
  year: number,
  school: string,
  major: string,
  status : 'current' | 'alumni',
  notifications: boolean,
}

export default function CreateAccount() {
  const { data: session } = useSession({ required: true })
  const [userInfo, setUserInfo] = useState({} as UserInfo)
  const [checked, setChecked] = useState(false)
  const [createScholar, { data: scholarData, loading: sendingData, error}] = useMutation(CREATE_SCHOLAR)
  const [completed, setCompleted] = useState(null as boolean | null)
  const [viewInfo, setViewInfo] = useState([] as any)
  const [createView] = useMutation(CREATE_VIEW)
  const router = useRouter()

  const handleSubmit = () => {
      createScholar({
        variables: {
          name: userInfo.name,
          email: session?.user?.email,
          year: Number(userInfo.year),
          school: userInfo.school,
          major: userInfo.major,
          status: 'current',
          notifications: checked,
      }}).then((resp) => {
          if (!sendingData && !error) {
            createView({
              variables: { 
                viewId: (Math.round(Math.random() * 10000000)).toString(10),
                scholarId: resp.data?.createScholar?.scholar_id,
                viewName: 'Default', 
                criteria: formatViewInfo(viewInfo)
              }
            }).then((resp) => {
              if (resp.data?.createView) {
                router.push('/Scholar')
              }
            })
          }
        }
      )
  }

  useEffect(() => {
    if (completed) {
      handleSubmit();
    }
  }, [completed])

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
        <h1>Create an Account!</h1>
        <InputElement label="Name" userInfo={userInfo} setUserInfo={setUserInfo} />
        <InputElement label="Year" userInfo={userInfo} setUserInfo={setUserInfo} />
        {/* @todo: implement dropdown to allow scholars to choose schools & majors */}
        <InputElement label="School" userInfo={userInfo} setUserInfo={setUserInfo} />
        <InputElement label="Major" userInfo={userInfo} setUserInfo={setUserInfo} />
        <div className={styles.createView}>
          <p>Enter up to 5 keywords (e.g. Toronto, Software, etc.)</p>
          <MultiSelect
            data={viewInfo}
            maxSelectedValues={5}
            placeholder="Select keywords"
            creatable
            searchable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setViewInfo([...viewInfo, item]);
              return item;
            }}
          />
        </div>
        <OnyxCheckbox checked={checked} setChecked={setChecked} />
        {
          completed === true || completed === null ? 
            null : <p className={styles.notComplete}>Please fill out all fields</p>
        }
        <button 
          className={styles.submitButton}
          onClick={() => {
            // 1. Check all fields are filled
            checkCompletion(userInfo, setCompleted);
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  )
}

type InputElementProps = {
  label: string;
  userInfo: UserInfo | {};
  setUserInfo: any;
}
export const InputElement = ({ label, userInfo, setUserInfo }: InputElementProps) => {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setUserInfo({ ...userInfo, [label.toLowerCase()]: inputValue } as UserInfo)
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

const OnyxCheckbox = ({ checked, setChecked }: any) => {
  return (
    <div className={styles.checkBox}>
      <Checkbox 
        color="dark"
        size='lg'
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <p>Turn on notifications for new jobs</p>
    </div>
  )
}

const checkCompletion = async (userInfo: UserInfo, setCompleted: any) => {
  if (userInfo.name && userInfo.year && userInfo.school && userInfo.major) {
    setCompleted(true)
  } else {
    setCompleted(false)
  }
}

const formatViewInfo = (viewInfo: any) => {
  let formattedViewInfo: string[] = []
    viewInfo.forEach((item: any) => {
        formattedViewInfo.push(Capitalize(item.value))
    })
  if (formattedViewInfo.length === 0) {
    formattedViewInfo = ['Toronto'];
  }
  return formattedViewInfo;
}

export const Capitalize = (str: string) => {
  // Capitalize the first letter of each word separated by a space
  str = str.toLowerCase().split(' ').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
  return str;
}