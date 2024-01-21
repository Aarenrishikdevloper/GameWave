import React from 'react'
import { Varified } from '../varified';
import Biomodal from './Biomodal';
interface Aboutcardprops{
    hostname: string; 
    hostIdentity: string; 
    viewerIdentity:string;  
    bio: string | null; 
    followedByCount: number;
} 
export const AboutCard = ({hostname,hostIdentity,viewerIdentity,bio, followedByCount}:Aboutcardprops) => { 
    const followerlabel = followedByCount === 1?"follower":"followers";  
    const hostviewer = `host-${hostIdentity}`
    const ishost = viewerIdentity === hostviewer
  return (
    <div className='px-4'>
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 font-semibold ">
                About  {hostname} 
                <Varified/> 

            </div>
            {ishost &&(
                <Biomodal intialvalue={bio}/>
            )}
        </div>
        <div className="text-sm text-muted-foreground">
            <span className='font-semibold text-primary'>
                {followedByCount}
            </span> {followerlabel}
        </div> 
        <p className='text-sm'>
            {bio || "This User prefers to keep an air of mystery about him"}
        </p>
      </div>
    </div>
  )
}

