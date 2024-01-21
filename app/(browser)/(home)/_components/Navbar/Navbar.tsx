import {Logo} from "@/app/(browser)/(home)/_components/Navbar/Logo";
import {Search} from "@/app/(browser)/(home)/_components/Navbar/search";
import {Action} from "@/app/(browser)/(home)/_components/Navbar/action";
export const Navbar = ()=>{
    return(
       <nav className={'fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center'}>

          <Logo/>
           <Search/>
           <Action/>
       </nav>
    )

}