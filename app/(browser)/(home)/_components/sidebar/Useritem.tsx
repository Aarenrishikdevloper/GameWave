"use client";
import {usePathname} from "next/navigation";
import {useSidebar} from "@/store/use-sidebar";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils"
import Link from "next/link";
import {UserAvatar} from "@/components/shared/UserAvatar";
import Badge from "@/components/shared/Livebadge";
import {Skeleton} from "@/components/ui/skeleton";

interface useritemprops{
    username:string;
    imageUrl:string;
    islive?:boolean
}
export const Useritem = ({username,imageUrl, islive}:useritemprops)=>{
     const pathname = usePathname();
     const {collapsed} = useSidebar((state)=>state)
     const href = `/${username}`;
     const isactive = pathname === href;

    return(
          <Button asChild variant={'ghost'} className={cn("w-full h-12", collapsed?"justify-center":"justify-center", isactive && "bg-accent")}>
             <Link href={href}>
                 <div className={cn("flex items-center w-full gap-x-4",collapsed &&"justify-center")}>
                     <UserAvatar username={username} imageUrl={imageUrl} isLive={islive}/>
                     {!collapsed &&(
                         <p className={'truncate'}>{username}</p>
                     )}
                     {!collapsed && islive &&(
                         <Badge className={'ml-auto'}/>
                     )}

                 </div>
             </Link>
          </Button>
    )
}
export const UserItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};
