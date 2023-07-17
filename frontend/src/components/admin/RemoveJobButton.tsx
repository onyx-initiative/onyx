import React from "react";
import styles from "../../../styles/components/AdminPageButtons.module.css";
import Link from "next/link";
import { DELETE_JOB } from "../../../graphql/mutations/jobMutations";

export default function RemoveJobButton(props: any) {
    const { text, link } = props;

    return (
        <div>
            <Link href={link}>
                <button className={styles.adminFunctionButton}>{text}</button>
            </Link>
         </div>
    )
    
}