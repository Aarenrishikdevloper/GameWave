
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { Result, ResultSkeleton } from './_components/result';

interface searchpageterms{
    searchParams:{
        term?: string;
    }
}
const Page = ({searchParams}:searchpageterms) => { 
    if(!searchParams.term){
        redirect("/");
    } 
  return (
    <div className='h-full max-w-screen-2xl mx-auto p-8' >
        <Suspense fallback={<ResultSkeleton/>}>
          <Result term={searchParams.term}/>
        </Suspense>
    </div>
  )
}

export default Page