import React, { useEffect, useState } from 'react'
import styles from '../../../styles/components/Jobs.module.css'
import { MdOutlineCancel } from "react-icons/md";
import { Select, Checkbox, MultiSelect } from '@mantine/core';
import { filters, sort } from '../../../pages/Jobs';
import { cursorTo } from 'readline';
import { SEARCH_JOBS } from '../../../graphql/queries/jobQueries';
import { useLazyQuery } from '@apollo/client';

type FilterProps = {
  filters: any;
  setFilters: (filters: filters) => void;
  selected: any;
  setSelected: (selected: any) => void;
  setJobs: any;
}

export default function Filter(props: FilterProps) {
  const { filters, setFilters, selected, setSelected, setJobs } = props
  const [getJobs, { data, loading }] = useLazyQuery(SEARCH_JOBS, {
    variables: { search: '' },
  })

  // @todo: Fix the apply filter query
  useEffect(() => {
    if (data && !loading) {
        setJobs(data.searchJobs)
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
            const item = { value: query, label: query };
            setSelected({
              ...selected,
              tags: [...selected.tags, item]
            })
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
          console.log(selected)
          console.log('query', stringifyFilters(selected))
          getJobs({ variables:  { search: stringifyFilters(selected) } })
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
          location: '',
          job_type: {
            full_time: false,
            part_time: false,
            internship: false,
            new_grad: false
          },
          applicant_year: [],
          sort: sort.Newest,
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

const stringifyFilters = (selected: any) => {
  let filters = ''
  for (let key in selected) {
    if (selected[key] !== '' && (selected[key].length > 0 || key === 'job_type')) {
      if (key === 'job_type') {
        for (let jobType in selected[key]) {
          if (selected[key][jobType]) {
            const formattedJobType = jobType.replace('_', ' ');
            filters += ` & ${formattedJobType}`;
          }
        }
      } else if (key === 'applicant_year') {
        filters += ' & '; // Add the '&' separator before appending years
        for (const year of selected[key]) {
          filters += `${year} `; // Append the year to the filters string
        }
        filters = filters.trim(); // Remove trailing space after the last year
      } else if (key === 'tags') {
        const tag = selected[key][selected[key].length - 1]
        for (let i = 0; i < tag.value.length; i++) {
          filters += ` & ${tag.value[i]}`
        }
      } else {
        filters += ` & ${selected[key]}`
      }
    }
  }

  if (filters[filters.length - 1] === '&') {
    if (filters[1] === '&') {
      filters = filters.slice(3, -1)
    } else {
      filters = filters.slice(1, -1)
    }
  }
  if (filters[0] === ' ') {
    filters = filters.slice(3)
  }

  return filters
}
