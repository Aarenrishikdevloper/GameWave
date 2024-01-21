import {getSelf} from "@/lib/auth-service";
import {getStreamService} from "@/lib/stream-service";
import ToggleCard from "@/app/(dashboard)/u/[username]/chat/_Components/ToggleCard";

const ChatPage = async()=>{
    const self = await getSelf();
    const stream = await getStreamService(self.id)
    if(!stream){
        throw new Error("Stram Not Found");
    }
    return(
        <div className="p-6">
            <div className="mb-4">
                <h1 className={"text-2xl font-bold"}>
                    Chat Settings
                </h1>
            </div>
            <div className={"space-y-4"}>
                <ToggleCard field={"isChatEnabled"} label={"Enable Chat"} value={stream.isChatEnabled}/>
                <ToggleCard field={"isChatDelayed"} label={"Delay Chat"} value={stream.isChatDelayed }/>
                <ToggleCard label={"Following Chat only"} field={"isChatFollowersOnly"} value={stream.isChatFollowersOnly}/>
            </div>
        </div>
    )
}

export default ChatPage