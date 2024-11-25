"use client"
import React, { ReactNode } from 'react'
import { UserProvider } from './userProfilectx'

const ProfileProvider = ({children}:{children:ReactNode}) => {
  return (
    <UserProvider>
        {children}
    </UserProvider>
  )
}

export default ProfileProvider