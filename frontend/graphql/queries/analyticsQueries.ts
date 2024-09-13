import { gql } from '@apollo/client'

// Query for getting job clicks
export const GET_JOB_CLICKS = gql`
  query GetJobClicks {
    getJobClicks {
      jobTitle
      employerId
      employerName
      jobId
      clickTime
      scholarName
      scholarEmail
    }
  }
`

// Query for getting apply clicks
export const GET_APPLY_CLICKS = gql`
  query GetApplyClicks {
    getApplyClicks {
      scholarId
      jobId
      clickTime
      scholarName
      scholarEmail
      jobTitle
      employerName
    }
  }
`

// Query for getting employer clicks
export const GET_EMPLOYER_CLICKS = gql`
  query GetEmployerClicks {
    getEmployerClicks {
      scholarId
      employerId
      employerName
      clickTime
      scholarName
      scholarEmail
    }
  }
`

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
`

// Query for getting job tag rankings
export const GET_JOB_TAG_RANKING = gql`
  query GetJobTagRanking {
    getJobTagRanking {
      tag
      job_count
    }
  }
`

// Query for getting job tag ranking by clicks
export const GET_JOB_TAG_RANKING_BY_CLICKS = gql`
  query GetJobTagRankingByClicks {
    getJobTagRankingByClicks {
      tag
      click_count
    }
  }
`

// Query for getting job location ranking
export const GET_JOB_LOCATION_RANKING = gql`
  query GetJobLocationRanking {
    getJobLocationRanking {
      location
      job_count
    }
  }
`

// Query for getting job deadline ranking by month
export const GET_JOB_DEADLINE_RANKING_BY_MONTH = gql`
  query GetJobDeadlineRankingByMonth {
    getJobDeadlineRankingByMonth {
      month
      job_count
    }
  }
`

// Query for getting scholars ranked by major
export const GET_SCHOLARS_RANKED_BY_MAJOR = gql`
  query GetScholarsRankedByMajor {
    getScholarsRankedByMajor {
      major
      scholar_count
    }
  }
`

// Query for getting scholars ranked by year
export const GET_SCHOLARS_RANKED_BY_YEAR = gql`
  query GetScholarsRankedByYear {
    getScholarsRankedByYear {
      year
      scholar_count
    }
  }
`

// Query for getting the percentage of scholars with allowed notifications
export const GET_PERCENTAGE_OF_SCHOLARS_WITH_ALLOWED_NOTIFICATIONS = gql`
  query GetPercentageOfScholarsWithAllowedNotifications {
    getPercentageOfScholarsWithAllowedNotifications
  }
`

// Query for getting scholar apply clicks ranked
export const GET_SCHOLAR_APPLY_CLICKS_RANKED = gql`
  query GetScholarApplyClicksRanked {
    getScholarApplyClicksRanked {
      scholarId
      apply_count
      scholarName
      scholarEmail
    }
  }
`

// Query for getting scholar job clicks ranked
export const GET_SCHOLAR_JOB_CLICKS_RANKED = gql`
  query GetScholarJobClicksRanked {
    getScholarJobClicksRanked {
      scholarId
      job_count
      scholarName
      scholarEmail
    }
  }
`

// Query for getting scholar employer clicks ranked
export const GET_SCHOLAR_EMPLOYER_CLICKS_RANKED = gql`
  query GetScholarEmployerClicksRanked {
    getScholarEmployerClicksRanked {
      scholarId
      employer_count
      scholarName
      scholarEmail
    }
  }
`

// Query for getting employer job postings ranking
export const GET_EMPLOYER_JOB_POSTINGS_RANKING = gql`
  query GetEmployerJobPostingsRanking {
    getEmployerJobPostingsRanking {
      employerName
      employerId
      job_posting_click_count
    }
  }
`

// Query for getting the number of days since last job post by employer
export const GET_NUM_DAYS_SINCE_LAST_JOB_POST_BY_EMPLOYER = gql`
  query GetNumDaysSinceLastJobPostByEmployer {
    getNumDaysSinceLastJobPostByEmployer {
      employerName
      employerId
      days_since_last_post
    }
  }
`

// Query for getting the most popular job tags by employer
export const GET_MOST_POPULAR_JOB_TAGS_BY_EMPLOYER = gql`
  query GetMostPopularJobTagsByEmployer {
    getMostPopularJobTagsByEmployer {
      employer
      tag
      job_count
    }
  }
`

// Query for getting scholar clicks by school
export const GET_SCHOLAR_CLICKS_BY_SCHOOL = gql`
  query GetScholarClicksBySchool {
    getScholarClicksBySchool {
      school
      scholar_click_count
    }
  }
`

export const GET_ALL_CLICK_COUNTS = gql`
  query GetAllClickCounts {
    getCountJobClicksLastWeek {
      count
    }
    getCountApplyClicksLastWeek {
      count
    }
    getCountEmployerClicksLastWeek {
      count
    }
    getCountJobClicksLastMonth {
      count
    }
    getCountApplyClicksLastMonth {
      count
    }
    getCountEmployerClicksLastMonth {
      count
    }
    getCountJobClicksLastYear {
      count
    }
    getCountApplyClicksLastYear {
      count
    }
    getCountEmployerClicksLastYear {
      count
    }
  }
