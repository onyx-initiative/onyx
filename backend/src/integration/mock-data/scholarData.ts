// Queries

export const getScholar = {
    "scholarId": "4"
}

export const getScholarByFilter = {
    "column": "email",
    "filter": "thisisnotarealemailpurelyfortesting@ihopenoonecopies.com"
}

// Mutations

export const createScholar = {
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
}

export const sampleScholar ={
    "name": "Sample Guy",
    "email": "thisisnotarealemailpurelyfortesting@ihopenoonecopies.com",
    "current": true,
    "gradYear": "2080",
    "school": "University of the Metaverse",
    "major": "Metaverse",
    "city": "Metaverse",
    "province": "Internet",
    "registrationDate": "2022-09-18",
    "notifications": true,
    "skills": ["Blender", "C++", "Python"]
}

export const updateScholar = {
    "column": "email",
    "newValue": "michaelanthony.dawes@mail.utoronto.ca",
    "scholarId": "4"
}