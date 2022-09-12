-- Onyx Jobs Schema

CREATE TYPE scholar_status AS ENUM('current', 'alumni', 'new graduate', 'intern');

Sample, not used in development
CREATE TABLE admin (
    admin_id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

Create a table for employers
CREATE TABLE employer (
    employer_id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    logo BYTEA NOT NULL,
    city varchar(255) NOT NULL,
    province varchar(255) NOT NULL,
    websiteUrl varchar(255) NOT NULL,
    description varchar(255) NOT NULL
    -- May not need
    -- FOREIGN KEY (job_id) REFERENCES job(job_id)
);

CREATE TABLE job (
    job_id serial PRIMARY KEY,
    employer_id integer NOT NULL,
    job_title varchar(255) NOT NULL,
    company varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    province varchar(255) NOT NULL,
    job_source varchar(255) NOT NULL,
    total_views integer NOT NULL,
    total_applications integer NOT NULL,
    job_status boolean NOT NULL,
    job_type varchar(255) NOT NULL,
    job_industry varchar(255) NOT NULL,
    job_category varchar(255) NOT NULL,
    job_skills varchar(255)[] NOT NULL,
    applicant_year varchar(255) NOT NULL,
    salary_range varchar(255) NOT NULL,
    job_length varchar(255) NOT NULL,
    description text NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    application_deadline timestamp NOT NULL,
    contact_email varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    festure boolean NOT NULL,
    additional_info text,
    how_to_apply varchar(255) NOT NULL,
    archived boolean NOT NULL,
    FOREIGN KEY (employer_id) REFERENCES employer(employer_id)
);

CREATE TABLE filterView (
    view_id serial PRIMARY KEY,
    job_id integer NOT NULL,
    scholar_id integer NOT NULL,
    employer_id integer NOT NULL,
    view_name varchar(255) NOT NULL,
    FOREIGN KEY (job_id) REFERENCES job (job_id),
    -- FOREIGN KEY (scholar_id) REFERENCES scholar (scholar_id),
    FOREIGN KEY (employer_id) REFERENCES employer (employer_id)
);

CREATE TABLE scholar (
    scholar_id serial PRIMARY KEY,
    job_id integer NOT NULL,
    view_id integer NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    year varchar(255) NOT NULL,
    school varchar(255) NOT NULL,
    major varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    province varchar(255) NOT NULL,
    registrationDate timestamp NOT NULL,
    skills varchar(255)[] NOT NULL,
    jobApplications varchar(255)[] NOT NULL,
    workHistory varchar(255)[],
    scholar_status scholar_status NOT NULL,
    FOREIGN KEY (job_id) REFERENCES job(job_id),
    FOREIGN KEY (view_id) REFERENCES filterView(view_id),
    notifications boolean NOT NULL
);




