import {gql} from "apollo-server-lambda";

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
    }

    type Mutation {
    logJobClick(scholarId: Int!, jobId: Int!): JobClick
    logEmployerClick(scholarId: Int!, employerId: Int!): EmployerClick
    logApplyClick(scholarId: Int!, jobId: Int!): ApplyClick
    }

    type ApplyClicks {
        scholarId: Int
        jobId: Int
        clickTime: String
        scholarEmail: String
        scholarName: String
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
    }
`