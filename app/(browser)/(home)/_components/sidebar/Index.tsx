import {Wrapper} from "@/app/(browser)/(home)/_components/sidebar/wrapper";
import {Toggle, ToggleSkeleton} from "@/app/(browser)/(home)/_components/sidebar/toggle";
import {Recomended, RecommendedSkeleton} from "@/app/(browser)/(home)/_components/sidebar/Recomended";
import {getRecomended} from "@/lib/Recomended-service";
import {getfollowuser} from "@/lib/Follow_service";
import {Follower, FollowSkeleton} from "@/app/(browser)/(home)/_components/sidebar/Followitem";

export const Sidebar = async()=>{
    const recomended = await getRecomended();
    const follow = await getfollowuser()

    return(
        <Wrapper>
          <Toggle/>
            <div className={"space-y-4 pt-4 lg:pt-0"}>
                <Follower data={follow}/>

                <Recomended data={recomended}/>
            </div>
        </Wrapper>
    )
}
export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton />
            <FollowSkeleton/>
            <RecommendedSkeleton />
        </aside>
    );
};
