import { getsearch } from '@/lib/search';
import React from 'react'
import { ResultCard } from './ResultCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ResultCardSkeleton } from '../../(home)/_components/ResultCard';
interface ResultProps{
    term?: string;
}
export const Result = async({term}:ResultProps) => { 
    const data = await getsearch(term); 

  return (
    <div>
        <h2 className=' text-lg font-semibold mb-4'>
            Result for Term &quot;{term}&quot;
        </h2>
        {data.length === 0 &&(
            <p className='text-muted-foreground text-sm'>No Result found. Try searching for something else</p>

        )} 
       <div className="flex flex-col gap-y-4">
        {data.map((result)=>{
            return(
                <ResultCard data={result} key={result.id}/>
            )
        })}
       </div>
    </div>
  )
}


export const ResultSkeleton = () => {
  return (
    <div>
        <Skeleton className='h-8 w-[290px] mb-4'/> 
        <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i)=>{
                return(
                    <ResultCardSkeleton key={i}/>
                )
            })}
        </div>
    </div>
  )
}
