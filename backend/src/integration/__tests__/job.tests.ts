import { 
    getJobById, 
    getJobsByEmployerId, 
    getJobByFilter, 
    createJob, 
    archiveJob
} from "../mock-data/jobData";
import { gql } from "apollo-server-core";
import createApolloServer from "../../graphql/createApolloServer";

it("Get a job by id", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            query GetJobById($jobId: ID!) {
                getJobById(job_id: $jobId) {
                    job_id
                }
            }
        `,
        variables: getJobById
    });
    expect(res.data?.getJobById.job_id).toEqual(getJobById.jobId);
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
});

// TODO: Fix this test
// it("Get jobs by employer id", async () => {
//     const apolloServer = createApolloServer();

//     const res = await apolloServer.executeOperation({
//         query: gql`
//             query GetJobsByEmployerId($employerId: ID!) {
//                 getJobsByEmployerId(employer_id: $employerId) {
//                     job_id
//                     job_title
//                 }
//             }
//         `,
//         variables: {
//             employerId: "14"
//         }
//     });
//     console.log(res);
//     expect(res.data?.getJobsByEmployerId.job_id).toEqual("5");
//     expect(res.errors).toBeUndefined();
//     apolloServer.stop();
// });

// it("Get jobs by filter", async () => {
//     const apolloServer = createApolloServer();

//     const res = await apolloServer.executeOperation({
//         query: gql`
//             query GetJobByFilter($column: String!, $filter: String!) {
//                 getJobByFilter(column: $column, filter: $filter) {
//                     job_id
//                     job_title
//                 }
//             }
//         `,
//         variables: getJobByFilter
//     });
//     console.log(res);
//     expect(res.data?.getJobsByFilter.job_id).toEqual("5");
//     expect(res.data?.getJobsByFilter.job_title).toEqual("Sample Job");
//     expect(res.errors).toBeUndefined();
//     apolloServer.stop();
// });

it("Create a job, archive it, then delete it", async () => {
    const apolloServer = createApolloServer();

    // Create a sample job
    const create = await apolloServer.executeOperation({
        query: gql`
            mutation CreateJob($employerId: Int!, $jobTitle: String!, $description: String!, $company: String!, $city: String!, $province: String!, $jobSource: String!, $totalViews: Int!, $totalApplications: Int!, $jobType: JobType!, $jobCategory: jobCategory!, $jobSkills: [String!]!, $applicantYear: [String!]!, $salaryRange: String!, $jobLength: Int!, $postDate: String!, $applicationDeadline: String!, $contactEmail: String!, $feature: Boolean!, $additionalInstructions: String!, $howToApply: ApplicationFormat!, $archived: Boolean!) {
                createJob(employer_id: $employerId, job_title: $jobTitle, description: $description, company: $company, city: $city, province: $province, job_source: $jobSource, total_views: $totalViews, total_applications: $totalApplications, job_type: $jobType, job_category: $jobCategory, job_skills: $jobSkills, applicant_year: $applicantYear, salary_range: $salaryRange, job_length: $jobLength, post_date: $postDate, application_deadline: $applicationDeadline, contact_email: $contactEmail, feature: $feature, additional_instructions: $additionalInstructions, how_to_apply: $howToApply, archived: $archived) {
                    job_id
                    job_title
                }
            }
        `,
        variables: createJob
    });
    expect(create.data?.createJob.job_title).toEqual(createJob.jobTitle);
    expect(create.errors).toBeUndefined();

    // Archive the job
    const archive = await apolloServer.executeOperation({
        query: gql`
            mutation ArchiveJob($jobId: ID!) {
                archiveJob(job_id: $jobId)
            }
        `,
        variables: {
            jobId: create.data?.createJob.job_id
        }
    });
    expect(archive.data?.archiveJob).toEqual(true);

    // Delete the job
    const res = await apolloServer.executeOperation({
        query: gql`
            mutation DeleteJob($jobId: ID!) {
                deleteJob(job_id: $jobId)
            }
        `,
        variables: {
            jobId: create.data?.createJob.job_id
        }
    });
    expect(res.data?.deleteJob).toEqual(true);
    apolloServer.stop();
});