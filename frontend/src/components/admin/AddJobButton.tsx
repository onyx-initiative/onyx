import React from "react";
import Navbar from "../general/Navbar";
import Link from 'next/link'

export default function AddJobButton() {
    return (
        <div>
            <Link href="/frontend/src/sections/admin/AddJob.tsx">
                <button> Add Job</button>
            </Link>
        </div>
    )
    
}
