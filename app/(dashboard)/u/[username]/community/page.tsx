import React from 'react'
import { DataTable } from './_components/data-table'
import {  columns } from './_components/columns'
import { getBlockedUser } from '@/lib/block-service'
import { format } from 'date-fns'

const Page = async() => { 
    const blockeduser = await getBlockedUser(); 
    const formatteddata = blockeduser.map((block)=>({
        ...block, 
        userId:block.blocked.id, 
        imageUrl:block.blocked.imageUrl, 
        username:block.blocked.username,  
        createdAt:format(new Date(block.blocked.createdAt), "dd/MM/yyyy")
    }))
  return (
    <div className='p-6'>
      <div className="mb-4">
        <h1 className='text-2xl font-block'>
            Community Settings
        </h1>
      </div>
      <DataTable columns={columns} data={formatteddata} />
    </div>
  )
}

export default Page