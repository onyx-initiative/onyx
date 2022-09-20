
// Queries

export const getRelevantJobs = {
    "scholarId": "4",
    "viewId": ["3", "1"]
}

export const getScholarViews = {
    "scholarId": "4"
}

// Mutations

export const createViewData = {
    "scholarId": 4,
    "viewName": "Internships",
    "criteria": "INTERNSHIP"
}

export const addViewCriteria = {
    "viewId": "3",
    "criteria": "SOFTWARE"
}

export const removeCriteria = {
    "viewId": "3",
    "criteria": "BUSINESS"
}

export const deleteView = {
    "viewId": "3"
}