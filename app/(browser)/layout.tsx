
import React, {Suspense} from "react";
import {Navbar} from "@/app/(browser)/(home)/_components/Navbar/Navbar";
import {Sidebar, SidebarSkeleton} from "@/app/(browser)/(home)/_components/sidebar/Index";
import {Container} from "@/app/(browser)/(home)/_components/sidebar/Container";

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
   <>
       <Navbar/>
      <div className={'flex h-full pt-20'}>
          <Suspense fallback={<SidebarSkeleton/>}>
          <Sidebar/>
          </Suspense>
          <Container>
           {children}
          </Container>
      </div>
   </>
  );
};

export default Layout;