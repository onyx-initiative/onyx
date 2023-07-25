import React from 'react'
import BackButton from '../src/components/admin/BackButton'
import Image from 'next/image'
import styles from '../../frontend/styles/components/EditEmployer.module.css';
import { useQuery } from '@apollo/client';
import {GET_EMPLOYERS, GET_EMPLOYER_BY_ID} from "../graphql/queries/employerQueries"
import {EDIT_EMPLOYER} from "../graphql/mutations/employerMutations"
import react, { useState, useEffect, useCallback } from 'react'
import { Employer } from '../../backend/src/types/db.types';
import { useMutation } from '@apollo/client';
import { getLogo } from '../src/utils/microservices';
import loading_svg from "../../frontend/src/assets/loading.svg";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, TextInput, Textarea } from '@mantine/core';

    

interface Props {}

export default function EditEmployer(props: Props) {
    const {data:employersData, loading: employersLoading, error: employerLoadingError} = useQuery(GET_EMPLOYERS)

    const refetchQueries = [{ query: GET_EMPLOYERS }];

    const [search, setSearch] = useState('')
    const [employers, setEmployers] = useState([])

    useEffect(() => {
      if (!employersLoading) {
          setEmployers(employersData?.getEmployers)
        }
      }
      // Ignore, this is intentional
     ,[employersData, employersLoading])

     
    // For if the page is loading 
    if (employersLoading) {
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
            <h1>Find an Employer to Edit!</h1>
            <div >
                <div className={styles.employerContainer}>
                {employersLoading ? <p>loading</p> : employers.map((employer: Employer, index:any) => <EditEmployerCard  employer={employer} key={index} refetchQueries={refetchQueries} />
                )}
                </div>
            </div>
        </div>
    )
}

export function EditEmployerCard(props: any) {
    const {employer, refetchQueries } = props
    const [EditEmployer, {data: employerData, loading: editLoading, error}] = useMutation(EDIT_EMPLOYER)
    const [isModalOpen, setModalOpen] = useState(false);

    const [opened, { close, open }] = useDisclosure(false);


  const [employerEdited, setEmployerEdited] = useState(false);


  const [updatedData, setUpdatedData] = useState({
    name: employer.name || "", // Initialize with empty string if employer.name is null or undefined
    contact_email: employer.contact_email || "",
    address: employer.address || "",
    website: employer.website || "",
    description: employer.description || "",
    student_new_grad_link: employer.student_new_grad_link || "",
  });

  const handleEditEmployer = useCallback(async (updatedData: any, employer: any) => {
    try {
      // Create an array to store all the mutation promises
      const mutationPromises = [];

      // Loop through the keys in updatedData and create mutation promises for each field
      for (const field in updatedData) {
        const value = updatedData[field];
        const promise = EditEmployer({
          variables: { employerId: employer.employer_id, field: field, value: value },
        });
        mutationPromises.push(promise);
      }

      // Wait for all mutations to complete using Promise.all
      await Promise.all(mutationPromises);

      // If all mutations are successful, set employerEdited to true
      setEmployerEdited(true);
      closeModal();
      alert(`Successfully edited ${employer.name}!`);
    } catch (error) {
      console.log(error);
    }
  }, [employer.employer_id, updatedData]);

  // Function to close the modal and reset employerEdited state
  const closeModal = () => {
    setModalOpen(false);
    setEmployerEdited(false);
  };

  
    return (
        <div>
            <div className={styles.employerCard}>   
                <Image layout="fixed" width={50} height={50} src={employer.logo_url ? employer.logo_url : getLogo(employer.name)} alt='employer logo' loader={({ src }) => src }/>
                <h4>{employer.name}</h4>
                <button onClick={() => setModalOpen(true)}>Edit</button>
                <Modal styles={{body: {
                maxWidth: '600px',
                height: '700px' // Set the desired width here
                 // Center the modal horizontally (optional)
          },
        }}opened={isModalOpen} onClose={closeModal} size="100%" title={'Edit ' + employer.name}>
                    <p>Employer Name: {employer.name}</p>
                    <p>Employer ID: {employer.employer_id}</p>
                    <TextInput
            label="Name"
            value={updatedData.name}
            onChange={(event) => setUpdatedData({ ...updatedData, name: event.currentTarget.value })}
          />
          <TextInput
            label="Contact Email"
            value={updatedData.contact_email}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, contact_email: event.currentTarget.value })
            }
          />
          <TextInput
            label="Address"
            value={updatedData.address}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, address: event.currentTarget.value })
            }
          />
          <TextInput
            label="Website"
            value={updatedData.website}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, website: event.currentTarget.value })
            }
          />
          <Textarea
            label="Description"
            value={updatedData.description}
            minRows={10}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, description: event.currentTarget.value })
            }
          />
          <TextInput
            style={{width: "100%"}}
            label="Student New Grad Link"
            value={updatedData.student_new_grad_link}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, student_new_grad_link: event.currentTarget.value })
            }
          />
            <button className={styles.finishEditButton} onClick={() => handleEditEmployer(updatedData, employer)}>Finish Editing</button>


        </Modal>
            </div>
        </div>
    )
}

