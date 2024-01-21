"use client"
import { useEffect, useMemo, useState } from 'react'; 
import { ChatHeaderSkeleton, Chatheader } from './Chatheader';
import { useMediaQuery } from 'usehooks-ts';
import { Chatvariant, useChatSidebar } from '@/store/use-chatbar';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { send } from 'process';
import { ChatForm, ChatFormSkeleton } from './ChatForm';
import { ChatList, ChatListSkeleton } from './chat-list';
import ChatCommunity from './ChatCommunity';
interface ChatProps{
    hostname:string; 
    viewername:string; 
    isFollowing:boolean;  
    hostIdentity:string; 
    isChatEnable:boolean; 
    isChatDelayed:boolean; 
    isChatFollowersOnly:boolean;

}
export const Chat = ({hostname, hostIdentity,viewername, isFollowing, isChatEnable, isChatFollowersOnly, isChatDelayed}:ChatProps) => {  
    
    const matches = useMediaQuery('(max-width: 1024px)');  
    const{variant, onExpand} = useChatSidebar((state)=>state)
    useEffect(() =>{
        if(matches){
          onExpand();
        }
    },[matches,onExpand])  
    const connectionstate =useConnectionState(); 
    const participant = useRemoteParticipant(hostIdentity); 
    const isonline  = participant&& connectionstate ===ConnectionState.Connected;
   const [value, setvalue] =useState(''); 
   const {chatMessages:messages, send}= useChat(); 
   const isHidden = !isChatEnable || !isonline; 
   const reverseMessage = useMemo(()=>{
       return messages.sort((a,b)=>b.timestamp - a.timestamp);
   },[messages]) 
   const onSubmit =()=>{
    if(!send){
      return;
    }  
    send(value); 
    setvalue('');

   } 
   const onChange =(value:string)=>{
    setvalue(value)
   }

  return (
    <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
         <Chatheader/>
         {variant  === Chatvariant.CHAT &&(
           <>  
           <ChatList messages={messages} isHidden={isHidden}/>
          <ChatForm onSubmit={onSubmit} value={value} onChange={onChange} isHidden={isHidden} isFollowersOnly={isChatFollowersOnly} isDelayed={isChatDelayed} isFollowing={isFollowing}/>
           </>
         )} 
         {variant  === Chatvariant.COMMUNITY &&(
           <> 
             <ChatCommunity viewername={viewername} hostname={hostname} isHidden={isHidden}/>
           </>
         )}
    </div>
  )
}
export const ChatSkeleton=()=>{
  return(
    <div className=" flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton/> 
      <ChatListSkeleton/> 
      <ChatFormSkeleton/>
    </div>
  );
}