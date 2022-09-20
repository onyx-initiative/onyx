// Queries

export const getScholar = {
    "scholarId": "4"
}

export const getScholarByFilter = {
    "column": "city",
    "filter": "Toronto"
}

export const updateScholar = {
        "column": "email",
        "newValue": "mdawes28@gmail.com",
        "scholarId": "4"
}

export const archiveScholar = {
    "scholarId": "4"
}

// Mutations

export const createScholarData = {
    1: {
        "name": "Michael Dawes",
        "email": "michaelanthony.dawes@mail.utoronto.ca",
        "current": true,
        "gradYear": "2024",
        "school": "University of Toronto",
        "major": "Business",
        "city": "Toronto",
        "province": "Ontario",
        "registrationDate": "2022-09-18",
        "notifications": true,
        "skills": ["PowerPoint", "Excel", "Python"]
    }, 
    2: {
        "name": "Cole Purboo",
        "email": "cpurbs@icloud.com",
        "current": true,
        "gradYear": "2024",
        "school": "University of Toronto",
        "major": "Business",
        "city": "Toronto",
        "province": "Ontario",
        "registrationDate": "2022-09-18",
        "notifications": true,
        "skills": ["PowerPoint", "Excel", "Python"]
      }
}
