
// Queries

export const getRelevantJobs = {
    "scholarId": "4",
    "viewId": ["3", "1"]
}

export const getScholarViews = {
    "scholarId": "4"
}

// Mutations

export const createView = {
    "scholarId": 4,
    "viewName": "Test View",
    "criteria": ["INTERNSHIP", "SOFTWARE"]
}

export const addViewCriteria = {
    "viewId": "3",
    "criteria": ["High Paying", "Startup"]
}