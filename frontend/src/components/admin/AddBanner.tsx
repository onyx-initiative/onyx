import React, {useState } from "react";
import Navbar from "../general/Navbar";
import styles from "../../../styles/components/AdminPageButtons.module.css";
import Link from "next/link";
import { Modal, Select } from "@mantine/core";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EMPLOYERS } from "../../../graphql/queries/employerQueries";
import { ADD_BANNER } from "../../../graphql/mutations/scholarMutations";
import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';



export default function AddBanner() {
    const [opened, setOpened] = useState(false);
    const [newBannerText, setNewBannerText] = useState('');
    const [formattedBannerText, setFormattedBannerText] = useState('');
    const [updateBanner] = useMutation(ADD_BANNER)
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

    // const formatTextWithLinks = (text: string) => {
    //     const urlRegex = /(https?:\/\/[^\s]+)/g;
    //     return text.replace(urlRegex, (url: any) => `<a href="${url}" target="_blank">${url}</a>`);
    // };


    return (
        <div>
            <button 
                className={styles.button}
                onClick={() => setOpened(true)}
                style={{
                    height: "3rem",
                    borderRadius: "10px",
                    marginRight: "1rem",
                    border: "1px solid #ced4da",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#806E53",
                }}
            >
                Add new banner
            </button>
            <Modal
                opened={opened}
                onClose={() => {
                    setOpened(false)
                    setNewBannerText("")
                }}
                title="Change the banner that appears on the job board"
                size="md"
            >
                <div>
                <input
                placeholder="New Banner Text"
                value={newBannerText}
                onChange={(e) => {
                    // const formattedText = formatTextWithLinks(e.target.value);
                    setNewBannerText(e.target.value); // Store the original text in state
                    // setFormattedBannerText(formattedText); // Store the formatted text in state
                }}
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
                    <div style={{ width: "100%", marginTop: "10px" }}>
                        <p>Select the date range for the banner </p>
                        <Group position="center" style={{ width: "100%"}}>
                            <DatePicker type="range" value={value} onChange={setValue} color="black"/>
                        </Group>
                    </div>
                    <button
                        onClick={() => {
                            updateBanner({variables: {
                                bannerText: newBannerText,
                                startDate: value[0],
                                endDate: value[1]
                        }}).then(() => {
                            setOpened(false)
                            setNewBannerText("")
                            alert("Banner updated successfully!")
                        }).catch((err) => {
                            console.log(err)
                            alert("Error updating banner, please try again.")
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
                        Update Banner
                    </button>
                </div>
            </Modal>
        </div>
    )
}