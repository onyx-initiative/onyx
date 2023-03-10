import React from "react";
import Navbar from "../general/Navbar";
import styles from "../../../styles/components/AdminPageButtons.module.css";
import Link from "next/link";


export default function AddEmployerButton() {
    return (
        <div>
            <Link href="/AddEmployer">
                <button className={styles.adminFunctionButton}> Add Employer</button>
            </Link>
        </div>
    )
    
}