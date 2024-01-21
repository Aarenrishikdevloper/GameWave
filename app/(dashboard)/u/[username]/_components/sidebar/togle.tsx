'use client'
import {useSidebar} from "@/store/use-sidebar";
import {Button} from "@/components/ui/button";
import {ArrowLeftFromLine, ArrowRightFromLine} from "lucide-react";
import Hint from "@/components/shared/label";
import {useDashSidebar} from "@/store/use-sidebar_dash";


export const Toggle=()=>{
    const{collapsed, onExpand, onCollapsed}= useDashSidebar((state)=>state)
    const label = collapsed?"Expand":"Collapsed"
    return(
        <>
            {collapsed &&(
                <div className={"hidden lg:flex w-full items-center justify-center pt-4 mb-4"}>
                    <Hint label={label} side={"right"} asChild>
                        <Button variant={'ghost'} className={'h-auto p-2'} onClick={onExpand}>
                            <ArrowRightFromLine className='h-4 w-4'/>
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed &&(
                <div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full '>
                    <p className={"font-semibold text-primary "}>Dashboard</p>
                    <Hint label={label} side={"right"} asChild>
                        <Button variant={'ghost'} className={'h-auto p-2 ml-auto'} onClick={onCollapsed}>
                            <ArrowLeftFromLine className='h-4 w-4'/>
                        </Button>
                    </Hint>


                </div>
            )}
        </>
    )
}