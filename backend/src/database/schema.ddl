DROP SCHEMA IF EXISTS onyx CASCADE;
CREATE SCHEMA onyx;
SET search_path TO onyx;

CREATE TABLE Admin (
    admin_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

DROP DOMAIN IF EXISTS scholar_status;
CREATE DOMAIN scholar_status AS VARCHAR(50) CHECK (
    VALUE IN ('current', 'alumni')
);

CREATE TABLE Scholar (
    scholar_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    school VARCHAR(50) NOT NULL,
    major VARCHAR(50) NOT NULL,
    status scholar_status NOT NULL,
    notifications BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (name, email)
);

CREATE TABLE Employer (
    employer_id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES Admin,
    name VARCHAR(50) NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    address VARCHAR(50) NOT NULL,
    website VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE Job (
    job_id SERIAL PRIMARY KEY,
    employer_id INTEGER NOT NULL REFERENCES Employer,
    admin_id INTEGER NOT NULL REFERENCES Admin,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    contact_email VARCHAR(100),
    job_type VARCHAR(50) NOT NULL,
    term VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    applicant_year INTEGER[] NOT NULL,
    deadline TIMESTAMP NOT NULL,
    date_posted TIMESTAMP NOT NULL DEFAULT NOW(),
    total_views INTEGER NOT NULL DEFAULT 0,
    tags VARCHAR(255)[] NOT NULL,
    live BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Featured (
    job_id INTEGER NOT NULL REFERENCES Job,
    PRIMARY KEY (job_id)
);

CREATE TABLE FilterView (
    view_id SERIAL NOT NULL,
    scholar_id INTEGER NOT NULL REFERENCES Scholar,
    view_name VARCHAR(50) NOT NULL,
    criteria TEXT[] NOT NULL,
    PRIMARY KEY (view_id, scholar_id)
);

CREATE TABLE Saved (
    job_id INTEGER NOT NULL REFERENCES Job,
    scholar_id INTEGER NOT NULL REFERENCES Scholar,
    PRIMARY KEY (job_id, scholar_id)
);

CREATE TABLE Archive (
    job_id INTEGER NOT NULL REFERENCES Job,
    scholar_id INTEGER NOT NULL REFERENCES Scholar,
    PRIMARY KEY (job_id, scholar_id)
);

CREATE TABLE Application (
    application_id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES Job,
    scholar_id INTEGER NOT NULL REFERENCES Scholar,
    date_applied TIMESTAMP NOT NULL
);

DROP VIEW IF EXISTS job_search;
CREATE VIEW job_search AS
SELECT to_tsvector(
    name || ' ' 
    || title || ' ' 
    || job.description || ' ' 
    || COALESCE(long_description, ' ') || ' ' 
    || job_type || ' ' 
    || term || ' ' 
    || location || ' ' 
    || array_to_string(tags, ' ')) AS document, job_id
FROM Job JOIN Employer ON Job.employer_id = Employer.employer_id
WHERE live = TRUE;
