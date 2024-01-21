'use client';
import React, { ElementRef, useRef, useState, useTransition } from 'react' 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'; 
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from '@radix-ui/react-dialog';
import { updateUser } from '@/action/user';
import { toast } from 'sonner';
interface Biomodalprops{
    intialvalue: string | null;
}
const Biomodal = ({intialvalue}:Biomodalprops) => { 
    const[value, setvalue] = useState(intialvalue || '') 
    const[ispending, startTransition]= useTransition();  
    const closeref = useRef<ElementRef<"button">>(null); 
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=> { 
        e.preventDefault();
      startTransition(()=>{
        updateUser({bio:value}).then(()=>{
            toast.success("User Bio was updated"); 
            closeref.current?.click()
        }).catch(()=>toast.error("Something went wrong"));
      })
    }
  return (
 <Dialog>
   <DialogTrigger asChild>
      <Button variant={'link'} size={'sm'} className='ml-auto'>
         Edit
      </Button>
   </DialogTrigger>
   <DialogContent>
     <DialogHeader>
       <DialogTitle>Edit User Bio</DialogTitle>
       
     </DialogHeader> 
     <form className='space-y-4' onSubmit={onSubmit}>
          <Textarea placeholder='User Bio' className='resize-none' value={value} onChange={(e)=>setvalue(e.target.value)} disabled={ispending}/> 
          <div className="flex justify-between">
             <DialogClose ref={closeref}>
                <Button type='button' variant={'ghost'}> 
                    Cancel
                </Button>
             </DialogClose>
             <Button type='submit' variant={'primary'} disabled={ispending}> 
                 Save
             </Button>
          </div>
     </form>
   </DialogContent>
 </Dialog>
  )
}

export default Biomodal
