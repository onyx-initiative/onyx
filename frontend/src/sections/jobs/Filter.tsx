import React, { useEffect, useState } from 'react'
import styles from '../../../styles/components/Jobs.module.css'
import { MdOutlineCancel } from "react-icons/md";
import { Select, Checkbox, MultiSelect } from '@mantine/core';
import { filters } from '../../../pages/Jobs';
import { cursorTo } from 'readline';
import { GET_FILTERED_JOBS, SEARCH_JOBS } from '../../../graphql/queries/jobQueries';
import { useLazyQuery, useQuery } from '@apollo/client';

type FilterProps = {
  filters: any;
  setFilters: (filters: filters) => void;
  selected: any;
  setSelected: (selected: any) => void;
  setJobs: any;
}

export default function Filter(props: FilterProps) {
  const { filters, setFilters, selected, setSelected, setJobs } = props
  const [getFilteredJobs, { data, loading }] = useLazyQuery(GET_FILTERED_JOBS)


  // @todo: Fix the apply filter query
  useEffect(() => {
    if (data && !loading) {
        setJobs(data.getFilteredJobs)
    }
  }, [data, setJobs])

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterHeader}>
        <h3>Filter</h3>
        <ClearAll setSelected={setSelected} />
      </div>
      <div className={styles.location}>
        <h4 className={styles.title}>Location</h4>
        <Select
          placeholder="Select preferred location"
          searchable
          nothingFound="No options"
          data={filters.location}
          onChange={(value) => {
            setSelected({
              ...selected,
              location: value
            })
          }}
        />
      </div>
      <div className={styles.jobType}>
        <h4 className={styles.title}>Job Type</h4>
          <div className={styles.checkbox}>
            <Checkbox
              checked={selected.job_type.full_time} 
              label='Full Time'
              color='dark'
              size='md'
              onChange={() => (
                setSelected({
                  ...selected,
                  job_type: {
                    ...selected.job_type,
                    full_time: !selected.job_type.full_time
                  }
                })
              )}
            />
          </div>
          <div className={styles.checkbox}>
            <Checkbox
              checked={selected.job_type.part_time} 
              label='Part Time'
              color='dark'
              size='md'
              onChange={() => (
                setSelected({
                  ...selected,
                  job_type: {
                    ...selected.job_type,
                    part_time: !selected.job_type.part_time
                  }
                })
              )}
            />
          </div>
          <div className={styles.checkbox}>
            <Checkbox
              checked={selected.job_type.internship} 
              label='Internship'
              color='dark'
              size='md'
              onChange={() => (
                setSelected({
                  ...selected,
                  job_type: {
                    ...selected.job_type,
                    internship: !selected.job_type.internship
                  }
                })
              )}
            />
          </div>
          <div className={styles.checkbox}>
            <Checkbox
              checked={selected.job_type.new_grad} 
              label='New Grad'
              color='dark'
              size='md'
              onChange={() => (
                setSelected({
                  ...selected,
                  job_type: {
                    ...selected.job_type,
                    new_grad: !selected.job_type.new_grad
                  }
                })
              )}
            />
          </div>
      </div>
      <div className={styles.applicantYear}>
        <h4 className={styles.title}>Graduation Year</h4>
        {
          filters.applicant_year.map((year: number) => (
            <div className={styles.checkbox} key={year}>
              <Checkbox
                checked={selected.applicant_year.includes(year)}
                label={year}
                color='dark'
                size='md'
                onChange={() => {
                  if (selected.applicant_year.includes(year)) {
                    // @todo: Update this method to remove the year from the array

                    const index = selected.applicant_year.indexOf(year)
                    const newApplicantYear = selected.applicant_year.splice(index, 1)
                    return (
                      setSelected({
                        ...selected,
                        applicant_year: newApplicantYear
                      })
                    )
                  } else {
                    return (
                      setSelected({
                        ...selected,
                        applicant_year: [
                          ...selected.applicant_year,
                          year
                        ],
                    }))
                  }
                }
              }
              />
            </div>
          ))
        }
      </div>
      <div className={styles.tags}>
        <h4 className={styles.title}>Categories</h4>
        <MultiSelect
          data={filters.tags}
          placeholder="Select tags to filter by"
          searchable
          creatable
          onChange={(query) => {
            selected.tags = query
          }}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setFilters({
              ...filters,
              tags: [...filters.tags, item]
            });
            return item;
          }}
        />
      </div>
      <button 
        type="button" 
        className={styles.applyFilters}
        onClick={() => {
          getFilteredJobs({
            variables: { filter: selected }
          })
        }}
      >
        Apply Filters
      </button>
    </div>
  )
}


const ClearAll = (props: any) => {
  const { setSelected } = props

  return (
    <button
      type="button"
      onClick={() => {
        setSelected({
          location: "",
          job_type: {
            full_time: false,
            part_time: false,
            internship: false,
            new_grad: false
          },
          applicant_year: [],
          sort: "Newest",
          tags: []
        })
      }}
    >
      Clear Filters
      <div className={styles.divider}>
        <MdOutlineCancel size={16} />
      </div>
    </button>
  )
}
