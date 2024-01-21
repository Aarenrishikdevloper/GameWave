"use client"
import { cn, stringToColor } from '@/lib/utils';
import React, { useTransition } from 'react'
import Hint from '../label';
import { Button } from '@/components/ui/button';
import { MinusCircle } from 'lucide-react'; 
import { OnBlock } from '@/action/block';
import { toast } from 'sonner';
interface communityprops{
    hostname: string; 
    viewername: string; 
    participant: string; 
    participantidentity: string;
}
const CommunityItem = ({hostname, viewername, participant, participantidentity}:communityprops) => {   
    const[ispending, starttransition] = useTransition();
    const isSelf  = participant === viewername; 
    const ishost = hostname ===viewername
    const color = stringToColor( participant || '') 
    const handleblock =()=>{
        if(!participant || isSelf  || !ishost) return 
        starttransition(()=>{
        OnBlock(participantidentity).then(()=>toast.success(`Blocked ${participant}`)).catch(()=>toast.error("Something wernt wrong"))
        })
    }
  return (
    <div className={cn('group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5', ispending && 'opacity-50 pointer-events-none')}>
        <p style={{color:color}}>
            {participant}
        </p>
        {ishost && !isSelf &&(
            <Hint label='Block'>
              <Button variant={"ghost"} className='h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition' disabled={ispending} onClick={handleblock}>
                  <MinusCircle className='h-4 w-4 text-muted-foreground' />
              </Button>
            </Hint>
        )}
    </div>
  )
}

export default CommunityItem