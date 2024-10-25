import React from 'react'
import { JobCard } from '../job'
import { JobDummyData } from '@/data/mock/job'

function ProfileJobs() {
  return (
    <>
      <div className="flex flex-col gap-4 pb-10">
    {JobDummyData.map((item, index) => (
      <div key={index} className="border rounded-lg">
        <JobCard job={item} />
      </div>
    ))}
  </div>
    </>
  )
}

export default ProfileJobs
