/*
  This file contains typescript types that represent the database schema.
  This is meant to make it easier to work with the database and to ensure
  that the database is consistent. Additionally, it will make it easier
  to migrate to a different database in the future if needed.
*/

// @todo: Update this to use the new database schema

export type Admin = {
    admin_id: string;
    name: string;
    email: string;
}

export type scholar_status = "current" | "alumni";

export type Scholar = {
    scholar_id: string;
    name: string;
    email: string;
    year: number;
    school: string;
    major: string;
    status: scholar_status;
    notifications: boolean;
}

export type Employer = {
    employer_id: string;
    admin_id: string;
    name: string;
    contact_email: string;
    address: string;
    website: string;
    description: string;
}

export type job_type = "Full Time" | "Part Time" | "Internship" | "New Grad";

export type Job = {
    job_id: string;
    employer_id: string;
    admin_id: string;
    title: string;
    description: string;
    job_type: job_type;
    location: string;
    applicant_year: number[];
    deadline: Date;
    date_posted: Date;
    total_views: number;
    tags: string[];
    live: boolean;
}

export type Featured = {
    job_id: string;
}

export type FilterView = {
    view_id: string;
    scholar_id: string;
    view_name: string;
    criteria: string[];
}

export type Archived = {
    job_id: string;
    scholar_id: string;
}