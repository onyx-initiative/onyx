import React, { useEffect, useState } from 'react'
import { Job } from '../../../../backend/src/types/db.types';
import { useLazyQuery } from '@apollo/client';
import { AiOutlineSearch } from "react-icons/ai";
import styles from '../../../styles/components/Jobs.module.css';
import { SEARCH_JOBS } from '../../../graphql/queries/jobQueries';

type SearchBarProps = {
    setJobs: any;
    initialQuery?: string;
    query: string;
    setSearch: any;
    filtersSelected: any;
}

export default function SearchBar({ setJobs, initialQuery, query, setSearch, filtersSelected }: SearchBarProps) {

  
      
    const [getJobs, { data }] = useLazyQuery(SEARCH_JOBS, {
        variables: { search: query, location: filtersSelected.location, jobType: filtersSelected.jobType, graduationYear: filtersSelected.graduationYear, categories: filtersSelected.categories },
    })

    useEffect(() => {
    if (initialQuery) {
        getJobs({ variables: { search: formatQuery(initialQuery), location: filtersSelected.location, jobType: filtersSelected.jobType, graduationYear: filtersSelected.graduationYear, categories: filtersSelected.categories } })
        // Ignore, this is intentional
    }}, [initialQuery, getJobs])

    useEffect(() => {
        if (data) {
            setJobs(data.searchJobs)
        }
    }, [data, setJobs])

    return (
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search jobs, companies, and more..."
          value={query}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.searchButton}>
          <AiOutlineSearch size={18}/>
          <button
            type="button"
            onClick={() => {

              getJobs({ variables: { search: formatQuery(query), location: filtersSelected.location, jobType: filtersSelected.jobType, graduationYear: filtersSelected.graduationYear, categories: filtersSelected.categories } })}}
          >
            Search
          </button>
        </div>
      </div>
    )
}

const formatQuery = (query: string) => {
    const terms = query.split(' ')
    let finalQuery: string = '';
    for (let i = 0; i < terms.length; i++) {
        if (i === terms.length - 1) {
            finalQuery += terms[i]
        } else {
            finalQuery += terms[i] + ' & '
        }
    }
    return finalQuery;
}
