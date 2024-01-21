'use client'
import React, {useEffect} from "react";
import {useMediaQuery} from "usehooks-ts";
import {useSidebar} from "@/store/use-sidebar";
import {cn} from "@/lib/utils";

interface containerprops{
    children:React.ReactNode
}
export const Container = ({children}:containerprops)=>{
    const matches =useMediaQuery("(max-width:1024px)");
    const{collapsed, onExpand, onCollapsed}= useSidebar((state)=>state);
    useEffect(()=>{
        if(matches){
            onCollapsed()
        }else{
            onExpand();
        }
    },[matches,onCollapsed, onExpand])
    return(
        <div className={cn("flex-1", collapsed?"ml-[70px]":"ml-[70px] lg:ml-60")}>
            {children}
        </div>
    )
}
