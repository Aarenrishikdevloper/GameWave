import {currentUser} from "@clerk/nextjs";
import {db} from "@/lib/db";

export const getSelf = async()=>{
    const self = await currentUser();
    if(!self || !self.username){
        throw new Error("Unauthorize ")
    }
    const user = await db.user.findUnique({where:{externalUserId:self.id}});
    if(!user){
        throw new Error("NO user Found");
    }
    return user;
}

export const getselfusername = async(username:string)=>{
    const self = await currentUser();
    if(!self || !self.username){
        throw new Error("Umauthorize")
    }
    const user = await db.user.findFirst({
        where:{username}
    })
    if(!user){
        throw new Error("user Not Found")
    }
    if(self.username !== user.username){
        throw new Error("unauthorized");
    }
    return user
}