"use server";
import {Stream} from "@prisma/client";
import {getSelf} from "@/lib/auth-service";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";

export const Updatestream = async(values:Partial<Stream>)=>{
    try {
        const self = await getSelf();
        const selfstream = await db.stream.findUnique({where: {userId: self.id}})
        if (!selfstream) {
            throw new Error(" stream not found")
        }

        const Validata = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed, 
            thumbnail: values.thumbnail

        }
        const stream = await db.stream.update({
            where:{userId:self.id}, data:{...Validata}

        })
        revalidatePath(`/u/${self.username}/chat`);
        revalidatePath(`/u${self.username}`)
        revalidatePath(`/u/${self.username}`)
        return stream

    }catch (e){
        throw new Error("internal Error")
    }
}