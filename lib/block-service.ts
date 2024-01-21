import {getSelf} from "@/lib/auth-service";
import {db} from "@/lib/db";

export const isBlockedbyuser = async(id:string)=>{
    try{
         const self = await getSelf();
         const otheruser = await db.user.findUnique({where:{id}});
         if(!otheruser){
             throw new Error("User Not Found")
         }
         if(otheruser.id === self.id) return  false
         const existingblock = await db.block.findUnique({where:{blockerId_blockedId:{blockerId:otheruser.id ,blockedId:self.id}}})
         return !!existingblock
    }catch (e) {
        return false
    }
}

export const blockUser = async(id:string)=>{
    const self = await getSelf();
    if(self.id === id){
        throw new Error("Can't block Yourself");
    }
    const otheruser = await db.user.findUnique({where:{id}});
    if(!otheruser){
        throw new Error("User not found")
    }
    const existingblock = await db.block.findUnique({where:{blockerId_blockedId:{blockerId:self.id, blockedId:otheruser.id}}})
    if(existingblock){
        throw new Error("Already blocked")
    }
    const block = await db.block.create({
        data:{
            blockedId:otheruser.id,
            blockerId:self.id
        }, include:{
            blocked:true
        }
    })
    return block
}

export const unblockUser = async(id:string)=>{
    const self = await getSelf();
    if(self.id === id){
        throw new Error("Can't unblock Yourself");
    }
    const otheruser = await db.user.findUnique({where:{id}});
    if(!otheruser){
        throw new Error("User not found")
    }
    const existingblock = await db.block.findUnique({where:{blockerId_blockedId:{blockerId:self.id, blockedId:otheruser.id}}})
    if(!existingblock){
        throw new Error("Not blocked")
    }
    const block = await db.block.delete({
        where:{id:existingblock.id}, include:{blocked:true}
    })
    return block
}

export const getBlockedUser = async()=>{
    const self = await getSelf(); 
    const blockeduser = await db.block.findMany({
        where:{blockerId:self.id}, 
        include:{
            blocked:true
        }
    }) 
    return blockeduser;
}