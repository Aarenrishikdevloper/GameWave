"use client"
import {Participant, Track} from "livekit-client";
import {useEffect, useRef, useState} from "react";
import {useTracks} from "@livekit/components-react";
import {Fullscreen} from "lucide-react";
import {FullScreenControl} from "@/components/shared/stream-player/Fullscreen";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./VolumeControl";

interface Livevideoprops{
    participant:Participant
}
export const Livevideo = ({participant}:Livevideoprops)=>{
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperref = useRef<HTMLDivElement>(null);  
    const[isFUllscreen, setIsFUllscreen] = useState(false)
    useTracks([Track.Source.Camera, Track.Source.Microphone]).filter((track)=>track.participant.identity === participant.identity).forEach((track)=>{
        if(videoRef.current){
            track.publication.track?.attach(videoRef.current)
        }
    })  
    const[volume,setvolume] = useState(0)
    const togglefullscreen = ()=>{
        if(isFUllscreen){
            document.exitFullscreen()
        }else if(wrapperref?.current){
            wrapperref.current.requestFullscreen()
        }
    } 
    const handleFullscreenChange = ()=>{
        const isCurrentlyFullscreen = document.fullscreenElement != null; 
        setIsFUllscreen(isCurrentlyFullscreen)
    }  
    const togglemute = ()=>{
       const isMuted = volume === 0 
       setvolume(isMuted?50:0) 
       if(videoRef?.current){
        videoRef.current.muted == !isMuted; 
        videoRef.current.volume= isMuted ?0.5 :0
       }
      
    }   
    useEffect(()=>{
        OnvolumeChange(0);
    },[])
    const OnvolumeChange = (value:number)=>{
        setvolume(+value); 
        if(videoRef?.current){
            videoRef.current.muted = value===0 
            videoRef.current.volume = +value * 0.01
        }
    }

    useEventListener('fullscreenchange', handleFullscreenChange, wrapperref);
    return(
        <div ref={wrapperref} className={'relative h-full flex'}>
            <video ref={videoRef} width={"100%"}/>
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all ">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4"> 
                    <VolumeControl onChange={OnvolumeChange} value={volume} onToggle={togglemute}/>
                       <FullScreenControl isFullscreen={isFUllscreen} onToggle={togglefullscreen}/>
                </div>
            </div>
        </div>
    )
}