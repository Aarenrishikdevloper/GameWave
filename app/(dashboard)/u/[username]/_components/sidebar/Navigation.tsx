'use client'
import {usePathname} from "next/navigation";
import {useUser} from "@clerk/nextjs";

import {
    Fullscreen,
    KeyRound,
    MessageSquare,
    Users,
} from "lucide-react";
import {NavvItem, NavItemSkeleton} from "@/app/(dashboard)/u/[username]/_components/sidebar/NavvItem";


export const Navigation = ()=>{
    const pathname =usePathname();
    const {user} = useUser();

    const routes = [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen,
        },
        {
            label: "Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRound,
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare,
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users,
        },
    ];
    if(!user?.username){
        return (
            <ul className="space-y-2">
                {[...Array(4)].map((_,i)=>(
                    <NavItemSkeleton key={i}/>
                ))}
            </ul>
        )
    }
    return(
       <ul className={'space-y-2 px-2 pt-4 lg:pt-0'}>
           {routes.map((routes)=>(
               <NavvItem key={routes.href} label={routes.label} icon={routes.icon} href={routes.href} isActive={pathname === routes.href}/>
           ))}
       </ul>
    )
}

