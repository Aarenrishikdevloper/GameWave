'use client'
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SearchIcon, X} from "lucide-react";
import qs from "query-string";
import {useRouter} from "next/navigation";
 export const Search = () => {
     const [value, setvalue] = useState('');
     const router = useRouter();
     const onSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault(); 
         
         if(!value){
             return
         }
         const newurl = qs.stringifyUrl({
             url:'/search',
             query:{term:value},

         },{skipEmptyString:true})
         router.push(newurl);
     }
     const clear = ()=>{
         setvalue("");
     }

  return (
      <form onSubmit={onSubmit} className={'relative w-full lg:w-[400px] flex items-center'}>
          <Input className={'rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'} placeholder={"Search"} value={value} onChange={(e)=>setvalue(e.target.value)}/>
          {value &&(
              <X className={'absolute top-2.5 right-14 h-5 w-5 text-muted-foreground  cursor-pointer hover:opacity-75 transition'} onClick={clear}/>
          )}
          <Button type={'submit'} size={'sm'} variant={"secondary"} className={'rounded-l-none'}>
              <SearchIcon className={'h-5 w-5 text-muted-foreground'}/>
          </Button>


      </form>
  );
};

