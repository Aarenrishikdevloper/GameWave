import React from "react";
import {getselfusername} from "@/lib/auth-service";
import {redirect} from "next/navigation";
import {Navbar} from "@/app/(dashboard)/u/[username]/_components/Navbar/Navbar";
import {Sidebar} from "@/app/(dashboard)/u/[username]/_components/sidebar";
import {Container} from "@/app/(dashboard)/u/[username]/_components/sidebar/container";


interface  layoutparams {
    children:React.ReactNode;
    params:{username:string}


}

const Layout = async({children, params}:layoutparams)=>{

    return(
        <>
          <Navbar/>
            <div className={"flex h-full pt-20"}>
                <Sidebar/>
                <Container>
                {children}
                </Container>
            </div>
        </>
    )
}
export default Layout