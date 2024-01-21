'use client'
import { useParticipants, useRemoteParticipant } from '@livekit/components-react';
import React from 'react'
import { UserAvatar, UserAvatarSkeleton } from '../UserAvatar'; 
import { Varified } from '../varified';
import { UserIcon } from 'lucide-react';
import { Action, ActionSkeleton } from './Action';
import { Skeleton } from '@/components/ui/skeleton';

interface Headerprops{
    imageUrl: string; 
    hostname: string; 
    hostIdentity: string; 
    viewerIdentity: string; 
    isFollowing: boolean; 
    name: string; 
}


export const Header = ({imageUrl, hostIdentity, hostname, viewerIdentity, isFollowing,name}:Headerprops) => { 
    const participant = useRemoteParticipant(hostIdentity); 
    const participants  = useParticipants();
    const islive = !!participant;  
    const participantcount = participants.length-1  
    const hostasviewer = `host-${hostIdentity}`
    const ishost = viewerIdentity === hostasviewer
  return (
    <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4'>
      <div className="flex items-center gap-x-3">
         <UserAvatar imageUrl={imageUrl} size={'lg'} isLive={islive} showbadge  username={hostname}/> 
         <div className="space-y-1">
            <div className="flex items-center gap-x-2">
                <h2 className='text-lg font-semibold'>
                    {hostname}
                </h2> 
                <Varified/>

            </div> 
            <p className='text-sm font-semibold'>{name}</p> 
            {islive ?(
                <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                    <UserIcon className='h-4 w-4' /> 
                    <p>
                        {participantcount} {participantcount === 1 ? "viewer":"viewers"}
                    </p>
                </div>
            ):(
                <p className='font-semibold text-xs text-muted-foreground'>
                    Offline
                </p>
            )}
         </div>   


      </div> 
      <Action isFollowing={isFollowing} isHost={ishost} hostIdentity={hostIdentity} />
    </div>
  )
}


export const HeaderSkeleton = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4'> 
     <div className="flex items-center gap-x-2">
     <UserAvatarSkeleton size={'lg'}/>
      <div className="space-y-2">
        <Skeleton className='h-6 w-32'/> 
        <Skeleton className='h-4 w-24'/> 

      </div>
     </div> 
     <ActionSkeleton />
    </div>
  )
}
