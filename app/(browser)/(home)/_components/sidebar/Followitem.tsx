'use client'
import React from "react";
import {Follow, User} from ".prisma/client";
import {useSidebar} from "@/store/use-sidebar";
import {Useritem, UserItemSkeleton} from "@/app/(browser)/(home)/_components/sidebar/Useritem";
interface followprops {
    data:(Follow &{
        following:User &{stream:{isLive:boolean}}
    })[]
}
 export const Follower = ({data}:followprops) => {
    const {collapsed} = useSidebar((state)=>state)
     if(!data.length){
         return null;
     }
  return (
    <div>
        {!collapsed &&(
            <div className={'pl-6 mb-4'}>
                <p className={"text-sm text-muted-foreground"}>Following</p>
            </div>
        )}
         <ul className={"space-y-2 px-2"}>
             {data.map((follow)=>(
                 <Useritem username={follow.following.username} imageUrl={follow.following.imageUrl} islive={follow.following.stream.isLive} key={follow.following.id}/>
             ))}
         </ul>
    </div>
  );
};
export const FollowSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    );
};
