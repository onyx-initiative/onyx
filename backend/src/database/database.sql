CREATE DATABASE onyx_jobs;

--\c into onyx_jobs;

-- Sample, not used in development
CREATE TABLE scholar (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
);