import React, { useState, ChangeEvent } from "react";
import { UPLOAD_ALLOWED_SCHOLARS } from "../../../graphql/mutations/scholarMutations";
import { useMutation } from "@apollo/client";
import styles from "../../../styles/components/AdminPageButtons.module.css";
import { notifications } from "@mantine/notifications";

interface ScholarInput {
  firstName: string;
  lastName: string;
  email: string;
}

const UploadAllowedScholars: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");
  const [scholars, setScholars] = useState<ScholarInput[]>([]);

  const [uploadAllowedScholars, { loading }] = useMutation(
    UPLOAD_ALLOWED_SCHOLARS,
    {
      onCompleted: (data) => {
        if (data.uploadAllowedScholars.success) {
          const result = data.uploadAllowedScholars;

          notifications.show({
            title: "Success!",
            message: result.message,
            color: "green",
            autoClose: 8000,
          });

          // Clear the file input
          setFileName("");
          setScholars([]);

          // Reset the file input element
          const fileInput = document.getElementById(
            "scholar-file-upload",
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
        } else {
          notifications.show({
            title: "Error",
            message: data.uploadAllowedScholars.message,
            color: "red",
            autoClose: 10000,
          });
        }
      },
      onError: (error) => {
        notifications.show({
          title: "Error",
          message: `Failed to upload scholars: ${error.message}`,
          color: "red",
          autoClose: 10000,
        });
      },
    },
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const fileContent = evt.target?.result as string;

        // Parse CSV: column 0 = First Name, column 1 = Last Name, column 2 = Email
        const lines = fileContent.split("\n").filter((line) => line.trim());
        const extractedScholars: ScholarInput[] = [];

        // Skip header row (index 0) and process data rows
        for (let i = 1; i < lines.length; i++) {
          const columns = lines[i].split(",");
          if (columns.length >= 3) {
            const firstName = columns[0].trim();
            const lastName = columns[1].trim();
            const email = columns[2].trim();

            if (email && email.includes("@") && firstName && lastName) {
              extractedScholars.push({ firstName, lastName, email });
            }
          }
        }

        console.log(`Extracted ${extractedScholars.length} scholars from CSV`);
        console.log("First few scholars:", extractedScholars.slice(0, 3));
        setScholars(extractedScholars);
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = () => {
    console.log("Upload clicked, scholars count:", scholars.length);

    if (!scholars || scholars.length === 0) {
      notifications.show({
        title: "No file selected",
        message: "Please select a CSV file first",
        color: "red",
      });
      return;
    }

    console.log("Calling mutation with scholars:", scholars.slice(0, 3));
    uploadAllowedScholars({
      variables: {
        scholars: scholars,
      },
    });
  };

  return (
    <div className={styles.uploadWrapper}>
      <label htmlFor="scholar-file-upload" className="custom-file-upload">
        Upload Allowed Scholars CSV
      </label>
      <div className={styles.upload}>
        <input
          id="scholar-file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className={styles.uploadButton}
        />
        {fileName && <p>Selected file: {fileName}</p>}
      </div>
      <button
        className={styles.submitButton}
        onClick={handleUpload}
        disabled={loading || scholars.length === 0}
      >
        {loading ? "Uploading..." : "Upload Scholars"}
      </button>
    </div>
  );
};

export default UploadAllowedScholars;
