import React from "react";
import Navbar from "../src/components/general/Navbar";
import AddJobButton from "../src/components/admin/AddJobButton"
import AddEmployerButton from "../src/components/admin/AddEmployerButton"
import RemoveJobButton from "../src/components/admin/RemoveJobButton";
import styles from "../styles/components/AdminPageButtons.module.css"
import ExcelReader from "../src/components/admin/ExcelReader";
import RemoveEmployerButton from "../src/components/admin/RemoveEmployerButton"
import UpdateLogo from "../src/components/admin/UpdateLogo";
import BarChart from "../src/components/admin/BarChart";
import AddBanner from "../src/components/admin/AddBanner";
import EditEmployerButton from "../src/components/admin/EditEmployerButton";
import EditJobButton from "../src/components/admin/EditJobButton";

// To ensure unauthenticated people don't access
// import getServerProps from "../src/utils/getServerProps";


export default function Admin() {
    return (
        <div>
            <Navbar/>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5rem"}}>
                <div className={styles.adminActions} style={{ display: "flex", flexDirection: "column", width: "100%",}}>
                    <div>
                        <h1>Single-Edit Actions</h1>
                        <div style={{ display: "flex", }}>
                            <AddJobButton />
                            <AddEmployerButton/>
                            <AddBanner/>
                            <EditJobButton text="Edit Job" link="/EditJob"/>
                            <EditEmployerButton text="Edit Employer" link="/EditEmployer"/>
                        </div>
                    </div>
                    <div style={{ width: "100%", height: "0.1rem", backgroundColor: "white", marginTop: "1rem" }}></div>
                    <div>
                        <h1>Batch Actions</h1>
                            <div style={{ display: "flex",justifyContent: "space-between"}}>
                                <ExcelReader />
                                <UpdateLogo />
                                <RemoveJobButton text="Remove Job" link="/RemoveJob"/>
                                <RemoveJobButton text="Archive Job" link="/ArchiveJob"/>
                                <RemoveJobButton text="View Archived Jobs" link="/Archive"/>
                                <RemoveEmployerButton/>
                               
                                
                            </div>
                    </div>
                </div>
                {/* <div style={{ width: "100%", height: "100%"}}>
                    <BarChart />
                </div> */}
            </div>
        </div>   
    )
}

// export { getServerProps };
