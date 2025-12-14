CREATE OR REPLACE FUNCTION search_archived_jobs_trgm(query VARCHAR(255))
RETURNS TABLE(
    admin_id INTEGER,
    employer_id INTEGER,
    job_id INTEGER,
    name VARCHAR(50),
    title VARCHAR(255),
    description TEXT,
    long_description TEXT,
    requirements TEXT,
    experience TEXT,
    education TEXT,
    how_to_apply TEXT,
    additional_info TEXT,
    categories VARCHAR(255),
    contact_email VARCHAR(100),
    job_type VARCHAR(50),
    term VARCHAR(50),
    location VARCHAR(255),
    applicant_year INTEGER[],
    deadline TIMESTAMP,
    date_posted TIMESTAMP,
    total_views INTEGER,
    tags VARCHAR(255)[],
    live BOOLEAN,
    link TEXT
) AS $$
DECLARE
    employer_match RECORD;
BEGIN
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
        job.requirements,
        job.experience,
        job.education,
        job.how_to_apply,
        job.additional_info,
        job.categories,
        job.contact_email,
        job.job_type,
        job.term,
        job.location,
        job.applicant_year,
        job.deadline,
        job.date_posted,
        job.total_views,
        job.tags,
        job.live,
        job.link
    FROM
        Job
    JOIN
        Employer ON job.employer_id = employer.employer_id
    INNER JOIN
        Archive ON job.job_id = Archive.job_id
    WHERE
        (
            (
                employer_match IS NOT NULL AND
                job.employer_id = employer_match.employer_id
            ) OR
            (
                employer_match IS NULL AND
                (
                    similarity(job.title, query) > 0.45 OR
                    similarity(job.description, query) > 0.45 OR
                    similarity(job.long_description, query) > 0.45 OR
                    similarity(job.job_type, query) > 0.45 OR
                    similarity(job.location, query) > 0.45 OR
                    EXISTS (SELECT 1 FROM unnest(job.tags) AS tag WHERE similarity(tag, query) > 0.45) OR 
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
