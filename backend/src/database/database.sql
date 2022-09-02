CREATE DATABASE onyx_jobs;

--\c into onyx_jobs;

-- Sample, not used in development
CREATE TABLE admin (
    admin_id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
);

CREATE TABLE scholar (
    scholar_id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
);

-- Create a table for employers
CREATE TABLE employer (
    employer_id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
);

CREATE TABLE job (
    job_id serial PRIMARY KEY,
    job_title varchar(255) NOT NULL,
    company varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    province varchar(255) NOT NULL,
    job_source varchar(255) NOT NULL,
    total_views integer NOT NULL,
    total_applications integer NOT NULL,
    job_status boolean NOT NULL,
    job_type varchar(255) NOT NULL,
    job_category varchar(255) NOT NULL,
    job_skills [varchar(255)] NOT NULL,
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
    FOREIGN KEY (employer_id) REFERENCES employer (employer_id)
);

