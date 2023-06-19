import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export default function BackButton() {
  return (
    <Link href="/Admin" style={{ borderRadius: "2rem", alignSelf: "left" }}>
        <button style={{
            alignSelf: "left",
            borderRadius: "2rem",
            padding: "1rem",
            cursor: "pointer",
            backgroundColor: "#806E53",
            border: "none",
            margin: 0,
            marginRight: "10rem"
        }}
        >
                <FaArrowLeft size={16} color='white' />
        </button>
    </Link>
  )
}
