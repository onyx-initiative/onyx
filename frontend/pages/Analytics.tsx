import React from 'react'
import { useQuery } from '@apollo/client'
import {
    GET_JOB_CLICKS,
    GET_EMPLOYER_CLICKS,
    GET_JOB_CLICKS_RANKED,
    GET_JOB_TAG_RANKING,
    GET_JOB_TAG_RANKING_BY_CLICKS,
    GET_JOB_LOCATION_RANKING,
    GET_JOB_DEADLINE_RANKING_BY_MONTH,
    GET_SCHOLARS_RANKED_BY_MAJOR,
    GET_SCHOLARS_RANKED_BY_YEAR,
    GET_PERCENTAGE_OF_SCHOLARS_WITH_ALLOWED_NOTIFICATIONS,
    GET_SCHOLAR_APPLY_CLICKS_RANKED,
    GET_SCHOLAR_JOB_CLICKS_RANKED,
    GET_SCHOLAR_EMPLOYER_CLICKS_RANKED,
    GET_EMPLOYER_JOB_POSTINGS_RANKING,
    GET_NUM_DAYS_SINCE_LAST_JOB_POST_BY_EMPLOYER,
    GET_MOST_POPULAR_JOB_TAGS_BY_EMPLOYER,
    GET_SCHOLAR_CLICKS_BY_SCHOOL
} from '../graphql/queries/analyticsQueries'
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';


interface Props {}

