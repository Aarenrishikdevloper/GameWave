"use client";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {CheckCheck, Copy} from "lucide-react";

interface CopyButtonProps{
    value?:string
}
export const CopyButton = ({value}:CopyButtonProps)=>{
    const[isCopied, setIsCopied] = useState(false)
    const Icon = isCopied?CheckCheck:Copy
    const Oncopy=()=>{
        if(!value) return
        setIsCopied(true)
        navigator.clipboard.writeText(value);
        setTimeout(()=>{
            setIsCopied(false)
        },1000)
    }
    return(
        <Button variant={'ghost'} size={'sm'} disabled={!value || isCopied} onClick={Oncopy} >
           <Icon className={"h-4 w-4"}/>
       </Button>
    )
}