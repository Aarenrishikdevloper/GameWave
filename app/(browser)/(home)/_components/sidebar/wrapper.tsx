'use client'
import { useIsClient } from "usehooks-ts";
import React from "react";
import {cn} from "@/lib/utils"
import {useSidebar} from "@/store/use-sidebar";
import {ToggleSkeleton} from "@/app/(browser)/(home)/_components/sidebar/toggle";
import {RecommendedSkeleton} from "@/app/(browser)/(home)/_components/sidebar/Recomended";
interface Wrapperprops{
    children:React.ReactNode
}


export const Wrapper =({children}:Wrapperprops)=>{
    const isClient = useIsClient();
    const{collapsed} = useSidebar()
    if (!isClient) {
        return (
            <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
                <ToggleSkeleton />

                <RecommendedSkeleton />
            </aside>
        );
    }
    return(
      <aside className={cn('fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50', collapsed && "w-[70px]" )}>
          {children}
      </aside>
    )
}