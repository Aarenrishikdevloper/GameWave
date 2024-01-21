import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {ToggleCardSkeleton} from "@/app/(dashboard)/u/[username]/chat/_Components/ToggleCard";

const Loading = () => {
    // Your component logic here

    return (
        <div className={'p-6 space-y-4'}>
            {/* Your JSX content here */}
            <Skeleton className={"h-10 space-y-4"}/>
            <div className={'space-y-4'}>
                <ToggleCardSkeleton/>
                <ToggleCardSkeleton/>
                <ToggleCardSkeleton/>

            </div>
        </div>
    );
};

export default Loading