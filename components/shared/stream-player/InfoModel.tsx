'use client';
interface Infomodelprops{
    intialName: string; 
    intialThumbnailUrl: string | null;
} 
import { Updatestream } from "@/action/stream";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React, { ElementRef, useRef, useState, useTransition } from 'react'
import { toast } from "sonner";
import Hint from "../label";
import { Trash } from "lucide-react"; 
import Image from "next/image";


const InfoModel = ({intialName, intialThumbnailUrl}:Infomodelprops) => { 
    const[name, setname] = useState(intialName); 
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
       setname(e.target.value);
    }  
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault(); 
       startTransition(()=>{
        Updatestream({name:name}).then(()=>{
            toast.success("Stream info updated"); 
            closeref.current?.click();
        }).catch(()=>toast.error("Something went wrong"));
       })
    }  
    const onRemove = ()=>{
        
       startTransition(()=>{
        Updatestream({thumbnail:null}).then(()=>{
            toast.success("Thumbnail Removed successfully");  
            setThumnail('');
            closeref.current?.click();
        }).catch(()=>toast.error("Something went wrong"));
       })
    } 
    const[thumbnail, setThumnail]=useState( intialThumbnailUrl)
    const[ispending, startTransition] = useTransition(); 
    const closeref = useRef<ElementRef<"button">>(null); 
    const router = useRouter()
  return (
    <Dialog>
    <DialogTrigger asChild >
       <Button variant={'link'} size={'sm'} className="ml-auto">Edit</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Stream Info</DialogTitle>
     
      </DialogHeader> 
        <form className="space-y-14" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>
                Name
            </Label> 
            <Input placeholder="Stream Name" value={name} onChange={onChange} disabled={ispending}/> 
           <div className=" space-y-2">
            <Label>Thumbnail</Label>
            {thumbnail?(
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                    <div className="absolute top-0 right-2 z-10">
                         <Hint label="Remove Thumbnail" asChild side="left" >
                            <Button type="button" disabled={ispending} className="h-auto w-auto p-1.5" onClick={onRemove}>
                                 <Trash className="h-4 w-4"/>
                            </Button>
                         </Hint>
                    </div> 
                    <Image fill src={thumbnail} alt={name} className='object-cover' />
                </div>
            ):(
                <div className="rounded-xl  border outline outline-muted">
                <UploadDropzone endpoint="thumbnailUploader" appearance={{
                    label:{color: "#FFFFFF",}, 
                    allowedContent:{color: "#FFFFFF"}, 
                    
                }} onClientUploadComplete={(res)=>{
                    setThumnail(res?.[0].url); 
                    router.refresh(); 
                    closeref?.current?.click();

                }}/>
            </div>
            )}
           </div>
          </div> 
          <div className="flex justify-between">
             <DialogClose ref={closeref}>
                <Button type="button" variant={'ghost'}>
                  Cancel
                </Button>
             </DialogClose> 
             <Button variant={'primary'} type="submit" disabled={ispending}>
                Submit
             </Button> 
          </div>
        </form>    
    </DialogContent>
  </Dialog>
  
  )
}

export default InfoModel