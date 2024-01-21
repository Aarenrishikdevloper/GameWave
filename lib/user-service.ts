import {db} from "@/lib/db";
import { count } from "console";

export const getusername = async(username:string)=>{
    const user = await db.user.findUnique({
        where: {
            username
        }, 
       select:{
         id:true, 
         externalUserId:true, 
         bio:true, 
         imageUrl:true, 
         username:true, 
         stream:{
            select:{
                id:true, 
                isLive:true, 
                isChatDelayed:true, 
                isChatEnabled:true,  
                isChatFollowersOnly:true,  
                thumbnail:true, 
                name:true, 
            },
         },  
         _count:{
            select:{
                followedBy:true, 
            }
         }
       }
        
    })
    return user;
}
export const getuserbyid = async(id:string)=>{
    const user = await db.user.findUnique({
        where:{
            id
        }, include:{stream:true}
    })
    return user;
}
