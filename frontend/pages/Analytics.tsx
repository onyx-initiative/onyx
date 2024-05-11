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

    return (

        

        <div>
            <h1>Analytics</h1>
        </div>

    )
}

export default AnalyticsPage
