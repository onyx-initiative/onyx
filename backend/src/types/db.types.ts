type View = {
    id: number;
    viewName: string;
    filters: Filter[];
}

type Filter = {
    id: number;
    industryFilter?: "finance" | "consulting" | "technology" | "design" | "other"; // Others?
    ProvinceFilter?: "AB" | "BC" | "MB" | "NB" | "NL" | "NS" | "NT" | "NU" | "ON" | "PE" | "QC" | "SK" | "YT";
    CityFilter?: string; // This will be based on current cities in the database
    yearFilter?: "freshman" | "sophomore" | "junior" | "senior" | "other";
    durationFilter?: "4 months" | "6 months" | "8 months" | "12 months" | "part-time" | "full-time" | "other";
}

type Scholar = {
    id: number;
    name: string;
    email: string;
    jobApplications: string[];
    workHistory?: string[]; // May remove
    status: "current" | "alumni" | "new graduate" | "intern"; 
    views: View[]; // The specific sets of filters the specific scholar has saved
    profilePicture?: string;
    year: string;
    school: string;
    major: string;
    city: string;
    province: string;
    registrationDate: string; // Used to archive them following 2 year alum period
    skills: string[]; // Specific skills/interests the scholar has
    notifications: boolean; // True if enabled, false if disabled
}

type Admin = {
    id: number;
    name: string;
    email: string;
}

type Job = {
    jobTitle: string;
    jobDescription: string;
    company: string; // This would be a relation in the database and point to a company object
    city: string;
    province: string;
    jobSource: string; // where the job came from (ie. initially website and later (p1/p2) linkedin, etc.)
    totalViews: number; // total number of views the job has received (p1/p2)
    totalApplications: number; // total number of applications the job has received
    jobStatus: boolean; // true if the job is still accepting applications, closed if not
    jobType: "full time" | "part time" | "contract" | "internship"; 
    jobCategory: "software" | "hardware" | "design" | "marketing" | "business" | "other"; // Can add more as they come up
    jobSkills: string[]; // Specific skills/interests the job has
    salaryRange: string; // salary range (ie. $10,000 - $15,000) - prorated based on job lengther
    jobLength: number; // job length in number of months
    postDate: string; 
    applicationDeadline: string;
    description: string; 
    contactEmail: string;
    feature: boolean; // True if featured on the landing page, false if not
    additionalInstructions?: string; 
    howToApply?: "email" | "link" | "form"; // Others can be added as they come up
    archived: boolean; // True if archived, false if not
}

type Employer = {
    id: number;
    name: string;
    logo: string;
    city: string;
    province: string;
    websiteUrl: string;
    description: string;
    availableJobs: Job[];

    // P1+
    videos?: string[]; // Videos that showcase the company
}