import React from "react";
import Navbar from "../general/Navbar";
import styles from "../../../styles/components/AdminPageButtons.module.css";
import Link from "next/link";


export default function EditJobButton(props: any) {
    const { text, link } = props;

    return (
        <div>
            <Link href={link}>
                <button className={styles.adminFunctionButton}>{text}</button>
            </Link>
         </div>
    )
    
}