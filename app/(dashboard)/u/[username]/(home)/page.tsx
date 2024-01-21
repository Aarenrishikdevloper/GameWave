import {StreamPlayer} from "@/components/shared/stream-player";
import {currentUser} from "@clerk/nextjs";
import {getusername} from "@/lib/user-service";
interface CreatorPageparams{
    params:{username:string}
}
const page = async({params}:CreatorPageparams)=>{
    const externalUser = await currentUser();
    const user = await getusername(params.username)
    if(!user || user.externalUserId !== externalUser?.id || !user.stream ){
        throw new Error("Unauthorize");
    }
    return(
        <div className={"h-full"}>
            <StreamPlayer user={user} stream={user.stream} isFollowing={true}/>
        </div>
    )
}
export default page