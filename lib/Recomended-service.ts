import {db} from "@/lib/db";
import {getSelf} from "@/lib/auth-service";
import {GetResult} from "@prisma/client/runtime/library";
import {Null} from "asn1js";
import {id} from "postcss-selector-parser";

export const getRecomended = async()=>{
    let userid;
    try {
        const self = await getSelf();
        userid = self.id
    }catch  {
        userid = null
    }
    let users = []
    if(userid){

        users = await db.user.findMany({
            where:{
               AND:[
                   {
                       NOT:{id:userid},

                   },
                   {
                       NOT: {
                           followedBy: {
                               some: {
                                   followerId: userid
                               }
                           }
                       },
                   },
                   {
                       NOT: {
                           blocking:{
                               some:{
                                   blockedId:userid,
                               }
                           }
                       }
                   }
               ],

            },
            include:{
                stream:{
                    select:{isLive:true}
                }
            }, orderBy:[{
                stream:{isLive:"desc"}

            },
                {createdAt:"desc"}
            ]
        })


    }else{
        users = await db.user.findMany({ orderBy:{createdAt:"desc"},include:{stream:{select:{isLive:true}}}});


    }
    return users

}