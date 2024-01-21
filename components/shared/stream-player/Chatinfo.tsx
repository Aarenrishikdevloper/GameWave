interface ChatInfoprops{
    isDelayed: boolean; 
    isFollowersOnly: boolean;
} 
import { Info } from 'lucide-react';
import React, { useMemo } from 'react'
import Hint from '../label';

export const Chatinfo = ({isDelayed,isFollowersOnly}:ChatInfoprops) => { 
    const hint =useMemo(()=>{
        if(isFollowersOnly && !isDelayed){
            return "Only followers can Chat"
        } 
        if(isDelayed && !isFollowersOnly){
            return "Chat is delayed by 3 secounds"
        } 
        if(isDelayed && isFollowersOnly){
            return "Only followers are allowed.Chat is delayed by 3 secounds"
        } 
        return ''
    },[isDelayed, isFollowersOnly]);  
    const label =useMemo(()=>{
        if(isFollowersOnly && !isDelayed){
            return "Only followers can Chat"
        } 
        if(isDelayed && !isFollowersOnly){
            return "Chat is delayed by 3 secounds"
        } 
        if(isDelayed && isFollowersOnly){
            return "Only followers are allowed.Chat is delayed by 3 secounds"
        } 
        return ''
    },[isDelayed, isFollowersOnly]); 
    if(!isDelayed && !isFollowersOnly){
        return null;
    }

  return (
     <div className="p-2 text-muted-foreground bg-white/5 border border-white/18 w-full rounded-t-md flex items-center gap-x-2">
        <Hint label={hint}> 
         <Info  className='w-4 h-4'/>
          
        </Hint> 
        <p className='text-xs font-semibold '>{label}</p>
     </div>
  )
}
