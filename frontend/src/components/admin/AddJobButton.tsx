import React from "react";
import Navbar from "../general/Navbar";
import Link from 'next/link';
import styles from "../../../styles/components/AdminPageButtons.module.css";

export default function AddJobButton() {
    return (
        <div>
            <Link href="/AddJob">
                <button className={styles.adminFunctionButton}> Add Job</button>
            </Link>
        </div>
    )
    
}
