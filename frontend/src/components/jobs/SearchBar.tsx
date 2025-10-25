import React, { useEffect, useState } from "react";
import { Job } from "../../../../backend/src/types/db.types";
import { useLazyQuery } from "@apollo/client";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "../../../styles/components/Jobs.module.css";
import {
  SEARCH_JOBS,
  SEARCH_ARCHIVED_JOBS,
} from "../../../graphql/queries/jobQueries";

type SearchBarProps = {
  setJobs: any;
  initialQuery?: string;
  query: string;
  setSearch: any;
  archived?: boolean;
};

export default function SearchBar({
  setJobs,
  initialQuery,
  query,
  setSearch,
  archived = false,
}: SearchBarProps) {
  const [getJobs, { data }] = useLazyQuery(
    archived ? SEARCH_ARCHIVED_JOBS : SEARCH_JOBS,
    {
      variables: archived
        ? { search: query, limit: 50, offset: 0 }
        : { search: query },
    },
  );

  useEffect(() => {
    if (initialQuery) {
      const vars = archived
        ? { search: formatQuery(initialQuery), limit: 50, offset: 0 }
        : { search: formatQuery(initialQuery) };
      getJobs({ variables: vars });
      // Ignore, this is intentional
    }
  }, [initialQuery, getJobs, archived]);

  useEffect(() => {
    if (data) {
      setJobs(archived ? data.searchArchivedJobs : data.searchJobs);
    }
  }, [data, setJobs, archived]);

  console.log(data);
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search jobs, companies, and more..."
        value={query}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.searchButton}>
        <AiOutlineSearch size={18} />
        <button
          type="button"
          onClick={() => {
            console.log(formatQuery(query));
            const vars = archived
              ? { search: formatQuery(query), limit: 50, offset: 0 }
              : { search: formatQuery(query) };
            getJobs({ variables: vars });
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

const formatQuery = (query: string) => {
  const terms = query.split(" ");
  let finalQuery: string = "";
  for (let i = 0; i < terms.length; i++) {
    if (i === terms.length - 1) {
      finalQuery += terms[i];
    } else {
      finalQuery += terms[i] + " & ";
    }
  }
  return finalQuery;
};
