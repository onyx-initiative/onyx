import { gql } from '@apollo/client';
// Mutation for logging a job click
export const LOG_JOB_CLICK = gql`
    mutation LogJobClick($scholarId: Int!, $jobId: Int!) {
        logJobClick(scholarId: $scholarId, jobId: $jobId) {
            employerId
            jobId
            jobTitle
            employerName
            clickTime
        }
    }
`;

// Mutation for logging an employer click
export const LOG_EMPLOYER_CLICK = gql`
    mutation LogEmployerClick($scholarId: Int!, $employerId: Int!) {
        logEmployerClick(scholarId: $scholarId, employerId: $employerId) {
            scholarId
            employerId
            clickTime
        }
    }
`;

// Mutation for logging an apply click
export const LOG_APPLY_CLICK = gql`
    mutation LogApplyClick($scholarId: Int!, $jobId: Int!) {
        logApplyClick(scholarId: $scholarId, jobId: $jobId) {
            scholarId
            jobId
            clickTime
        }
    }
`;