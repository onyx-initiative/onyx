import React from "react";
import Navbar from "../general/Navbar";
import styles from "../../../styles/components/AdminPageButtons.module.css";


export default function AddEmployerButton() {
    return (
        <div>
            <button className={styles.adminFunctionButton}>Add Employer</button>
        </div>
    )
    
}