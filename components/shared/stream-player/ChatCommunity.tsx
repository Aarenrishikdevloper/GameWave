import { Input } from '@/components/ui/input';
import { useParticipants, useRemoteParticipant } from '@livekit/components-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';
import React, { useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts';
import CommunityItem from './CommunityItem';
interface ChatCommunityprops{
    hostname:string; 
    viewername:string; 
    isHidden:boolean;
}
const ChatCommunity = ({hostname, viewername,isHidden}:ChatCommunityprops) => {
  const[value,setvalue]=useState("");
  const debouncedValue = useDebounce<string>(value,500)
  const participants = useParticipants();  
  
  const onChange = (newvalue:string) => {
    setvalue(newvalue);
  }  
  const filterparticipants = useMemo(()=>{
    const depued =participants.reduce((acc,participant)=>{
      const hostviewer = `host-${participant.identity}`; 
      if(!acc.some((p)=>p.identity === hostviewer)){
            acc.push(participant)
      }
      return acc
    },[] as (RemoteParticipant | LocalParticipant)[])
       return depued.filter(participant =>{
        return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
       })
  },[participants, debouncedValue])
  if(isHidden){
    return(
      <div className="flex flex-1 items-center justify-center ">
        <p className='text-sm text-muted-foreground'>
          Community is disabled
        </p>
      </div>
    )
  }
  return (
    <div className='p-4'>
      <Input className='border-white/10' placeholder='Search Community' onChange={(e)=>onChange(e.target.value)}/> 
      <ScrollArea className='gap-y-2 mt-4'>
           <p className='text-center text-sm  text-muted-foreground hidden last:block'> 

            No Result
           </p> 
           {filterparticipants.map((participant) =>(
            < CommunityItem key={participant.identity} hostname={hostname} viewername={viewername} participant={participant.name} participantidentity ={participant.identity}/>
           ))}
      </ScrollArea>
    </div>
  )
}

export default ChatCommunity