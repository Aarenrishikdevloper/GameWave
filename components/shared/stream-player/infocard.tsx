'use client';
interface InfocardProps{
    name:string; 
    thumbnailUrl:string | null; 
    hostIdentity:string; 
    viewerIdentity:string; 
} 
import { Separator } from '@/components/ui/separator';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import InfoModel from './InfoModel';
 
export const Infocard = ({name, thumbnailUrl, hostIdentity, viewerIdentity}:InfocardProps) => {  
    const hostasviewer = `host-${hostIdentity}`
    const ishost = viewerIdentity=== hostasviewer; 
    if(!ishost) {
        return null;
    }
  return (
    <div className='px-4'>
        <div className="rounded-xl bg-background">
           <div className="flex items-center gap-x-2.5 p-4">
              <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
                 <Pencil className='h-5 w-5'/> 
              </div> 
              <div>
                <h2 className='text-sm lg:text-lg font-semibold capitalize'>
                    Edit Your Stream Info 
                </h2> 
                   <p className='text-muted-foreground text-xs lg:text-sm'>
                      Maximize Your visibility
                   </p>
              </div>
             <InfoModel intialName={name} intialThumbnailUrl={thumbnailUrl} />
           </div>
           <Separator/> 
           <div className="p-4 lg:p-6 space-y-4">
             <div>
                <h3 className='text-sm text-muted-foreground mb-2'>
                    Name
                </h3> 
                <p className='text-sm font-semibold'>
                    {name}
                </p>
             </div> 
             <h3 className='text-sm text-muted-foreground mb-2'>
                Thumbnail
             </h3> 
             {thumbnailUrl && (
                <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                    <Image fill src={thumbnailUrl} alt={name} className='object-cover' />
                </div>
             )}
           </div>

        </div>
    </div>
  )
}
