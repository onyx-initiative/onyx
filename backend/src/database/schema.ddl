DROP SCHEMA IF EXISTS onyx CASCADE;
CREATE SCHEMA onyx;
SET search_path TO onyx;

CREATE TABLE AllowedAdmins (
    email VARCHAR(50) PRIMARY KEY NOT NULL
);

CREATE TABLE Admin (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL REFERENCES AllowedAdmins,
    password VARCHAR(255) NOT NULL,
    UNIQUE (email)
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
    employer_id INTEGER NOT NULL REFERENCES Employer ON DELETE CASCADE,
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
    job_id INTEGER NOT NULL REFERENCES Job ON DELETE CASCADE,
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

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE OR REPLACE FUNCTION search_jobs_trgm(query VARCHAR(255))
RETURNS TABLE(
    admin_id INTEGER,
    employer_id INTEGER,
    job_id INTEGER,
    name VARCHAR(50),
    title VARCHAR(50),
    description TEXT,
    long_description TEXT,
    contact_email VARCHAR(100),
    job_type VARCHAR(50),
    term VARCHAR(50),
    location VARCHAR(50),
    applicant_year INTEGER[],
    deadline TIMESTAMP,
    date_posted TIMESTAMP,
    total_views INTEGER,
    tags VARCHAR(255)[],
    live BOOLEAN
) AS $$
DECLARE
    employer_match RECORD;
BEGIN
    -- Find the employer with the highest similarity to the search query
    SELECT employer.employer_id, employer.name, similarity(employer.name, query) as sim
    INTO employer_match
    FROM Employer
    WHERE similarity(employer.name, query) > 0.2
    ORDER BY sim DESC
    LIMIT 5;

    RETURN QUERY
    SELECT
        job.admin_id,
        job.employer_id,
        job.job_id,
        employer.name,
        job.title,
        job.description,
        job.long_description,
        job.contact_email,
        job.job_type,
        job.term,
        job.location,
        job.applicant_year,
        job.deadline,
        job.date_posted,
        job.total_views,
        job.tags,
        job.live
    FROM
        Job
    JOIN
        Employer ON job.employer_id = employer.employer_id
    WHERE
        job.live = TRUE AND
        (
            (
                employer_match IS NOT NULL AND
                job.employer_id = employer_match.employer_id
            ) OR
            (
                employer_match IS NULL AND
                (
                    similarity(job.title, query) > 0.6 OR
                    similarity(job.description, query) > 0.6 OR
                    similarity(job.long_description, query) > 0.6 OR
                    similarity(job.job_type, query) > 0.6 OR
                    similarity(job.location, query) > 0.6 OR
                    EXISTS (SELECT 1 FROM unnest(job.tags) AS tag WHERE similarity(tag, query) > 0.6) OR 
                    similarity(
                        array_to_string(
                            ARRAY(SELECT element::text FROM unnest(job.applicant_year) AS element),
                            ' '
                        ),
                        query
                    ) > 0.15
                )
            )
        )
    ORDER BY
        GREATEST(
            similarity(job.title, query),
            similarity(job.description, query),
            similarity(job.long_description, query),
            similarity(job.job_type, query),
            similarity(job.location, query),
            COALESCE((SELECT MAX(similarity(tag, query)) FROM unnest(job.tags) AS tag), 0)
        ) DESC;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION search_jobs_by_criteria(criteria TEXT[])
RETURNS TABLE(
    job_id INTEGER,
    employer_id INTEGER,
    title VARCHAR(50),
    description TEXT,
    long_description TEXT,
    contact_email VARCHAR(100),
    job_type VARCHAR(50),
    term VARCHAR(50),
    location VARCHAR(50),
    applicant_year INTEGER[],
    deadline TIMESTAMP,
    date_posted TIMESTAMP,
    total_views INTEGER,
    tags VARCHAR(255)[],
    live BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        j.job_id,
        j.employer_id,
        j.title,
        j.description,
        j.long_description,
        j.contact_email,
        j.job_type,
        j.term,
        j.location,
        j.applicant_year,
        j.deadline,
        j.date_posted,
        j.total_views,
        j.tags,
        j.live
    FROM
        Job j, Employer
    WHERE
        j.live = TRUE AND 
        j.employer_id = Employer.employer_id
        AND
        (
            Employer.name = ANY(criteria) OR
            j.title = ANY(criteria) OR
            j.description = ANY(criteria) OR
            j.long_description = ANY(criteria) OR
            j.job_type = ANY(criteria) OR
            j.term = ANY(criteria) OR
            j.location = ANY(criteria) OR
            j.tags::TEXT[] @> criteria
        )
    ORDER BY
        j.date_posted DESC;
END;
$$ LANGUAGE plpgsql;
