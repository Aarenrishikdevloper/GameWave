import {cva, type VariantProps} from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import Badge from "./Livebadge";

const avatarizes = cva(
    "",
    {
        variants:{
            size:{
                default:"h-8 w-8",
                lg:"h-14 w-14"
            }
        },
        defaultVariants:{
            size:"default"
        }
    }
)
interface Avatarprops extends VariantProps<typeof avatarizes>{
    username:string;
    imageUrl:string,
    isLive?:boolean,
    showbadge?:boolean
}
export const UserAvatar =({username,imageUrl,isLive, showbadge, size}:Avatarprops)=>{ 
   const  canshowbadge =  showbadge && isLive
   return(
      <div className={"relative"}>
          <Avatar className={cn(isLive && "ring-2 ring-rose-500 border border-background", avatarizes({size}))}>
              <AvatarImage src={imageUrl} className={"object-cover"} />
              <AvatarFallback>
                  {username[0]}
                  {username[username.length - 1]}
              </AvatarFallback>
          </Avatar>
          {canshowbadge&&(
            <Badge/>
          )}
      </div>
   )

}
interface UserAvatarSkeletonProps
    extends VariantProps<typeof avatarizes> {};

export const UserAvatarSkeleton = ({
                                       size,
                                   }: UserAvatarSkeletonProps) => {
    return (
        <Skeleton className={cn(
            "rounded-full",
            avatarizes({ size }),
        )} />
    );
};