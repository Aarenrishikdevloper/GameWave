'use server'
import {getSelf} from "@/lib/auth-service";
import {v4} from "uuid";
import {getuserbyid} from "@/lib/user-service";
import {isBlockedbyuser} from "@/lib/block-service";
import {AccessToken} from "livekit-server-sdk";

export const createViewerToken = async(hostIdentity:string)=> {
    let self; 
    try {
        self = await getSelf()
    }catch (e) {
        const id = v4();
        const username = `guest#${Math.floor(Math.random()*1000)}`
        self = {id,username}
    }

    const host = await getuserbyid(hostIdentity)
    if(!host){
        throw new Error("user not found");
    }
    const isblocked  = await isBlockedbyuser(host.id);
    if(isblocked){
        throw new Error("user is blocked")
    }
    const ishost = self.id === host.id

   const token = new AccessToken(
       process.env.LIVEKIT_API_KEY!,
       process.env.LIVEKIT_API_SECRET!,
       {
           identity:ishost ?`host-${self.id}`:self.id, name:self.username
       }
   )
    token.addGrant({
        room:host.id,
        roomJoin:true,
        canPublish:false,
        canPublishData:true,
    })
    return await Promise.resolve(token.toJwt());



}