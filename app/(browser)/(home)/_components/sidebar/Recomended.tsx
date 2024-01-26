'use client'
import {User} from ".prisma/client";
import {useSidebar} from "@/store/use-sidebar";
import {Useritem, UserItemSkeleton} from "@/app/(browser)/(home)/_components/sidebar/Useritem";

interface recomendedprops{
    data:(User &{stream:{isLive:boolean} | null})[]
}
export const Recomended = ({data,}:recomendedprops)=>{
    const{collapsed}= useSidebar((state)=>state)
    const showlabel = !collapsed &&data.length >0
    return(
       <div>
           {showlabel &&(
               <div className={"pl-6 mb-4"}>
                   <p className={'text-sm text-muted-foreground'}>Recomended</p>
               </div>
           )}
           <ul className={'space-y-2 px-2'}>
               {data.map((user)=>(
                   <Useritem username={user.username} imageUrl={user.imageUrl} islive={user.stream.isLive} key={user.id}/>
               ))}
           </ul>
       </div>
    )
}
export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    );
};
