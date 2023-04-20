import React from "react";
import styles from "../../../styles/components/AdminPageButtons.module.css";
import Link from "next/link";


export default function RemoveJobButton() {


    return (
        <div>
            <Link href="/RemoveEmployer">
                <button className={styles.adminFunctionButton}> Remove Employer</button>
            </Link>
         </div>
    )
    
}