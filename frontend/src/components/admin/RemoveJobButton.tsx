import React from "react";
import styles from "../../../styles/components/AdminPageButtons.module.css";
import Link from "next/link";
import { DELETE_JOB } from "../../../graphql/mutations/jobMutations";

export default function RemoveJobButton() {


    return (
        <div>
            <Link href="/RemoveJob">
                <button className={styles.adminFunctionButton}> Remove Job</button>
            </Link>
         </div>
    )
    
}