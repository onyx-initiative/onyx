import React from "react";
import Navbar from "../general/Navbar";
import Link from 'next/link';

export default function AddJobButton() {
    return (
        <div>
            <Link href="/AddJob">
                <button className="adminFunctionButton"> Add Job</button>
            </Link>
        </div>
    )
    
}
