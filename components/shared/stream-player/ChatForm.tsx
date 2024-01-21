'use client'
interface ChatFormProps{
    onSubmit:()=>void; 
    value:string; 
    onChange:(value:string)=>void; 
    isHidden:boolean; 
    isFollowersOnly:boolean; 
    isFollowing:boolean;  
    isDelayed:boolean; 
}
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { Chatinfo } from './Chatinfo';
import { Skeleton } from '@/components/ui/skeleton';

export const ChatForm = ({onChange, onSubmit,value,isHidden, isFollowersOnly, isFollowing,isDelayed}:ChatFormProps) => { 
    const[isDelayedBlocked,setIsDelayedBlock]= useState(false); 
    const isFollowersOnlyAndNotFollowing = isFollowersOnly &&!isFollowing  
    const isDisabled = isHidden ||  isDelayedBlocked || isFollowersOnlyAndNotFollowing
      if(isHidden){
        return null;
      } 
      const handlesubmit=(e:React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault(); 
          e.stopPropagation(); 
          if(!value || isDisabled){
            return
          } 
          if(isDelayed && !isDelayedBlocked){
            setIsDelayedBlock(true); 
            setTimeout(()=>{
              setIsDelayedBlock(false);  
              onSubmit()
            },3000);
          }else{
            onSubmit();
          }
      }
   
  return (
    <form className='flex flex-col items-center gap-y-4 p-3' onSubmit={handlesubmit}>
          <div className="w-full"> 
          <Chatinfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly}/>
            <Input onChange={(e)=>onChange(e.target.value)} value={value} disabled={isDisabled} placeholder="Send a message " className={cn("border-white/10", isFollowersOnly || isDelayed && "rounded-t-none border-t-0")}/>  


          </div> 
          <div className='ml-auto'>
            <Button type='submit' variant={'primary'} size={'sm'} disabled={isDisabled}>
                Chat
            </Button>
          </div>
    </form>
  )
} 
export const ChatFormSkeleton =()=>{
  return(
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className='w-full h-10'/> 
      <div className="flex items-center gap-x-2 ml-auto">
          <Skeleton className='h-7 w-7'/> 
          <Skeleton className='h-7 w-12'/>
      </div>
    </div>
  )
}
