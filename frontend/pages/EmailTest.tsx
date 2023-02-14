import React from 'react'

export default function EmailTest() {

    const sendEmail = async () => {
        // This is the code to send an email
        // send an email to the user
        await fetch('/api/update')
    }
    return (
        <div>
            <button
                onClick={() => {
                    sendEmail()
                }}
            >
                Send Email
            </button>
        </div>
    )
}
