import React from "react";
import {cn} from "@/lib/utils";
interface badgeprop{
    className?:string
}
const Badge = ({className}:badgeprop) => {
  return (
      <div className={cn("bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] border border-background font-semibold tracking-wide")}>
          Live
      </div>
  );
};

export default Badge;