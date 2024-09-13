import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ANALYTICS_DASHBOARD_DATA } from "../graphql/queries/analyticsQueries";
import DashboardClickChart from "../src/components/admin/DashboardClickChart";
import DashboardDateLimitInput from "../src/components/admin/DashboardDateLimitInput";
import DashboardDateLimitSubmit from "../src/components/admin/DashboardDateLimitSubmit";
import DashboardErrorMessage from "../src/components/admin/DashboardErrorMessage";
import DashboardTitleRow from "../src/components/admin/DashboardTitleRow";
import DashboardTwoItemTable from "../src/components/admin/DashboardTwoItemTable";
import FancySpinner from "../src/components/admin/FancySpinner";
import Navbar from "../src/components/general/Navbar";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const currentDateObj = new Date();
  const currentDate = currentDateObj.toISOString().split("T")[0];
  const currentYear = currentDateObj.getFullYear();
  const [startDate, setStartDate] = useState(`${currentYear}-01-01`);
  const [endDate, setEndDate] = useState(`${currentYear}-12-31`);
  const [fetchedStartDate, setFetchedStartDate] = useState(startDate);
  const [fetchedEndDate, setFetchedEndDate] = useState(endDate);
  const [dateRangeFormError, setDateRangeFormError] = useState("");

  const [
    getPageData,
    {
      previousData: previousPageData,
      data: pageData,
      loading: pageLoading,
      error: pageError,
      called: pageCalled,
    },
  ] = useLazyQuery(GET_ANALYTICS_DASHBOARD_DATA, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setFetchedStartDate(startDate);
      setFetchedEndDate(endDate);
    },
  });
  useEffect(() => {
    if (!pageCalled) {
      getPageData({ variables: { startDate, endDate } });
    }
  }, [endDate, getPageData, pageCalled, startDate]);

  const hasDateRangeFormError = () => {
    setDateRangeFormError("");

    const validDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!validDateRegex.test(startDate)) {
      setDateRangeFormError("Start date is invalid.");
      return true;
    }
    if (!validDateRegex.test(endDate)) {
      setDateRangeFormError("End date is invalid.");
      return true;
    }

    return false;
  };
  const submitGetPageDataForm = () => {
    if (hasDateRangeFormError()) {
      return;
    }

    getPageData({ variables: { startDate, endDate } });
  };

  let DashboardContent = (
    <div className={styles.center}>
      <FancySpinner />
    </div>
  );
  const currentPageData = pageData ? pageData : previousPageData; // shows old data while new date range is being fetched
  if (currentPageData) {
    const jobTagsRankedByJobCount: [{ tag: string; job_count: string }] =
      currentPageData["jobTagsRankedByJobCount"];
    const jobTagsRankedByJobCountTableBodyData = jobTagsRankedByJobCount.map(
      (ranking) => [ranking.tag, ranking.job_count]
    );

    const jobLocationsRankedByJobCount: [
      { location: string; job_count: string }
    ] = currentPageData["jobLocationsRankedByJobCount"];
    const jobLocationsRankedByJobCountTableBodyData =
      jobLocationsRankedByJobCount.map((ranking) => [
        ranking.location,
        ranking.job_count,
      ]);

    const jobDeadlinesAsMonthRankedByJobCount: [
      { month: string; job_count: string }
    ] = currentPageData["jobDeadlinesAsMonthRankedByJobCount"];
    const jobDeadlinesAsMonthRankedByJobCountTableBodyData =
      jobDeadlinesAsMonthRankedByJobCount.map((ranking) => [
        ranking.month,
        ranking.job_count,
      ]);

    const daysSinceLastJobPostByEmployer: [
      { employerName: string; days_since_last_post: string }
    ] = currentPageData["daysSinceLastJobPostByEmployer"];
    const daysSinceLastJobPostByEmployerTableBodyData =
      daysSinceLastJobPostByEmployer.map((ranking) => [
        ranking.employerName,
        ranking.days_since_last_post,
      ]);

    const scholarsByMajor: [{ major: string; scholar_count: string }] =
      currentPageData["scholarsRankedByMajor"];
    const scholarsByMajorTableBodyData = scholarsByMajor.map((ranking) => [
      ranking.major,
      ranking.scholar_count,
    ]);

    const scholarsByYear: [{ year: string; scholar_count: string }] =
      currentPageData["scholarsRankedByYear"];
    const scholarsByYearTableBodyData = scholarsByYear.map((ranking) => [
      ranking.year,
      ranking.scholar_count,
    ]);

    // Get click counts for each main type of link
    const linkTypes = ["Job", "Apply", "Employer"];
    const intervals = ["Daily", "Weekly", "Monthly", "Yearly"];
    const linkTypeIntervalClickGroups = linkTypes.flatMap((type) =>
      intervals.map((interval) => {
        return {
          type,
          interval,
          dataKey: `${type.toLowerCase()}Clicks${interval}`,
        };
      })
    );
    const linkTypeClicksTableBodyData = linkTypes.map((type) => {
      const dataKey = `${type.toLowerCase()}Clicks${intervals[0]}`; // can be any interval
      const totalClicks = currentPageData[dataKey].reduce(
        (
          prev: number,
          cur: {
            date: string;
            count: number;
          }
        ) => prev + cur.count,
        0
      );
      return [type, totalClicks];
    });

    const jobTagClicks: [{ tag: string; click_count: string }] =
      currentPageData["jobTagClicks"];
    const jobTagClicksTableBodyData = jobTagClicks.map((ranking) => [
      ranking.tag,
      ranking.click_count,
    ]);

    const numJobPostsDateRange = currentPageData["numJobPosts"];
    const numActiveJobsDateRange = currentPageData["numActiveJobs"];
    const numActiveScholars = currentPageData["numActiveScholars"];
    const numAllowedScholars = currentPageData["numAllowedScholars"];

    const employerJobPostingClicks: [
      { employerName: string; job_posting_click_count: string }
    ] = currentPageData["employerJobPostingClicks"];
    const employerJobPostingClicksTableBodyData = employerJobPostingClicks.map(
      (ranking) => [ranking.employerName, ranking.job_posting_click_count]
    );

    const scholarClicksBySchool: [
      { school: string; scholar_click_count: string }
    ] = currentPageData["scholarClicksBySchool"];
    const scholarClicksBySchoolTableBodyData = scholarClicksBySchool.map(
      (ranking) => [ranking.school, ranking.scholar_click_count]
    );

    const scholarJobClicks: [{ scholarName: string; job_count: string }] =
      currentPageData["scholarJobClicks"];
    const scholarJobClicksTableBodyData = scholarJobClicks.map((ranking) => [
      ranking.scholarName,
      ranking.job_count,
    ]);

    const scholarApplyClicks: [{ scholarName: string; apply_count: string }] =
      currentPageData["scholarApplyClicks"];
    const scholarApplyClicksTableBodyData = scholarApplyClicks.map(
      (ranking) => [ranking.scholarName, ranking.apply_count]
    );

    const scholarEmployerClicks: [
      { scholarName: string; employer_count: string }
    ] = currentPageData["scholarEmployerClicks"];
    const scholarEmployerClicksTableBodyData = scholarEmployerClicks.map(
      (ranking) => [ranking.scholarName, ranking.employer_count]
    );

    DashboardContent = (
      <>
        <div className={styles.printSection}>
          <DashboardTitleRow title="General Counts" />
          <p>
            <strong>Number of Active Scholars: </strong>
            {numActiveScholars}
          </p>
          <p>
            <strong>Number of Allowed Scholars: </strong>
            {numAllowedScholars}
          </p>
          <div className={styles.quickStats}>
            <DashboardTwoItemTable
              firstHeading="JOB TAG"
              secondHeading="JOBS"
              data={jobTagsRankedByJobCountTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="JOB LOCATION"
              secondHeading="JOBS"
              data={jobLocationsRankedByJobCountTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="JOB DEADLINE (MONTH)"
              secondHeading="JOBS"
              data={jobDeadlinesAsMonthRankedByJobCountTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="EMPLOYER NAME"
              secondHeading="DAYS SINCE LAST JOB POST"
              data={daysSinceLastJobPostByEmployerTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="SCHOLAR MAJOR"
              secondHeading="SCHOLARS"
              data={scholarsByMajorTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="SCHOLAR YEAR"
              secondHeading="SCHOLARS"
              data={scholarsByYearTableBodyData}
            />
          </div>
        </div>
        <div className={styles.printSection}>
          <DashboardTitleRow
            title={`Data from from ${fetchedStartDate} to ${fetchedEndDate}`}
            rightComponent={
              <div>
                <form action="" className={styles.dateLimitsForm}>
                  <DashboardDateLimitInput
                    label="Start Date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      hasDateRangeFormError();
                    }}
                    onFocus={hasDateRangeFormError}
                    onBlur={hasDateRangeFormError}
                    className={styles.dateLimitInput}
                    max={currentDate}
                    disabled={pageLoading}
                  />
                  <DashboardDateLimitInput
                    label="End Date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      hasDateRangeFormError();
                    }}
                    onFocus={hasDateRangeFormError}
                    onBlur={hasDateRangeFormError}
                    className={styles.dateLimitInput}
                    min={startDate}
                    max={currentDate}
                    disabled={pageLoading}
                  />
                  <DashboardDateLimitSubmit
                    onClick={submitGetPageDataForm}
                    loading={pageLoading}
                    disabled={pageLoading}
                  >
                    Get Clicks
                  </DashboardDateLimitSubmit>
                </form>
                {dateRangeFormError ? (
                  <div className={styles.dateLimitsFormError}>
                    {dateRangeFormError}
                  </div>
                ) : null}
              </div>
            }
          />

          <div className={styles.quickStats}>
            <p>
              <strong>Number of Job Posts: </strong>
              {numJobPostsDateRange}
            </p>
            <p>
              <strong>Number of Active Jobs: </strong>
              {numActiveJobsDateRange}
            </p>
            <DashboardTwoItemTable
              firstHeading="LINK TYPE"
              secondHeading="CLICKS"
              data={linkTypeClicksTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="JOB TAG"
              secondHeading="CLICKS"
              data={jobTagClicksTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="EMPLOYER NAME"
              secondHeading="JOB POSTING CLICKS"
              data={employerJobPostingClicksTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="SCHOOL NAME"
              secondHeading="SCHOLAR CLICKS"
              data={scholarClicksBySchoolTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="SCHOLAR NAME"
              secondHeading="JOB CLICKS"
              data={scholarJobClicksTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="SCHOLAR NAME"
              secondHeading="APPLY CLICKS"
              data={scholarApplyClicksTableBodyData}
            />
            <DashboardTwoItemTable
              firstHeading="SCHOLAR NAME"
              secondHeading="EMPLOYER CLICKS"
              data={scholarEmployerClicksTableBodyData}
            />
          </div>
        </div>
        <div className={styles.printSection}>
          {linkTypeIntervalClickGroups.map((chart) => (
            <div key={chart.dataKey} className={styles.chartContainer}>
              <DashboardClickChart
                data={currentPageData[chart.dataKey]}
                interval={chart.interval}
                type={chart.type}
              />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.noPrint}>
        <Navbar />
      </div>
      <main className={styles.wrapper}>
        {pageError ? (
          <DashboardErrorMessage message={pageError.message} />
        ) : (
          DashboardContent
        )}
      </main>
    </>
  );
}
