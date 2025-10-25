import React, { useEffect, useState } from "react";
import Navbar from "../src/components/general/Navbar";
import Filter from "../src/sections/jobs/Filter";
import styles from "../styles/components/Jobs.module.css";
import { job_type, Job } from "../../backend/src/types/db.types";
import ListedJobs from "../src/sections/jobs/ListedJobs";

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";
import SearchBar from "../src/components/jobs/SearchBar";
import {
  VIEW_ARCHIVED_JOBS,
  SEARCH_ARCHIVED_JOBS,
} from "../graphql/queries/jobQueries";
import { useLazyQuery, useQuery } from "@apollo/client";
import loading from "../src/assets/loading.svg";
import Image from "next/image";

import { useRouter } from "next/router";
import { GET_EMPLOYERS } from "../graphql/queries/employerQueries";
import BackButton from "../src/components/admin/BackButton";

//@todo: fix filtering, add side menu, bookmarking, and fix double click to search
export default function Jobs() {
  const router = useRouter();
  const { query } = router;
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const {
    data: jobData,
    loading: jobLoading,
    error: jobError,
    fetchMore,
  } = useQuery(VIEW_ARCHIVED_JOBS, {
    variables: { limit: 50, offset: 0 },
  });
  const { data: employerData, loading: loadingEmployers } =
    useQuery(GET_EMPLOYERS);

  useEffect(() => {
    console.log("Job Data:", jobData);
    console.log("Job Error:", jobError);
    if (!jobLoading) {
      if (!query.search) {
        setJobs(jobData?.viewArchivedJobs);
        setAllJobs(jobData?.viewArchivedJobs || []);
      }
    }
    // Ignore, this is intentional
  }, [jobData, jobLoading]);

  // Auto-fetch more jobs every 5 pages
  useEffect(() => {
    const shouldFetchMore = currentPage > 0 && currentPage % 5 === 0;
    const currentBatch = Math.floor(currentPage / 5);
    // Need to have enough jobs for the NEXT page, not just current page
    const hasEnoughJobs = allJobs.length > currentPage * 10;

    console.log("Pagination Debug:", {
      currentPage,
      shouldFetchMore,
      currentBatch,
      allJobsLength: allJobs.length,
      requiredJobs: currentPage * 10,
      hasEnoughJobs,
      jobLoading,
      isSearching: !!query.search,
    });

    if (shouldFetchMore && !hasEnoughJobs && !jobLoading && !query.search) {
      console.log(
        `🔄 Fetching more jobs for page ${currentPage}, batch ${currentBatch}, offset: ${currentBatch * 50}`,
      );
      fetchMore({
        variables: {
          limit: 50,
          offset: currentBatch * 50,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const newJobs = fetchMoreResult.viewArchivedJobs;
          console.log(`✅ Fetched ${newJobs?.length} more jobs`);
          setAllJobs((prevJobs) => [...prevJobs, ...newJobs]);
          setJobs((prevJobs) => [...prevJobs, ...newJobs]);
          return {
            viewArchivedJobs: [...(prev.viewArchivedJobs || []), ...newJobs],
          };
        },
      }).catch((err) => {
        console.error("❌ Error fetching more jobs:", err);
      });
    }
  }, [currentPage, allJobs.length, jobLoading, fetchMore, query.search]);

  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: 90 }}>
        <BackButton />
      </div>
      <div className={styles.jobContainer}>
        <div className={styles.jobList}>
          <SearchBar
            setJobs={setJobs}
            initialQuery={query.search as string}
            query={search}
            setSearch={setSearch}
            archived={true}
          />
          {jobLoading ? (
            <div className={styles.loading}>
              <Image src={loading} alt="Loading..." width={80} height={80} />
            </div>
          ) : (
            <div style={{ width: "100%", marginBottom: 0 }}>
              <p style={{ marginBottom: "-15px", padding: 0, color: "grey" }}>
                {(jobs?.length || 0) + " result(s)"}
              </p>
              <ListedJobs
                jobs={jobs}
                employerData={employerData}
                archive={true}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { getServerProps };
