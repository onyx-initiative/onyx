DROP SCHEMA IF EXISTS onyx CASCADE;
CREATE SCHEMA onyx;
SET search_path TO onyx;

/*
  Job board administrators
  Login will likely be done via email
  and handled by the Onyx server. There
  will be an additional server check they
  are in this table.
*/
CREATE TABLE Admin (
    admin_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

/*
  Domain for scholar types. Allows scholars to specify
  if they are a current student or alumni.
*/
DROP DOMAIN IF EXISTS scholar_status;
CREATE DOMAIN scholar_status AS VARCHAR(50) CHECK (
    VALUE IN ('current', 'alumni')
);

/*
  Onyx scholars (students)
  Login will likely be done via email
  and handled by the Onyx server
*/
CREATE TABLE Scholar (
    scholar_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    school VARCHAR(50) NOT NULL,
    major VARCHAR(50) NOT NULL,
    status scholar_status NOT NULL,
    notifications BOOLEAN NOT NULL DEFAULT FALSE
);

/*
  Onyx employers
  a single contact email is used for
  all communication with the employer.
  This may be updated in the future if
  more contact information is needed.
*/
CREATE TABLE Employer (
    employer_id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES Admin,
    name VARCHAR(50) NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    address VARCHAR(50) NOT NULL,
    website VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

/*
  Onyx job postings
  Each job posting is associated with
  a single employer. The employerID
  is a foreign key to the Employer table.
*/
CREATE TABLE Job (
    job_id SERIAL PRIMARY KEY,
    employer_id INTEGER NOT NULL REFERENCES Employer,
    admin_id INTEGER NOT NULL REFERENCES Admin,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    job_type VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    applicant_year INTEGER[] NOT NULL,
    deadline TIMESTAMP NOT NULL,
    total_views INTEGER NOT NULL DEFAULT 0,
    tags TEXT[] NOT NULL
);

/*
  All featured jobs on the website
*/
CREATE TABLE Featured (
    job_id INTEGER NOT NULL REFERENCES Job,
    PRIMARY KEY (job_id)
);

/*
  Views based on the scholars preferences
*/
CREATE TABLE FilterView (
    view_id INTEGER NOT NULL,
    scholar_id INTEGER NOT NULL REFERENCES Scholar,
    view_name VARCHAR(50) NOT NULL,
    criteria TEXT[] NOT NULL,
    PRIMARY KEY (view_id, scholar_id)
);

CREATE TABLE Archive (
    job_id INTEGER NOT NULL REFERENCES Job,
    scholar_id INTEGER NOT NULL REFERENCES Scholar,
    PRIMARY KEY (job_id, scholar_id)
);

/*
  Onyx job applications
  Each job application is associated with
  a single job posting. The jobID is a
  foreign key to the Job table. Each
  application is also associated with a
  single scholar. The scholarID is a
  foreign key to the Scholar table.
*/
CREATE TABLE Application (
    application_id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES Job,
    scholar_id INTEGER NOT NULL REFERENCES Scholar,
    date_applied TIMESTAMP NOT NULL
);

