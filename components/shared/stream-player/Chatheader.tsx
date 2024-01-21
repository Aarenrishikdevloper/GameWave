import React from 'react'
import{ToogleCollapsed} from "@/components/shared/stream-player/toogle-chat"
import { VariantToggle } from './chat_variant_toggle'
import { Skeleton } from '@/components/ui/skeleton'
export const Chatheader = () => {
  return (
    <div className='relative p-3 border-b'>
         <div className="absolute left-2 top-2 hidden lg:block">
            <ToogleCollapsed/>
         </div> 
         <p className='font semibold text-primary text-center'>Stream Chat</p> 
         <div className="absolute right-2 top-2 ">
            <VariantToggle/>
          </div>
    </div>
  )
} 
export const ChatHeaderSkeleton =()=>{
    return(
      <div className="relative p-3 border-b hidden md:block">
         <Skeleton className='relative p-3 border-b hidden md:block'/>
         <Skeleton className='w-28 h-6 mx-auto'/>
      </div>
    )
}
