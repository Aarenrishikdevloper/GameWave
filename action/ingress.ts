'use server'
import {getSelf} from "@/lib/auth-service";
import {
    type CreateIngressOptions,
    IngressAudioEncodingPreset,
    IngressClient,
    IngressInput,
    IngressVideoEncodingPreset,
    RoomServiceClient
} from "livekit-server-sdk";
import {TrackSource} from "livekit-server-sdk/dist/proto/livekit_models";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";

const roomservice = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)
const ingressClient = new IngressClient( process.env.LIVEKIT_API_URL! );
export const resetIngress = async(hostIndentity:string)=>{
    const ingresses = await ingressClient.listIngress({roomName:hostIndentity})
    const rooms  = await roomservice.listRooms([hostIndentity]);
    for(const room of rooms){
        await roomservice.deleteRoom(room.name)
    }
    for(const ingress of ingresses){
        if(ingress.ingressId){
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }
}

export const createIngress = async(ingressType:IngressInput)=>{
    const self = await getSelf();
    await resetIngress(self.id)
    const options:CreateIngressOptions={
        name:self.username,
        roomName:self.id,
        participantName:self.username,
        participantIdentity:self.id
    }
    if(ingressType === IngressInput.WHIP_INPUT){
        option.bypassTranscoding = true
    }else{
        option.video = {
            source:TrackSource.CAMERA,
            preset:IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,

        };
       option.audio = {
           source:TrackSource.MICROPHONE,
           preset:IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
       }
    }
    const ingress = await ingressClient.createIngress(
        ingressType,
        options
    )
    if(!ingress || !ingress.url || !ingress.streamKey){
        throw new Error("Something Went wrong")
    }
    await db.stream.update({where:{userId:self.id},data:{ingressId:ingress.ingressId, serverUrl:ingress.url, streamkey:ingress.streamKey}});
    revalidatePath(`/u/${self.username}/keys`);
    return ingress;
}
