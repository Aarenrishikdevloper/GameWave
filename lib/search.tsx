import { getSeconds } from "date-fns";
import { getSelf } from "./auth-service";
import { db } from "./db";

export const getsearch = async(term?:string)=>{
     let userid; 
     try{
       const self = await getSelf(); 
       userid = self.id;
     }catch{
         userid = null;
     } 
     let streams =[]; 
     if(userid){
        streams = await db.stream.findMany({
            where:{ 
                user:{
                    NOT:{
                        blocking:{
                            some:{
                                blockedId:userid
                            }
                        }
                    }
                },
                OR:[
                  {
                    name:{
                        contains:term
                    }
                  }, 
                  {
                    user:{
                        username:{
                            contains:term
                        }
                    }
                  }
                ]
            }, 
            select:{
                user:true,
                id:true, 
                name:true, 
                isLive:true, 
                thumbnail:true, 
                updatedAt:true, 

            }, 
            orderBy:[
                {
                    isLive:"desc",
                }, 
                {
                    updatedAt:"desc",
                }
            ]
        })
           
     }else{
        streams = await db.stream.findMany({
            where:{
                OR:[
                  {
                    name:{
                        contains:term
                    }
                  }, 
                  {
                    user:{
                        username:{
                            contains:term
                        }
                    }
                  }
                ]
            }, 
            select:{
                user:true,
                id:true, 
                name:true, 
                isLive:true, 
                thumbnail:true, 
                updatedAt:true, 

            }, 
            orderBy:[
                {
                    isLive:"desc",
                }, 
                {
                    updatedAt:"desc",
                }
            ]
        })
     } 
     return streams;
}