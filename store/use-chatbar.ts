import {create} from "zustand";
export enum Chatvariant{
    CHAT = "CHAT", 
    COMMUNITY ="COMMUNITY"
}
interface sidebarstore{
    variant:Chatvariant,
    collapsed:boolean,
    onExpand:()=>void,
    onCollapsed:()=>void; 
    onChangeVariant: (variant:Chatvariant)=>void
}

export const useChatSidebar = create<sidebarstore>((set)=>({
    collapsed:false, 
    variant:Chatvariant.CHAT,
    onExpand:()=>set(()=>({collapsed:false})),
    onCollapsed:()=>set(()=>({collapsed:true})), 
   onChangeVariant:(variant:Chatvariant)=>set(()=>({variant}))
}))