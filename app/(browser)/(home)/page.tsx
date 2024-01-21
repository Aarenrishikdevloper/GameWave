import {UserButton} from "@clerk/nextjs";
import Results from "./_components/Results";
import { Suspense } from "react";
import{ ResultSkeleton} from '../(home)/_components/Results'

export default function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultSkeleton/>}>
          <Results />
      </Suspense>
    </div>
  )
}