`

export const GET_JOB_CLICKS_FOR_SCHOLAR = gql`
  query GetJobClicksForScholar($scholarId: Int!) {
    getJobClicksForScholar(scholarId: $scholarId) {
      jobId
      clickTime
      scholarEmail
      scholarName
      jobTitle
      employerName
    }
  }
`

export const GET_APPLY_CLICKS_FOR_SCHOLAR = gql`
  query GetApplyClicksForScholar($scholarId: Int!) {
    getApplyClicksForScholar(scholarId: $scholarId) {
      jobId
      clickTime
      scholarEmail
      scholarName
      jobTitle
      employerName
    }
  }
`

export const GET_EMPLOYER_CLICKS_FOR_SCHOLAR = gql`
  query GetEmployerClicksForScholar($scholarId: Int!) {
    getEmployerClicksForScholar(scholarId: $scholarId) {
      employerId
      clickTime
      scholarEmail
      scholarName
      employerName
    }
  }
`

export const GET_NUMBER_OF_ACTIVE_SCHOLARS = gql`
  query GetNumberOfActiveScholars {
    getNumberOfActiveScholars
  }
`

export const GET_NUMBER_OF_ALLOWED_SCHOLARS = gql`
  query GetNumberOfAllowedScholars {
    getNumberOfAllowedScholars
  }
`

export const GET_CLICKS_CUSTOM_ANALYTICS = gql`
  query GetClicksCustomAnalytics($startDate: Date!, $endDate: Date!, $interval: String!, $clickType: String!) {
    getClicksCustomAnalytics(startDate: $startDate, endDate: $endDate, interval: $interval, clickType: $clickType) {
      date
      count
    }
  }
`

export const GET_ANALYTICS_DASHBOARD_DATA = gql`
  query GetAnalyticsDashboardData($startDate: Date!, $endDate: Date!) {
    jobTagsRankedByJobCount: getJobTagRanking {
      tag
      job_count
    }
    jobLocationsRankedByJobCount: getJobLocationRanking {
      location
      job_count
    }
    jobDeadlinesAsMonthRankedByJobCount: getJobDeadlineRankingByMonth {
      month
      job_count
    }
    daysSinceLastJobPostByEmployer: getNumDaysSinceLastJobPostByEmployer {
      employerName
      days_since_last_post
    }
    scholarsRankedByMajor: getScholarsRankedByMajor {
      major
      scholar_count
    }
    scholarsRankedByYear: getScholarsRankedByYear {
      year
      scholar_count
    }
    numJobPosts: getNumJobPostsWithDateRange(startDate: $startDate, endDate: $endDate)
    numActiveJobs: getNumActiveJobsWithDateRange(startDate: $startDate, endDate: $endDate)
    numActiveScholars: getNumberOfActiveScholars
    numAllowedScholars: getNumberOfAllowedScholars
    jobTagClicks: getJobTagRankingByClicksWithDateRange(startDate: $startDate, endDate: $endDate) {
      tag
      click_count
    }
    employerJobPostingClicks: getEmployerJobPostingsRankingWithDateRange(startDate: $startDate, endDate: $endDate) {
      employerName
      job_posting_click_count
    }
    scholarClicksBySchool: getScholarClicksBySchoolWithDateRange(startDate: $startDate, endDate: $endDate) {
      school
      scholar_click_count
    }
    scholarJobClicks: getScholarJobClicksRankedWithDateRange(startDate: $startDate, endDate: $endDate) {
      scholarName
      job_count
    }
    scholarApplyClicks: getScholarApplyClicksRankedWithDateRange(startDate: $startDate, endDate: $endDate) {
      scholarName
      apply_count
    }
    scholarEmployerClicks: getScholarEmployerClicksRankedWithDateRange(startDate: $startDate, endDate: $endDate) {
      scholarName
      employer_count
    }
    jobClicksDaily: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "daily"
      clickType: "job"
    ) {
      date
      count
    }
    jobClicksWeekly: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "weekly"
      clickType: "job"
    ) {
      date
      count
    }
    jobClicksMonthly: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "monthly"
      clickType: "job"
    ) {
      date
      count
    }
    jobClicksYearly: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "yearly"
      clickType: "job"
    ) {
      date
      count
    }
    applyClicksDaily: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "daily"
      clickType: "apply"
    ) {
      date
      count
    }
    applyClicksWeekly: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "weekly"
      clickType: "apply"
    ) {
      date
      count
    }
    applyClicksMonthly: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "monthly"
      clickType: "apply"
    ) {
      date
      count
    }
    applyClicksYearly: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "yearly"
      clickType: "apply"
    ) {
      date
      count
    }
    employerClicksDaily: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "daily"
      clickType: "employer"
    ) {
      date
      count
    }
    employerClicksWeekly: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "weekly"
      clickType: "employer"
    ) {
      date
      count
    }
    employerClicksMonthly: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "monthly"
      clickType: "employer"
    ) {
      date
      count
    }
    employerClicksYearly: getClicksCustomAnalytics(
      startDate: $startDate
      endDate: $endDate
      interval: "yearly"
      clickType: "employer"
    ) {
      date
      count
    }
  }
`