function AnalyticsPage(props: Props) {
    const { data: jobClickData, loading: jobClickLoading, error: jobClickError } = useQuery(GET_JOB_CLICKS)
    const { data: employerClicksData, loading: employerClicksLoading, error: employerClicksError } = useQuery(GET_EMPLOYER_CLICKS)
    const { data: jobClicksRankedData, loading: jobClicksRankedLoading, error: jobClicksRankedError } = useQuery(GET_JOB_CLICKS_RANKED)
    const { data: jobTagRankingData, loading: jobTagRankingLoading, error: jobTagRankingError } = useQuery(GET_JOB_TAG_RANKING)
    const { data: jobTagRankingByClicksData, loading: jobTagRankingByClicksLoading, error: jobTagRankingByClicksError } = useQuery(GET_JOB_TAG_RANKING_BY_CLICKS)
    const { data: jobLocationRankingData, loading: jobLocationRankingLoading, error: jobLocationRankingError } = useQuery(GET_JOB_LOCATION_RANKING)
    const { data: jobDeadlineRankingByMonthData, loading: jobDeadlineRankingByMonthLoading, error: jobDeadlineRankingByMonthError } = useQuery(GET_JOB_DEADLINE_RANKING_BY_MONTH)
    const { data: scholarsRankedByMajorData, loading: scholarsRankedByMajorLoading, error: scholarsRankedByMajorError } = useQuery(GET_SCHOLARS_RANKED_BY_MAJOR)
    const { data: scholarsRankedByYearData, loading: scholarsRankedByYearLoading, error: scholarsRankedByYearError } = useQuery(GET_SCHOLARS_RANKED_BY_YEAR)
    const { data: percentageOfScholarsWithAllowedNotificationsData, loading: percentageOfScholarsWithAllowedNotificationsLoading, error: percentageOfScholarsWithAllowedNotificationsError } = useQuery(GET_PERCENTAGE_OF_SCHOLARS_WITH_ALLOWED_NOTIFICATIONS)
    const { data: scholarApplyClicksRankedData, loading: scholarApplyClicksRankedLoading, error: scholarApplyClicksRankedError } = useQuery(GET_SCHOLAR_APPLY_CLICKS_RANKED)
    const { data: scholarJobClicksRankedData, loading: scholarJobClicksRankedLoading, error: scholarJobClicksRankedError } = useQuery(GET_SCHOLAR_JOB_CLICKS_RANKED)
    const { data: scholarEmployerClicksRankedData, loading: scholarEmployerClicksRankedLoading, error: scholarEmployerClicksRankedError } = useQuery(GET_SCHOLAR_EMPLOYER_CLICKS_RANKED)
    const { data: employerJobPostingsRankingData, loading: employerJobPostingsRankingLoading, error: employerJobPostingsRankingError } = useQuery(GET_EMPLOYER_JOB_POSTINGS_RANKING)
    const { data: numDaysSinceLastJobPostByEmployerData, loading: numDaysSinceLastJobPostByEmployerLoading, error: numDaysSinceLastJobPostByEmployerError } = useQuery(GET_NUM_DAYS_SINCE_LAST_JOB_POST_BY_EMPLOYER)
    const { data: mostPopularJobTagsByEmployerData, loading: mostPopularJobTagsByEmployerLoading, error: mostPopularJobTagsByEmployerError } = useQuery(GET_MOST_POPULAR_JOB_TAGS_BY_EMPLOYER)
    const { data: scholarClicksBySchoolData, loading: scholarClicksBySchoolLoading, error: scholarClicksBySchoolError } = useQuery(GET_SCHOLAR_CLICKS_BY_SCHOOL)

    console.log(jobClickData)
    console.log(employerClicksData)

    const date = new Date();

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(jobClickData.getJobClicks);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Job Clicks");
        const worksheet2 = XLSX.utils.json_to_sheet(employerClicksData.getEmployerClicks);
        XLSX.utils.book_append_sheet(workbook, worksheet2, "Employer Clicks");
        const worksheet3 = XLSX.utils.json_to_sheet(jobClicksRankedData.getJobClicksRanked);
        XLSX.utils.book_append_sheet(workbook, worksheet3, "Job Clicks Ranked");
        const worksheet4 = XLSX.utils.json_to_sheet(jobTagRankingData.getJobTagRanking);
        XLSX.utils.book_append_sheet(workbook, worksheet4, "Job Tag Ranking");
        const worksheet5 = XLSX.utils.json_to_sheet(jobTagRankingByClicksData.getJobTagRankingByClicks);
        XLSX.utils.book_append_sheet(workbook, worksheet5, "Job Tag Ranking By Clicks");
        const worksheet6 = XLSX.utils.json_to_sheet(jobLocationRankingData.getJobLocationRanking);
        XLSX.utils.book_append_sheet(workbook, worksheet6, "Job Location Ranking");
        const worksheet7 = XLSX.utils.json_to_sheet(jobDeadlineRankingByMonthData.getJobDeadlineRankingByMonth);
        XLSX.utils.book_append_sheet(workbook, worksheet7, "Job Deadline Ranking By Month");
        const worksheet8 = XLSX.utils.json_to_sheet(scholarsRankedByMajorData.getScholarsRankedByMajor);
        XLSX.utils.book_append_sheet(workbook, worksheet8, "Scholars Ranked By Major");
        const worksheet9 = XLSX.utils.json_to_sheet(scholarsRankedByYearData.getScholarsRankedByYear);
        XLSX.utils.book_append_sheet(workbook, worksheet9, "Scholars Ranked By Year");
        const worksheet10 = XLSX.utils.json_to_sheet(percentageOfScholarsWithAllowedNotificationsData.getPercentageOfScholarsWithAllowedNotifications);
        XLSX.utils.book_append_sheet(workbook, worksheet10, "Percentage Of Scholars With Allowed Notifications");
        const worksheet11 = XLSX.utils.json_to_sheet(scholarApplyClicksRankedData.getScholarApplyClicksRanked);
        XLSX.utils.book_append_sheet(workbook, worksheet11, "Scholar Apply Clicks Ranked");
        const worksheet12 = XLSX.utils.json_to_sheet(scholarJobClicksRankedData.getScholarJobClicksRanked);
        XLSX.utils.book_append_sheet(workbook, worksheet12, "Scholar Job Clicks Ranked");
        const worksheet13 = XLSX.utils.json_to_sheet(scholarEmployerClicksRankedData.getScholarEmployerClicksRanked);
        XLSX.utils.book_append_sheet(workbook, worksheet13, "Scholar Employer Clicks Ranked");
        const worksheet14 = XLSX.utils.json_to_sheet(employerJobPostingsRankingData.getEmployerJobPostingsRanking);
        XLSX.utils.book_append_sheet(workbook, worksheet14, "Employer Job Postings Ranking");
        const worksheet15 = XLSX.utils.json_to_sheet(numDaysSinceLastJobPostByEmployerData.getNumDaysSinceLastJobPostByEmployer);
        XLSX.utils.book_append_sheet(workbook, worksheet15, "Num Days Since Last Job Post By Employer");
        const worksheet16 = XLSX.utils.json_to_sheet(mostPopularJobTagsByEmployerData.getMostPopularJobTagsByEmployer);
        XLSX.utils.book_append_sheet(workbook, worksheet16, "Most Popular Job Tags By Employer");
        const worksheet17 = XLSX.utils.json_to_sheet(scholarClicksBySchoolData.getScholarClicksBySchool);
        XLSX.utils.book_append_sheet(workbook, worksheet17, "Scholar Clicks By School");

        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
        saveAs(blob, `OnyxAnalyticsData${date}.xlsx`);
    };

    return (

        <div>
            <h1>Analytics</h1>
            <button onClick={exportToExcel}>Export Analytics</button>
        </div>

    )
}

export default AnalyticsPage
