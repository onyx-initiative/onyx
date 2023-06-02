import React, { useEffect, useState } from "react";
import Navbar from "../general/Navbar";
import styles from "../../../styles/components/AdminPageButtons.module.css";
import Link from "next/link";
import { Modal, Select } from "@mantine/core";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EMPLOYERS } from "../../../graphql/queries/employerQueries";
import Image from "next/image";
import { UPDATE_LOGO } from "../../../graphql/mutations/employerMutations";


export default function UpdateLogo() {
    const [opened, setOpened] = useState(false);
    const [employer, setEmployer] = useState("");
    const [currentLogo, setCurrentLogo] = useState(null);
    const [newLogo, setNewLogo] = useState('');
    const { data: employerData, loading: employerLoading, refetch } = useQuery(GET_EMPLOYERS)
    const [changeLogo] = useMutation(UPDATE_LOGO)

    // const placeholderLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYpJCiKL_A8LEhJKESc21tuaaOpxxMZ2mQntkd44Us6g&s"
    const placeholderLogo = "data:image/png;base64,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"

    return (
        <div>
            <button 
                className={styles.button}
                onClick={() => setOpened(true)}
                style={{
                    height: "2rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #ced4da",
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1rem",
                }}
            >
                Edit Employer Images
            </button>
            <Modal
                opened={opened}
                onClose={() => {
                    setOpened(false)
                    setEmployer('')
                    setCurrentLogo(null)
                    setNewLogo('')
                }}
                title="Edit Employer Images"
                size="md"
            >
                <div>
                    <div>
                        {employerLoading ?
                            <p>Loading...</p> :
                            <div>
                                <Select
                                    data={employerData?.getEmployers.map((employer: any) => {
                                        return employer.name
                                    })}
                                    placeholder="Select an employer"
                                    label="Employer"
                                    value={employer}
                                    onChange={(value) => {
                                        setEmployer(value as string)
                                        setCurrentLogo(employerData?.getEmployers.filter((employer: any) => employer.name === value)[0].logo_url)
                                    }}
                                >
                                </Select> 
                                
                            </div>
                        }
                    </div>
                    <div>
                        <p>Current Logo</p>
                        <Image src={currentLogo ? currentLogo : placeholderLogo} alt="Logo" loader={({ src }) => src } width={90} height={90}/>
                    </div>
                    <div>
                        <p>Please paste the URL of the new logo</p>
                        <p style={{ fontSize: "0.9rem", color: "red", marginTop: 0}}>Note: Please make sure the URL path ends in .png/.jpg and comes from glassdoor</p>
                        <input type="text" placeholder="Image URL" value={newLogo} onChange={
                            (e) => {
                                setNewLogo(e.target.value)
                            }
                        } 
                            style={{
                                width: "100%",
                                height: "2rem",
                                borderRadius: "0.25rem",
                                border: "1px solid #ced4da",
                                padding: "0.5rem",
                                backgroundColor: "white",
                                color: "black"
                            }}
                        />
                    </div>
                    <button
                        onClick={() => {
                            changeLogo({variables: {
                                name: employer,
                                logoUrl: newLogo
                        }}).then(() => {
                            setOpened(false)
                            setEmployer('')
                            setCurrentLogo(null)
                            setNewLogo('')
                            refetch()
                        })
                        }}
                        style={{
                            width: "100%",
                            height: "2rem",
                            borderRadius: "0.25rem",
                            border: "1px solid #ced4da",
                            padding: "0.5rem",
                            backgroundColor: "#806E53",
                            color: "white",
                            marginTop: "1rem",
                            fontSize: "bold"
                        }}
                    >
                        Update Logo
                    </button>
                </div>
            </Modal>
        </div>
    )
}