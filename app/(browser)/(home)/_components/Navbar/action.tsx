
import React from "react";
import {currentUser, SignInButton, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Clapperboard} from "lucide-react";

export const Action  = async() => {
    const user = await currentUser();
  return (
    <div className={'flex items-center justify-end gap-x-2 ml-4 lg:ml-0'}>
        {!user &&(
           <SignInButton>
               <Button size={'sm'} variant={'primary'}>
                   Login
               </Button>
           </SignInButton>
        )}
        {!!user && (
            <div className={'flex items-center gap-x-4'}>
                <Button asChild size={'sm'} variant={'ghost'} className={'text-muted-foreground'}>
                    <Link href={`/u/${user.username}`}>
                        <Clapperboard className={'h-5 w-5 lg:mr-2'}/>
                        <span className={'hidden lg:block'}> Dashboard</span>
                    </Link>

                </Button>
                <UserButton afterSignOutUrl={'/'}/>
            </div>
        )}
    </div>
  );
};

