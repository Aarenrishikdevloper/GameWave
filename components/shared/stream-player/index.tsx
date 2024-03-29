'use client'
import {User} from ".prisma/client";
import {Stream} from "@prisma/client";
import {ChatToggle, LiveKitRoom} from "@livekit/components-react";
import {useViewerToken} from "@/hooks/use-viewer-token";
import {Video, VideoSkeleton} from "@/components/shared/stream-player/video";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chatbar";
import { Chat, ChatSkeleton } from "./chat";
import { ToogleCollapsed } from "./toogle-chat";
import { Header, HeaderSkeleton } from "./header";
import { Infocard } from "./infocard";
import { AboutCard } from "./AboutCard"; 
type CustomStream={
    id: string; 
    isChatEnabled: boolean; 
    isChatDelayed: boolean;  
    isChatFollowersOnly: boolean;
    isLive: boolean; 
    thumbnail: string |null; 
    name: string;
}
type CustomUser={
  id:string, 
  username:string, 
  bio:string|null,  
  stream:CustomStream | null;  
  imageUrl:string, 
  _count:{followedBy:number}
}
interface streamplayerprops{
    user:CustomUser;
    stream:CustomStream;
    isFollowing:boolean;
}
export const StreamPlayer =({user, stream, isFollowing}:streamplayerprops)=>{
    const {token, name,identity} = useViewerToken(user.id) 
    const{collapsed} = useChatSidebar((state)=>state)  
   if(!token || !name || !identity){
     return <StreamPlayerSkeleton/>
   }
    return(
        <> 
        {collapsed&&(
            <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                <ToogleCollapsed/> 
            </div>
        )}
        <LiveKitRoom serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL} token={token} className={cn('grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full', collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2" )}>
            <div className={"space-y-4 col-span-1 lg:col-span-2 xl:col-span-2  2xl:col-span-5  lg:overflow-y-auto hidden-scrollbar pb-10 "}>
                <Video hostName={user.username} hostIndentity={user.id}/>  
                <Header hostname={user.username} hostIdentity={user.id} imageUrl={user.imageUrl} isFollowing={isFollowing} name={stream.name} viewerIdentity={identity}/> 
                <Infocard hostIdentity={user.id} viewerIdentity={identity} name={stream.name} thumbnailUrl={stream.thumbnail}/> 
                <AboutCard hostname={user.username} hostIdentity={user.id} viewerIdentity={identity} bio={user.bio} followedByCount={user._count.followedBy}/>
            </div> 
            <div className={cn("col-span-1", collapsed && "hidden")}>
                <Chat viewername={name} hostname={user.username} hostIdentity={user.id} isFollowing={isFollowing} isChatEnable={stream.isChatEnabled} isChatDelayed={stream.isChatDelayed} isChatFollowersOnly={stream.isChatFollowersOnly}/>
            </div>

        </LiveKitRoom> 
        </>
    )
} 



export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-ful">
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:grid-cols-2 2xl:grid-cols-5  lg:overflow-y-auto hidden-scrollbar pb-10 ">
            <VideoSkeleton/> 
            <HeaderSkeleton/>
        </div> 
        <div className="col-span-1 bg-background">
            <ChatSkeleton/>
        </div>
    </div>
  )
}
