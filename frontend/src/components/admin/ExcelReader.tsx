import React, { useState, ChangeEvent, useEffect } from 'react';
import * as XLSX from "xlsx";
import { BATCH_CREATE_JOBS } from '../../../graphql/mutations/jobMutations';
import { useMutation } from '@apollo/client';
import styles from "../../../styles/components/AdminPageButtons.module.css";

interface ExcelData {
  [key: string]: any;
}

const ExcelReader: React.FC = () => {
  const [data, setData] = useState<ExcelData[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [batch_create_jobs] = useMutation(BATCH_CREATE_JOBS, {
    variables: {
      // @todo: Update with the current admin id
      adminId: "1",
      jobs: formatData(data)
    }
  })

  console.log(data);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const fileContent = evt.target?.result as string;

        // Check if the file is a CSV file
        const isCSV = file.name.endsWith('.csv');

        // Parse the file using SheetJS
        const workbook = XLSX.read(fileContent, {
          type: isCSV ? 'string' : 'binary',
          cellDates: true
        });

        // Get the first worksheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet to JSON
        const jsonData = XLSX.utils.sheet_to_json<ExcelData>(worksheet);
        setData(jsonData);
      };

      // Read the file based on its type
      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    }
  };

  console.log(data);
  return (
    <div className={styles.uploadWrapper}>
      <label htmlFor="file-upload" className="custom-file-upload">
        Add jobs from an Excel or CSV file
      </label>
      <div className={styles.upload}>
        <input id="file-upload" type="file" onChange={handleFileChange} className={styles.uploadButton} />
        {fileName && <p>Selected file: {fileName}</p>}
      </div>
      {/* Show the contents from the csv/excel */}
      {/* <pre>{JSON.stringify(formatData(data), null, 2)}</pre> */}
      <button className={styles.submitButton} onClick={() => {
        batch_create_jobs()
        .then((res) => {
          if (res.data?.batchCreateJobs) {
            alert('Jobs created successfully');
          }
        }).catch((err) => {
          alert('Error creating jobs. Please make sure all employer names are exactly as they appear in the database and check the fields.');
          console.log(err);
        })
      }}
      >
        Create Jobs
      </button>
    </div>
  );
};

export default ExcelReader;

// Helper functions
const formatData = (data: any) => {
  // Convert applicant year and tags to arrays
  data.map((applicant: any) => {
    applicant.applicant_year = applicant.applicant_year ? applicant.applicant_year.toString().split(',').map((year: string) => parseInt(year)) : null;
    typeof applicant.tags === 'string' ? applicant.tags = applicant.tags.split(',').map((tag: string) => tag.trim()) : applicant.tags = applicant.tags;
    
  });
  return data;
}
