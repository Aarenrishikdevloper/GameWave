
import {getSelf} from "@/lib/auth-service";
import {db} from "@/lib/db";

export const isFollowingUser = async(id:string)=>{
    try{
        const self  = await getSelf()
        const otheruser = await db.user.findUnique({where:{id}});
        if(!otheruser){
            throw new Error("User not found")
        }
        if(otheruser.id === self.id) return true
        const existinguser = await db.follow.findFirst({where:{followerId:self.id, followingId:otheruser.id}});
        return !!existinguser
    }catch (e) {
       return false
    }
}
export const Followuser = async(id:string)=>{
       try{
        const self  = await getSelf()
        const otheruser = await db.user.findUnique({where:{id}});
        if(!otheruser){
            throw new Error("User not found")
        }
        if(otheruser.id === self.id) throw new Error("Cant follow yourself")
        const existinguser = await db.follow.findFirst({where:{followerId:self.id, followingId:otheruser.id}});
        if(existinguser){
            throw new Error("Already Following")
        }
        const follow = await db.follow.create({
            data:{
                followerId:self.id,
                followingId:otheruser.id
            },include:{following:true, follower:true}
        })
        return follow
    }catch(e){
        //throw new Error("Something went wrong")
    }
}
export const unFollowuser = async(id:string)=>{
    try{
        const self  = await getSelf()
        const otheruser = await db.user.findUnique({where:{id}});
        if(!otheruser){
            throw new Error("User not found")
        }
        if(otheruser.id === self.id) throw new Error("Cant unfollow yourself")
        const existinguser = await db.follow.findFirst({where:{followerId:self.id, followingId:otheruser.id}});
        if(!existinguser){
            throw new Error("Not Following")
        }
        const follow = await db.follow.delete({
            where:{id:existinguser.id}, include:{following:true}
        })
        return follow
    }catch(e){
        throw new Error("Something went wrong")
    }
}

export const getfollowuser = async()=>{
   try {
       const self = await getSelf();
       const followuser = await db.follow.findMany({where:{followerId:self.id,following:{blocking:{none:{blockerId:self.id}}}},orderBy:[{createdAt:'desc'},{following:{stream:{isLive:"desc"}}}],include:{following:{include:{stream:{select:{isLive:true}}}}}});
       return  followuser;
   }catch{
       return []
   }
}


