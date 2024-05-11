import { gql } from '@apollo/client';

// Query for getting job clicks
export const GET_JOB_CLICKS = gql`
    query GetJobClicks {
        getJobClicks {
            scholarId
            employerId
            employerName
            jobId
            clickTime
        }
    }
`;

// Query for getting employer clicks
export const GET_EMPLOYER_CLICKS = gql`
    query GetEmployerClicks {
        getEmployerClicks {
            scholarId
            employerId
            employerName
            clickTime
        }
    }
`;

// Query for getting ranked job clicks
export const GET_JOB_CLICKS_RANKED = gql`
    query GetJobClicksRanked {
        getJobClicksRanked {
            employerId
            jobId
            jobTitle
            employerName
            click_count
        }
    }
`;

// Query for getting job tag rankings
export const GET_JOB_TAG_RANKING = gql`
    query GetJobTagRanking {
        getJobTagRanking {
            tag
            job_count
        }
    }
`;

// Query for getting job tag ranking by clicks
export const GET_JOB_TAG_RANKING_BY_CLICKS = gql`
    query GetJobTagRankingByClicks {
        getJobTagRankingByClicks {
            tag
            click_count
        }
    }
`;

// Query for getting job location ranking
export const GET_JOB_LOCATION_RANKING = gql`
    query GetJobLocationRanking {
        getJobLocationRanking {
            location
            job_count
        }
    }
`;

// Query for getting job deadline ranking by month
export const GET_JOB_DEADLINE_RANKING_BY_MONTH = gql`
    query GetJobDeadlineRankingByMonth {
        getJobDeadlineRankingByMonth {
            month
            job_count
        }
    }
`;

// Query for getting scholars ranked by major
export const GET_SCHOLARS_RANKED_BY_MAJOR = gql`
    query GetScholarsRankedByMajor {
        getScholarsRankedByMajor {
            major
            scholar_count
        }
    }
`;

// Query for getting scholars ranked by year
export const GET_SCHOLARS_RANKED_BY_YEAR = gql`
    query GetScholarsRankedByYear {
        getScholarsRankedByYear {
            year
            scholar_count
        }
    }
`;

// Query for getting the percentage of scholars with allowed notifications
export const GET_PERCENTAGE_OF_SCHOLARS_WITH_ALLOWED_NOTIFICATIONS = gql`
    query GetPercentageOfScholarsWithAllowedNotifications {
        getPercentageOfScholarsWithAllowedNotifications
    }
`;

// Query for getting scholar apply clicks ranked
export const GET_SCHOLAR_APPLY_CLICKS_RANKED = gql`
    query GetScholarApplyClicksRanked {
        getScholarApplyClicksRanked {
            scholarId
            apply_count
        }
    }
`;

// Query for getting scholar job clicks ranked
export const GET_SCHOLAR_JOB_CLICKS_RANKED = gql`
    query GetScholarJobClicksRanked {
        getScholarJobClicksRanked {
            scholarId
            job_count
        }
    }
`;

// Query for getting scholar employer clicks ranked
export const GET_SCHOLAR_EMPLOYER_CLICKS_RANKED = gql`
    query GetScholarEmployerClicksRanked {
        getScholarEmployerClicksRanked {
            scholarId
            employer_count
        }
    }
`;

// Query for getting employer job postings ranking
export const GET_EMPLOYER_JOB_POSTINGS_RANKING = gql`
    query GetEmployerJobPostingsRanking {
        getEmployerJobPostingsRanking {
            employerName
            employerId
            job_posting_click_count
        }
    }
`;

// Query for getting the number of days since last job post by employer
export const GET_NUM_DAYS_SINCE_LAST_JOB_POST_BY_EMPLOYER = gql`
    query GetNumDaysSinceLastJobPostByEmployer {
        getNumDaysSinceLastJobPostByEmployer {
            employerName
            employerId
            days_since_last_post
        }
    }
`;

// Query for getting the most popular job tags by employer
export const GET_MOST_POPULAR_JOB_TAGS_BY_EMPLOYER = gql`
    query GetMostPopularJobTagsByEmployer {
        getMostPopularJobTagsByEmployer {
            employer
            tag
            job_count
        }
    }
`;

// Query for getting scholar clicks by school
export const GET_SCHOLAR_CLICKS_BY_SCHOOL = gql`
    query GetScholarClicksBySchool {
        getScholarClicksBySchool {
            school
            scholar_click_count
        }
    }
`;
