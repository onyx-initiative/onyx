import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/components/AddJobForm.module.css";


export default function AddJob() {
    const { register, handleSubmit } = useForm();


    const onSubmit = function(data: any) {
        console.log(JSON.stringify(data))
    }

    return (
      <form className={styles.addJobForm} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Company Name" className={styles.textinput} {...register("Company Name")} />
        <input placeholder="Position" className={styles.textinput} {...register("Position")} />
        <input placeholder="Location"  className={styles.textinput} {...register("Location")} />
        <input placeholder="Company Name" className={styles.textinput} {...register("Description")} />
        <select  placeholder="Category"  className={styles.textinput} {...register("Category")}>
            <option value="Scotiabank">Finance</option>
            <option value="RBC">Consulting</option>
            <option value="other">Investment Banking</option>
            <option value="other">Human Resources</option>
            <option value="other">Business Analyst</option>
        </select>
        <input type="submit" className={styles.submitButton} />
      </form>
    )
  }