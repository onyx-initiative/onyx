import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Checkbox,
  Select,
  MultiSelect,
  Button,
  TextInput,
  Textarea,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import styles from "../styles/components/AddJobForm.module.css";
import BackButton from "../src/components/admin/BackButton";
import { CREATE_JOB } from "../graphql/mutations/jobMutations";
import {
  GET_EMPLOYERS,
  GET_EMPLOYER_BY_NAME,
} from "../../frontend/graphql/queries/employerQueries";
import { job_type, Employer } from "../../backend/src/types/db.types";

type JobInfo = {
  employerId: string;
  adminId: string;
  title: string;
  description: string;
  longDescription: string;
  requirements: string;
  experience: string;
  education: string;
  howToApply: string;
  additionalInfo: string | null;
  contactEmail: string;
  jobType: string;
  term: string;
  location: string;
  applicantYear: number[];
  deadline: string | null;
  tags: string[];
  link: string;
  live?: boolean;
};

export default function AddJob() {
  const router = useRouter();

  // Job state
  const [jobInfo, setJobInfo] = useState<JobInfo>({
    employerId: "",
    adminId: "1",
    title: "",
    description: "",
    longDescription: "",
    requirements: "",
    experience: "",
    education: "",
    howToApply: "",
    additionalInfo: null,
    contactEmail: "",
    jobType: "",
    term: "",
    location: "",
    applicantYear: [],
    deadline: "",
    tags: [],
    link: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<{ [K in keyof JobInfo]?: string }>({});
  const [formError, setFormError] = useState<string>("");

  // GraphQL hooks
  const [createJob, { loading: submitting }] = useMutation(CREATE_JOB);
  const { data: employerData, loading: employerLoading } =
    useQuery(GET_EMPLOYERS);
  const { loading: employerIdLoading, data: employerIdData } = useQuery(
    GET_EMPLOYER_BY_NAME,
    {
      variables: { name: jobInfo.employerId },
      skip: !jobInfo.employerId,
    },
  );

  // Employer dropdown data
  const [empData, setEmpData] = useState<Employer[]>([]);

  useEffect(() => {
    if (!employerLoading) {
      setEmpData(employerData?.getEmployers || []);
    }
  }, [employerData, employerLoading]);

  // Real-time validation
  const validateField = (name: keyof JobInfo, value: any) => {
    let message = "";
    if (
      [
        "title",
        "description",
        "jobType",
        "location",
        "longDescription",
      ].includes(name) &&
      !value?.trim()
    ) {
      message = `${name} is required.`;
    }
    if (name === "deadline" && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      message = "Deadline must be in YYYY-MM-DD format.";
    }
    if (
      name === "contactEmail" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      message = "Invalid email format.";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (name: keyof JobInfo, value: any) => {
    const safeValue =
      typeof value === "string" ? value.replace(/[<>]/g, "") : value; // basic sanitization
    setJobInfo((prev) => ({ ...prev, [name]: safeValue }));
    validateField(name, safeValue);
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      Object.values(errors).every((err) => !err) &&
      ["title", "description", "jobType", "location", "longDescription"].every(
        (field) => jobInfo[field as keyof JobInfo]?.toString().trim() !== "",
      )
    );
  };

  // Submit
  const handleSubmit = async () => {
    setFormError("");
    try {
      await createJob({
        variables: {
          ...jobInfo,
          deadline: jobInfo.deadline || "2100-01-01",
          live: true,
        },
      });
      router.push("/Admin");
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || "An unexpected error occurred.");
    }
  };

  const sortedTagData = [
    "Technology",
    "Business",
    "Marketing",
    "Engineering",
    "Finance",
    "HR",
    "IT",
    "Research",
    "Sales",
    "Security",
    "Accounting",
    "Administration",
    "Automotive",
    "Arts&Entertainment",
    "Communication",
    "Design",
    "Gaming",
    "Healthcare",
    "Mathematics",
    "Telecommunications",
    "Default",
  ]
    .map((tag) => ({ value: tag, label: tag }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const current_year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <BackButton />
        <Image
          src="https://onyxinitiative.org/assets/img/onyxlogo_nav.png"
          alt="Onyx Logo"
          width={250}
          height={100}
        />
      </div>
      <div className={styles.formContainer}>
        <h1>Create a Job!</h1>

        {formError && (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
            {formError}
          </Alert>
        )}

        <TextInput
          label="Title"
          value={jobInfo.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
        />

        <Select
          label="Employer Name"
          placeholder="Pick one"
          searchable
          data={empData.map((e) => ({
            value: e.employer_id.toString(),
            label: e.name,
          }))}
          onChange={(val) => handleChange("employerId", val)}
        />

        <TextInput
          label="Location"
          value={jobInfo.location}
          onChange={(e) => handleChange("location", e.target.value)}
          error={errors.location}
        />

        <MultiSelect
          label="Applicant Year"
          data={Array.from({ length: 8 }, (_, i) => `${current_year - 3 + i}`)}
          onChange={(vals) =>
            handleChange(
              "applicantYear",
              vals.map((v) => parseInt(v)),
            )
          }
        />

        <TextInput
          label="Deadline"
          value={jobInfo.deadline || ""}
          onChange={(e) => handleChange("deadline", e.target.value)}
          error={errors.deadline}
        />

        <Textarea
          label="Description"
          value={jobInfo.description}
          onChange={(e) => handleChange("description", e.target.value)}
          error={errors.description}
        />

        <Textarea
          label="Long Description"
          value={jobInfo.longDescription}
          onChange={(e) => handleChange("longDescription", e.target.value)}
          error={errors.longDescription}
        />

        <Textarea
          label="Responsibilities & Requirements"
          value={jobInfo.requirements}
          onChange={(e) => handleChange("requirements", e.target.value)}
        />

        <TextInput
          label="Contact Email"
          value={jobInfo.contactEmail}
          onChange={(e) => handleChange("contactEmail", e.target.value)}
          error={errors.contactEmail}
        />

        <TextInput
          label="Link"
          value={jobInfo.link}
          onChange={(e) => handleChange("link", e.target.value)}
        />

        <Textarea
          label="How to Apply"
          value={jobInfo.howToApply}
          onChange={(e) => handleChange("howToApply", e.target.value)}
        />

        <Select
          label="Job Type"
          data={["Full Time", "Part Time", "Internship", "New Grad"]}
          onChange={(val) => handleChange("jobType", val)}
          error={errors.jobType}
        />

        <TextInput
          label="Term"
          value={jobInfo.term}
          onChange={(e) => handleChange("term", e.target.value)}
        />

        <MultiSelect
          label="Tags"
          data={sortedTagData}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            return item;
          }}
          onChange={(vals) => handleChange("tags", vals)}
        />

        <Checkbox
          label="Save to Drafts?"
          checked={!jobInfo["live"]}
          onChange={(e) =>
            handleChange("live" as any, !e.currentTarget.checked)
          }
        />

        <Button
          color="dark"
          onClick={handleSubmit}
          disabled={!isFormValid() || submitting}
          loading={submitting}
        >
          Create Job
        </Button>
      </div>
    </div>
  );
}
