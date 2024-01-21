'use client'
import { useChatSidebar } from '@/store/use-chatbar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import React from 'react'
import Hint from '../label';
import { Button } from '@/components/ui/button'; 
export const ToogleCollapsed = () => { 
    const{collapsed, onExpand, onCollapsed} = useChatSidebar((state)=>state); 
    const Icon = collapsed?ArrowLeftFromLine:ArrowRightFromLine; 
    const label = collapsed?"Expand":"Collapse"; 
    const Togggle=()=>{
        if(collapsed){
            onExpand()
        }else{
            onCollapsed()
        }
    }
  return (
    <Hint label={label} asChild side='left'>
      <Button onClick={Togggle} variant={"ghost"} className='h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent' >
            <Icon className='w-4 h-4'/>
      </Button>
    </Hint>
  )
}
