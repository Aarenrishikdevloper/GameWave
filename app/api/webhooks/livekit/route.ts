import {WebhookReceiver} from "livekit-server-sdk";
import {headers} from "next/headers";
import {db} from "@/lib/db";
import { NextResponse } from "next/server";

const reciever = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)
export async function POST(req:Request){
    const body = await req.text();
    const headpayload = headers()
    const authorization = headpayload.get("Authorization");
    if(!authorization){
        return new Response("No authorization header",{status:400})
    }

    const event = reciever.receive(body,authorization);
    if(event.event === "ingress_started"){
        await db.stream.update({
            where:{ingressId:event.ingressInfo?.ingressId},
            data:{isLive:true}
        })
    }
    if(event.event === "ingress_ended"){
        await db.stream.update({
            where:{ingressId:event.ingressInfo?.ingressId},
            data:{isLive:false}
        })
    } 
    return new Response('', { status: 200 });
}