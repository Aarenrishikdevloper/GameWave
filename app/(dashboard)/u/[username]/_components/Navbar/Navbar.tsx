import {Logo} from "@/app/(dashboard)/u/[username]/_components/Navbar/Logo";

import {Action} from "@/app/(dashboard)/u/[username]/_components/Navbar/action";

export const Navbar = ()=>{
    return(
       <nav className={'fixed top-0 w-full h-20 z-[49] bg-[#252731] lg:px-4 flex justify-between items-center px-2'}>

          <Logo/>

           <Action/>
       </nav>
    )

}