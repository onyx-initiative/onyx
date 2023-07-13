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
    logo_url: string;
    student_new_grad_link: string;
}

export type job_type = "Full Time" | "Part Time" | "Internship" | "New Grad";

export type Job = {
    job_id: string;
    employer_id: string;
    admin_id: string;
    title: string;
    description: string;
    long_description: string;
    requirements: string | null;
    experience: string | null;
    education: string | null;
    how_to_apply: string | null;
    additional_info: string | null;
    categories: string | null;
    contact_email: string | null;
    job_type: job_type;
    location: string;
    applicant_year: number[] | null;
    deadline: Date;
    date_posted: Date;
    total_views: number;
    tags: string[];
    live: boolean;
    link: string | null;
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

export enum EditEmployerFields {
    name,
    contact_email,
    address,
    website,
    description,
    student_new_grad_link
}

export type EditJobFields = {
    title?: string;
    description?: string;
    long_description?: string;
    requirements?: string;
    experience?: string;
    education?: string;
    how_to_apply?: string;
    additional_info?: string;
    categories?: string;
    contact_email?: string;
    job_type?: string;
    term?: string;
    location?: string;
    applicant_year?: number[];
    deadline?: string;
    tags?: string[];
    live: boolean;
    link?: string;
}