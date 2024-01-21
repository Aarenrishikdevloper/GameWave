import { getSelf } from "./auth-service";
import { db } from "./db";

export const getStream =async() =>{
   let userid; 
   try{
      const self = await getSelf(); 
      userid = self.id;
   }catch(e){
       userid = null;
   } 
   let stream =[]; 
   if(userid){
    stream = await db.stream.findMany({
        where:{
            user:{
                NOT:{
                    blocking:{
                        some:{
                            blockedId:userid,
                        }
                    }
                }
            }
        }, 
        select:{
            id:true, 
            user:true, 
            isLive:true, 
            name:true, 
            thumbnail:true
        }, 
        orderBy:[
            {
                isLive:"desc"
            }, 
            {
                updatedAt:"desc"
            }
        ]

    })
   }else{
    stream  = await db.stream.findMany({
        select:{
            id:true, 
            user:true, 
            isLive:true, 
            name:true, 
            thumbnail:true
        }, 
        orderBy:[
            {  
                isLive:"desc"
            }, 
            {   
                updatedAt:"desc"
            }
        ]
    })
   } 
   return stream;
}