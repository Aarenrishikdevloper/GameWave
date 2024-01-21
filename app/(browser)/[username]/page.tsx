import React from "react";
import {getusername} from "@/lib/user-service";
import {Button} from "@/components/ui/button";
import {Action} from "@/app/(browser)/[username]/_component/action";
import {isFollowingUser} from "@/lib/Follow_service";
import { StreamPlayer } from "@/components/shared/stream-player";
import { notFound } from "next/navigation";
import { isBlockedbyuser } from "@/lib/block-service";
interface userpageprops{
    params:{
        username:string
    }
}
const Userpage = async({params}:userpageprops) => {
    const user = await getusername(params.username)  
  
    if(!user || !user.stream){
        notFound();
    } 
    const isBlocked = await isBlockedbyuser(user.id);
    if(isBlocked){
        notFound();
    }
    // @ts-ignore
    const isfollowing = await isFollowingUser(user.id)
 
    return (
     <StreamPlayer user={user}  isFollowing={isfollowing}  stream={user?.stream} />
  )
};

export default Userpage;