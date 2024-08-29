import { gql } from 'apollo-server-lambda'

export const analyticsTypeDefs = gql`
  type Query {
    getJobClicks: [JobClick]
    getApplyClicks: [ApplyClicks]
    getEmployerClicks: [EmployerClick]
    getJobClicksRanked: [RankedJobClick]
    getEmployerClicksRanked: [RankedEmployerClick]
    getJobTagRanking: [JobTagRanking]
    getJobTagRankingByClicks: [JobTagRankingByClick]
    getJobLocationRanking: [JobLocationRanking]
    getJobDeadlineRankingByMonth: [JobDeadlineRanking]
    getScholarsRankedByMajor: [MajorRanking]
    getScholarsRankedByYear: [YearRanking]
    getPercentageOfScholarsWithAllowedNotifications: Int
    getScholarApplyClicksRanked: [ApplyClickRank]
    getScholarJobClicksRanked: [JobClickRank]
    getScholarEmployerClicksRanked: [EmployerClickRank]
    getJobClicksRankedByApply: [RankedJobClick]
    getScholarClicksBySchool: [ScholarClicksBySchool]
    getEmployerJobPostingsRanking: [EmployerJobPostingRank]
    getNumDaysSinceLastJobPostByEmployer: [EmployerLastJobPost]
    getMostPopularJobTagsByEmployer: [EmployerJobTagRanking]
    getJobClicksForScholar(scholarId: Int): [ScholarJobClicks]
    getApplyClicksForScholar(scholarId: Int): [ScholarApplyClicks]
    getEmployerClicksForScholar(scholarId: Int): [ScholarEmployerClicks]
    getCountJobClicksLastWeek: ClickCount
    getCountApplyClicksLastWeek: ClickCount
    getCountEmployerClicksLastWeek: ClickCount
    getCountJobClicksLastMonth: ClickCount
    getCountApplyClicksLastMonth: ClickCount
    getCountEmployerClicksLastMonth: ClickCount
    getCountJobClicksLastYear: ClickCount
    getCountApplyClicksLastYear: ClickCount
    getCountEmployerClicksLastYear: ClickCount
    getNumberOfActiveScholars: Int
    getNumberOfAllowedScholars: Int
    getClicksCustomAnalytics(startDate: Date, endDate: Date, interval: String, clickType: String): [CustomAnalytics]
  }

  type Mutation {
    logJobClick(scholarId: Int!, jobId: Int!): JobClick
    logEmployerClick(scholarId: Int!, employerId: Int!): EmployerClick
    logApplyClick(scholarId: Int!, jobId: Int!): ApplyClick
  }

  type CustomAnalytics {
    date: Date
    count: Int
  }

  type ScholarJobClicks {
    jobId: Int
    clickTime: String
    scholarEmail: String
    scholarName: String
    jobTitle: String
    employerName: String
  }

  type ScholarApplyClicks {
    jobId: Int
    clickTime: String
    scholarEmail: String
    scholarName: String
    jobTitle: String
    employerName: String
  }

  type ScholarEmployerClicks {
    employerId: Int
    clickTime: String
    scholarEmail: String
    scholarName: String
    employerName: String
  }

  type ClickCount {
    count: Int
  }

  type JobClicksLastWeek {
    scholarId: Int
    jobId: Int
    clickTime: String
    scholarEmail: String
    scholarName: String
    jobTitle: String
    employerName: String
  }

  type ScholarJobClicks {
    scholarId: Int
    jobId: Int
    clickTime: String
    scholarEmail: String
    scholarName: String
    jobTitle: String
    employerName: String
  }

  type ScholarApplyClicks {
    scholarId: Int
    jobId: Int
    clickTime: String
    scholarEmail: String
    scholarName: String
    jobTitle: String
    employerName: String
  }

  type ScholarEmployerClicks {
    scholarId: Int
    employerId: Int
    clickTime: String
    scholarEmail: String
    scholarName: String
    employerName: String
  }

  type ApplyClicks {
    scholarId: Int
    jobId: Int
    clickTime: String
    scholarEmail: String
    scholarName: String
    jobTitle: String
    employerName: String
  }

  type ApplyClick {
    scholarId: Int
    jobId: Int
    clickTime: String
  }

  type EmployerJobTagRanking {
    employer: String
    tag: String
    job_count: Int
  }

  type EmployerJobPostingRank {
    employerName: String
    employerId: String
    job_posting_click_count: Int
  }

  type EmployerLastJobPost {
    employerName: String
    employerId: String
    days_since_last_post: Int
  }

  scalar Date

  type MajorRanking {
    major: String
    scholar_count: Int
  }

  type ScholarClicksBySchool {
    school: String
    scholar_click_count: Int
  }

  type YearRanking {
    year: Int
    scholar_count: Int
  }

  type JobApplyClickRank {
    jobId: Int
    apply_count: Int
  }

  type ApplyClickRank {
    scholarId: Int
    apply_count: Int
    scholarName: String
    scholarEmail: String
  }

  type JobClickRank {
    scholarId: Int
    job_count: Int
    scholarName: String
    scholarEmail: String
  }

  type EmployerClickRank {
    scholarId: Int
    employer_count: Int
    scholarName: String
    scholarEmail: String
  }

  type JobClick {
    employerId: Int
    jobId: Int
    jobTitle: String
    employerName: String
    clickTime: String
    scholarName: String
    scholarEmail: String
  }

  type RankedJobClick {
    employerId: Int
    jobId: Int
    jobTitle: String
    employerName: String
    click_count: Int
  }

  type RankedEmployerClick {
    employerId: Int
    employerName: String
    click_count: Int
  }

  type ApplyClick {
    scholarId: Int
    jobId: Int
    clickTime: String
  }

  type JobTagRanking {
    tag: String
    job_count: Int
  }

  type JobTagRankingByClick {
    tag: String
    click_count: Int
  }

  type JobLocationRanking {
    location: String
    job_count: Int
  }

  type JobDeadlineRanking {
    month: String
    job_count: Int
  }

  type EmployerClick {
    scholarId: Int
    employerId: Int
    employerName: String
    clickTime: String
    scholarName: String
    scholarEmail: String
  }
`
