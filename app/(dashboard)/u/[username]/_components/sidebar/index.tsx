import {Wrapper} from "@/app/(dashboard)/u/[username]/_components/sidebar/wrapper";
import {Toggle} from "@/app/(dashboard)/u/[username]/_components/sidebar/togle";
import {Navigation} from "@/app/(dashboard)/u/[username]/_components/sidebar/Navigation";

export const Sidebar = ()=>{
    return(
        <Wrapper>
            <Toggle/>
          <Navigation/>
        </Wrapper>
    )
}