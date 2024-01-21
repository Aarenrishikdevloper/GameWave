'use client'
import React, {useTransition} from 'react';
import {Switch} from "@/components/ui/switch";
import {Updatestream} from "@/action/stream";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";
type FieldType = "isChatEnabled"|"isChatDelayed" | "isChatFollowersOnly"
interface ToggleCardprops {

  label:string;
  value:boolean;
  field:FieldType
}
const ToggleCard = ({label,value=false, field}:ToggleCardprops) => {
    // Your component logic here
    const [isPending,startTransition] = useTransition()
    const OnChange = ()=> {
        // @ts-ignore
        startTransition(()=> {
                Updatestream({[field]: !value}).then(() => toast.success("Chat Settings Updated")).catch(() => toast.error("Something went wrong"))
            }
        )
    }
    return (
        <div className={"rounded-xl bg-muted p-6"}>

            <div className={"flex items-center justify-between"}>
              <p className={"font-semibold shrink-0"}>
                  {label}
              </p>
                <div className={"space-y-2"}>
                    <Switch disabled={isPending} checked={value} onCheckedChange={OnChange}>
                        {value?"On":"Off"}
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default ToggleCard

export const ToggleCardSkeleton = ()=>{
    return(
        <Skeleton className={'rounded-xl p-10 w-full'}/>
    )
}