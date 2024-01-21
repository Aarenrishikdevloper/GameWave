import {create} from "zustand";
interface sidebarstore{
    collapsed:boolean,
    onExpand:()=>void,
    onCollapsed:()=>void;
}

export const useDashSidebar = create<sidebarstore>((set)=>({
    collapsed:false,
    onExpand:()=>set(()=>({collapsed:false})),
    onCollapsed:()=>set(()=>({collapsed:true}))
}))