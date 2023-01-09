import React from "react";
import Navbar from "../src/components/general/Navbar";
import AddJobButton from "../src/components/admin/AddJobButton"
import AddEmployerButton from "../src/components/admin/AddEmployerButton"
import RemoveJobButton from "../src/components/admin/RemoveJobButton";
import styles from "../styles/components/AdminPage.module.css"

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";


export default function Admin() {
    return (
        <div>
            <Navbar/>
            <h1>Welcome to the Admin page! What would you like to do?</h1>
            <div className={styles.adminActions}>
                <AddJobButton/>
                <AddEmployerButton/>
                <RemoveJobButton/>
            </div>
            
        </div>
        
    )
}

export { getServerProps };