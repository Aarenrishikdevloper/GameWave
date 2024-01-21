'use client'
import { Chatvariant, useChatSidebar } from '@/store/use-chatbar'
import { ArrowLeftFromLine, ArrowRightFromLine, MessagesSquare, Users } from 'lucide-react';
import React from 'react'
import Hint from '../label';
import { Button } from '@/components/ui/button'; 
export const VariantToggle = () => { 
    const{variant, onChangeVariant} = useChatSidebar((state)=>state);  
    const ischat = variant === Chatvariant.CHAT; 

    const Icon = ischat?Users:MessagesSquare;  
    const label = ischat?"Community":"Go back to chat";
    const Togggle=()=>{
       const newVariant =ischat?Chatvariant.COMMUNITY:Chatvariant.CHAT; 
       onChangeVariant(newVariant);  
    }
  return (
    <Hint label={label} asChild side='left'>
      <Button onClick={Togggle} variant={"ghost"} className='h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent' >
            <Icon className='w-4 h-4'/>
      </Button>
    </Hint>
  )
}
