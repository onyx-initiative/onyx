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
        <input className={styles.textinput} {...register("Company Name")} />
        <input {...register("Position")} />
        <input {...register("Location")} />
        <input {...register("Description")} />
        <input {...register("Province")} />
        <select {...register("Category")}>
            <option value="Scotiabank">Scotiabank</option>
            <option value="RBC">RBC</option>
            <option value="other">other</option>
            <option value="other">other</option>
            <option value="other">other</option>
        </select>
        <input type="submit" />
      </form>
    )
  }