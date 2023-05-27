import React, { useEffect, useState } from 'react'
import Navbar from '../src/components/general/Navbar'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import { GET_SCHOLAR_VIEWS } from '../graphql/queries/scholarQueries'
import { GET_RELEVANT_JOBS } from '../graphql/queries/jobQueries'
import { NativeSelect, Modal, MultiSelect } from '@mantine/core';
import styles from '../styles/components/Views.module.css'
import JobCard from '../src/components/jobs/JobCard'
import { CREATE_VIEW } from '../graphql/mutations/scholarMutations'
import { useSession } from 'next-auth/react'
import { Capitalize } from './CreateAccount'
import { GET_EMPLOYERS } from '../graphql/queries/employerQueries'

export default function Views() {
    const router = useRouter()
    const { query } = router
    const { data: session } = useSession({ required: true })

    // Get all the views for the scholar
    const { data: views, loading: viewsLoading, refetch: refetchViews } = useQuery(GET_SCHOLAR_VIEWS, {
        variables: { scholarId: query.scholar_id?.toString() },
    })
    const { data: jobData, loading: jobLoading, refetch } = useQuery(GET_RELEVANT_JOBS, {
        variables: {
            scholarId: query.scholar_id,
            viewId: views?.getScholarsViews[0].view_id,
        }
    })
    const {data: employerData, loading: loadingEmployers } = useQuery(GET_EMPLOYERS)
    const [createView] = useMutation(CREATE_VIEW)
    const [jobs, setJobs] = useState<any>([])
    const [value, setValue] = useState<string>('')
    const [opened, setOpened] = useState(false);
    const [newView, setNewViewData] = useState([] as any);
    const [viewName, setViewName] = useState('')

    let data: any = []
    if (views) {
        views.getScholarsViews.map((view: any) => {
            data.push(view.view_name)
        })
    }

    useEffect(() => {
        if (!jobLoading && !viewsLoading) {
            setJobs(jobData?.getRelevantJobs)
        }
    }, [jobLoading, jobData])

    return (
        <div>
            <Navbar />
            <div className={styles.viewContainer}>
                <div className={styles.viewSelect}>
                    <NativeSelect
                        data={data}
                        label="Select which view you would like to see"
                        styles={{
                            label: {
                                color: 'white',
                                fontSize: '1rem',
                                marginBottom: '0.7rem',
                                marginTop: '1rem',
                            },
                            input: {
                                marginBottom: '1rem',
                                fontSize: '1rem',
                            }
                        }}
                        onChange={(event: any) => {
                            // Find the index of the view name in the data array
                            // Then use that index to get the view id
                            setValue(event.currentTarget.value)
                            const index = data.indexOf(event.target.value)

                            refetch({
                                scholarId: query.scholar_id,
                                viewId: views?.getScholarsViews[index].view_id
                            })
                        }}
                    />
                    <button onClick={() => {
                        setOpened(true)
                    }} className={styles.createViewButton}>+</button>
                </div>
                {
                    jobLoading || viewsLoading ? <div>Loading...</div> :
                        jobs.map((job: any, index: number) => {
                            return (
                                <JobCard key={index} job={job} employerData={employerData}/>
                            )
                        }
                    )
                }
            </div>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Create a new view">
                <input type='text' onChange={
                    (event) => {
                        setViewName(event.target.value)
                    }
                }
                className={styles.viewNameInput}
                ></input>
                <MultiSelect
                    label="Add up to 5 criteria"
                    data={newView}
                    placeholder="Type a criteria and hit enter!"
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                        const item = { value: query, label: query };
                        setNewViewData((current: any) => [...current, item]);
                        return item;
                    }}
                />
                <button className={styles.viewSubmitButton} onClick={() => {
                    if (viewName !== '' && newView.length > 0) {
                        createView({
                            variables: { 
                                viewId: (Math.round(Math.random() * 1000000)).toString(10),
                                scholarId: query.scholar_id?.toString(), 
                                viewName: viewName, 
                                criteria: formatViewInfo(newView)
                            }
                        }).then(() => {
                            refetchViews().then(() => setOpened(false))
                        })
                    } else {
                        alert('Please enter a view name and at least one criteria')
                    }
                }}>Create View</button>
            </Modal>
        </div>
    )
}

const formatViewInfo = (viewInfo: any) => {
    let formattedViewInfo: string[] = []
    viewInfo.forEach((item: any) => {
        formattedViewInfo.push(Capitalize(item.value))
    })
    return formattedViewInfo
}
