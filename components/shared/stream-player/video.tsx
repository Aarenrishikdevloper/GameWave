'use client'
import {useConnectionState, useRemoteParticipant, useTracks} from "@livekit/components-react";
import {ConnectionState, Track} from "livekit-client";
import {OfflineVideo} from "@/components/shared/stream-player/Offline";
import {LoadingVideo} from "@/components/shared/stream-player/LoadingComponent";
import {Livevideo} from "@/components/shared/stream-player/Livevideo";
import { Skeleton } from "@/components/ui/skeleton";

interface videoprops{
    hostName:string;
    hostIndentity:string;
}
export const Video = ({hostName,hostIndentity}:videoprops)=>{
    const connectionState  = useConnectionState();
    // @ts-ignore
    const participant = useRemoteParticipant(hostIndentity)
    console.log(participant);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track)=>track.participant.identity === hostIndentity)
    let content;
    if( !participant && connectionState === ConnectionState.Connected){
        content  = <OfflineVideo username={hostName}/>
    }
    else if(!participant || tracks.length === 0){
        content = <LoadingVideo label={"loading"}/>
    }
    else{
        content  = <Livevideo participant={participant}/>
    }


        return(
        <div className={'aspect-video border-b group relative'}>
            {content}
        </div>
    )
} 


export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
        <Skeleton className="h-full w-full rounded-none"/>
    </div>
  )
}
