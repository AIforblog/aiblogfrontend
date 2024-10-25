"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';


function EditProfile() {
    const Editprof = async () => {
        console.log("editing profile...");
      };
  return (
    <>
          <Button
          onClick={Editprof} 
          className="bg-[#FAFAFA] hover:bg-white hover:border-[#171717] text-[#171717] font-medium rounded-full transition duration-300 ease-in-out border"
        >
        <Pencil
        className='pr-2'/> Edit Profile
        </Button>
    </>
  )
}

export default EditProfile;