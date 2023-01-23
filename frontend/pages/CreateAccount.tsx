import React from 'react'
import { useSession } from 'next-auth/react';

export default function CreateAccount() {
  const { data, status } = useSession({ required: true })

  return (
    <div>CreateAccount</div>
  )
}
