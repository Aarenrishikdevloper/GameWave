import { StreamPlayerSkeleton } from '@/components/shared/stream-player'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-full'>
      <StreamPlayerSkeleton/>
    </div>
  )
}

export default Loading