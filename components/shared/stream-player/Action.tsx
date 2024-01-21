import { OnFollow, onUnfollow } from '@/action/Follow';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';
interface Actionprops{
    hostIdentity: string; 
    isFollowing: boolean; 
    isHost: boolean;
}
export const Action = ({hostIdentity, isFollowing, isHost}:Actionprops) => { 
    const router = useRouter(); 
    const {userId} = useAuth();
    const[ispending, startTransition]= useTransition(); 
    const handlefollow =()=>{
        startTransition(()=>{
            OnFollow(hostIdentity).then((data)=>toast.success(`You are Following ${data?.following.username}`))
                .catch(()=>toast.error("Something went wrong"));
        })
    } 
    const handleunfollow =()=>{
        startTransition(()=>{
            onUnfollow(hostIdentity).then((data)=>toast.success(`Unfollowed ${data?.following.username}`))
                .catch(()=>toast.error("Something went wrong"));
        })
    } 
    const handleclick =()=>{
        if(!userId){
            return router.push('/sign-in');
        } 
        else if(isHost){
          return
        }else if(isFollowing){
            handleunfollow();
        }else{
            handlefollow();
        }
    }
  return (
   <Button variant={'primary'} size={'sm'} className='w-full lg:w-auto' disabled={isHost || ispending} onClick={handleclick}>
      <Heart className={cn('h-4 w-4 mr-2', isFollowing?"fill-white":"fill-none")}/>
      {isFollowing?"Unfollow":"Follow"}
   </Button>
  )
}




export const ActionSkeleton = () => {
  return (
   <Skeleton className='h-10 w-full lg:w-24'/>
  )
}
