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
    adminID SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
);

/*
    Domain for scholar types. Allows scholars to specify
    if they are a current student or alumni.
*/
DROP DOMAIN IF EXISTS scholar_status;
CREATE DOMAIN scholar_status AS VARCHAR(50) CHECK (
    VALUE IN ('current', 'alumni');
);

/*
  Onyx scholars (students)
  Login will likely be done via email
  and handled by the Onyx server
*/
CREATE TABLE Scholar (
    scholarID SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    school VARCHAR(50) NOT NULL,
    major VARCHAR(50) NOT NULL,
    status scholar_status NOT NULL,
);

/*
  Onyx employers
  a single contact email is used for
  all communication with the employer.
  This may be updated in the future if
  more contact information is needed.
*/
CREATE TABLE Employer (
    employerID SERIAL PRIMARY KEY,
    added_by INTEGER NOT NULL REFERENCES Admin,
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
    jobID SERIAL PRIMARY KEY,
    employerID INTEGER NOT NULL REFERENCES Employer,
    added_by INTEGER NOT NULL REFERENCES Admin,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    job_type VARCHAR(50) NOT NULL,
    applicant_year INTEGER NOT NULL,
    deadline datetime NOT NULL,
    total_views INTEGER NOT NULL DEFAULT 0,
);

/*
  All featured jobs on the website
*/
CREATE TABLE Featured (
    jobID INTEGER NOT NULL REFERENCES Job,
    PRIMARY KEY (jobID)
);

/*
  Views based on the scholars preferences
*/
CREATE TABLE FilterView (
    viewID INTEGER NOT NULL,
    scholarID INTEGER NOT NULL REFERENCES Scholar,
    viewName VARCHAR(50) NOT NULL,
    criteria TEXT[] NOT NULL,
    PRIMARY KEY (viewID, scholarID)
);

CREATE TABLE Archive (
    jobID INTEGER NOT NULL REFERENCES Job,
    scholarID INTEGER NOT NULL REFERENCES Scholar,
    PRIMARY KEY (jobID, scholarID)
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
    applicationID SERIAL PRIMARY KEY,
    jobID INTEGER NOT NULL REFERENCES Job,
    scholarID INTEGER NOT NULL REFERENCES Scholar,
    date_applied datetime NOT NULL
);

