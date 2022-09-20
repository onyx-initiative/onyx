// Queries

export const getJobById = {
    "jobId": "5"
}

export const getJobsByEmployerId ={
    "employerId": "14"
}

export const getJobByFilter = {
    "column": "job_title",
    "filter": "Sample Job"
}
// Mutations

export const createJob = {
    "employerId": 14,
    "jobTitle": "Business Analyst",
    "description": "As a business analyst, you'll work to make business decisions",
    "company": "Sample Company",
    "city": "Montreal",
    "province": "Quebec",
    "jobSource": "Website",
    "totalViews": 0,
    "totalApplications": 0,
    "jobType": "INTERNSHIP",
    "jobCategory": "BUSINESS",
    "jobSkills": ["PowerPoint", "Excel", "PowerBI", "Tableau", "Communication"],
    "applicantYear": ["2023", "2024"],
    "salaryRange": "80K",
    "jobLength": 4,
    "postDate": Date(), // Fix
    "applicationDeadline": Date(), // Fix
    "contactEmail": "recruiter@sample.com",
    "feature": true,
    "additionalInstructions": "Please reach out if you have any questions!",
    "howToApply": "LINK",
    "archived": false
}

export const archiveJob = {
    "jobId": "5"
}

export const increment = {
    "jobId": "5"
}