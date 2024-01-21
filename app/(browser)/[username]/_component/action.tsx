"use client"
import {Button} from "@/components/ui/button";
import {useTransition} from "react";
import {Followuser, unFollowuser} from "@/lib/Follow_service";
import {toast} from "sonner";
import {OnFollow, onUnfollow} from "@/action/Follow";
import {OnBlock, Unblockeduser} from "@/action/block";
import {unblockUser} from "@/lib/block-service";
interface Actionprops{
    isFollowing:boolean;
    userId:string;
}
export const Action= ({isFollowing, userId}:Actionprops)=>{
    const[ispending, setTransition] = useTransition()
    console.log(userId)
    const handlefollow =()=>{
        setTransition(()=>{
            OnFollow(userId).then((data)=>toast.success(`You are Following ${data?.following.username}`))
                .catch(()=>toast.error("Something went wrong"));
        })
    }
    const handleunfollow =()=>{
        setTransition(()=>{
            onUnfollow(userId).then((data)=>toast.success(`Unfollowed Sucessfully`))
                .catch(()=>toast.error("Something went wrong"));
        })
    }
    const handleclick =()=>{
        if(isFollowing){
            handleunfollow()
        }else{
           handlefollow()
        }
    }
    const handleblock =()=>{
        setTransition(()=>{
            Unblockeduser(userId).then((data)=>toast.success(`Blocked Sucessfully ${data.blocked.username}`))
                .catch(()=>toast.error("Something went wrong"));
        })
    }
    // @ts-ignore
    return(
        <>
            <Button disabled={ispending} variant={"primary"} onClick={handleclick} >
                {isFollowing?"Unfollow":"Follow"}
            </Button >
            <Button onClick={handleblock} className={"ml-12 flex flex-col"}>Block</Button>
        </>
    )
}