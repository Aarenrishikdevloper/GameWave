"use client"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {AlertTriangle} from "lucide-react";
import {IngressInput} from "livekit-server-sdk";
import {ElementRef, useRef, useState, useTransition} from "react";
import {createIngress} from "@/action/ingress";
import {toast} from "sonner";
const RTMPS = String(IngressInput.RTMP_INPUT)
const WHIPS = String(IngressInput.WHIP_INPUT)
type IngressType  = typeof RTMPS | typeof WHIPS
export const ConnectModal =()=>{
    const closeRef = useRef<ElementRef<'button'>>(null);
    const [isPending,startTransition] = useTransition();
    const[ingressType, setIngresssType] = useState<IngressType>(RTMPS)
    const onSubmit = ()=>{
        startTransition(()=>{
            createIngress(parseInt(ingressType)).then(()=>{
                toast.success("Ingress created");
                closeRef.current?.click();
            })
        })
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"primary"}>
                    Generate Connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>

                </DialogHeader>
                <Select disabled={isPending} value={ingressType} onValueChange={(value)=>setIngresssType(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMPS}>RTMPS</SelectItem>
                        <SelectItem value={WHIPS}>WHIPS</SelectItem>

                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className={"h-4 w-4"}/>
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This Action will reset all active Streams using the current connection
                    </AlertDescription>
                </Alert>
                <div  className={'flex justify-between'}>
                    <DialogClose ref={closeRef}>
                       <Button variant={"ghost"}>
                           Cancel
                       </Button>
                   </DialogClose>
                    <Button variant={"primary"} onClick={onSubmit} disabled={isPending}>
                        Generate
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}




