"use server"

import {Followuser, unFollowuser} from "@/lib/Follow_service";
import {revalidatePath} from "next/cache";

export const OnFollow =async(id:string)=>{
    try{
      const followeduser = await Followuser(id)  ;
      revalidatePath("/");
      if(followeduser){
          revalidatePath(`${followeduser.follower.username}`);
      }
      return followeduser;
    }catch (e) {
        throw  new Error("Internal Error")
    }
}

export const onUnfollow = async(id:string)=>{
    try {
        const unfolloweuser = await unFollowuser(id);
        revalidatePath("/");
        if(unfolloweuser){
            revalidatePath(`/${unfolloweuser.following.username}`);
        }
        return unfolloweuser;
    }catch (e) {
        throw new Error("Internal Error")
    }
}