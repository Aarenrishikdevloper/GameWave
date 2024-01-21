import {getSelf} from "@/lib/auth-service";
import {getStreamService} from "@/lib/stream-service";
import UrlCard from "@/app/(dashboard)/u/[username]/keys/_components/UrlCard";
import { KeyCard } from "./_components/KeyCard";
import {ConnectModal} from "@/app/(dashboard)/u/[username]/keys/_components/ConnectModel";

const app= async()=>{
    const self = await getSelf();
    const stream = await getStreamService(self.id)
    if(!stream){
        throw new Error("Stream not found")
    }
    // @ts-ignore
    // @ts-ignore
    return (
        <div className={'p-6'}>
            <div className={"flex items-center justify-between font-bold mb-4"}>
                <h1 className={"text-2xl font-bold"}>Keys & Urls</h1>
                <ConnectModal/>
           </div>
            <div className={"space-y-4"}>
                <UrlCard value={stream.serverUrl}/>
                <KeyCard value={stream.streamkey}/>
            </div>
        </div>
    )
}
export default app