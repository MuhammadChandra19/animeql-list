import React from 'react'
import { AnimeCard, AnimeCardAction, AnimeCardContent, AnimeCover } from '../../styles/AnimeStyles'

const AnimeItemSkeleton: React.FC<{ id: number }> = ({ id }) => (
  <AnimeCard tw='animate-pulse' data-testid={`anime-loading-${id}`}>
    <AnimeCardContent>
      <AnimeCover>
        <AnimeCardAction tw='bg-gray-700' />
      </AnimeCover>
      <div tw='p-1 relative'>
        <div tw='flex justify-between mb-8'>
          <div tw='h-10 w-full bg-gray-400 m-1 rounded'></div>
          <div tw='h-10 w-full bg-gray-400 m-1 rounded'></div>
        </div>
        <div tw='rounded w-full bg-gray-400 h-10'></div>
        <div tw='absolute bottom-0 w-[80%] m-1'>
          <div tw='rounded w-full bg-gray-400 h-10 mb-1'></div>
            <div tw='rounded w-full bg-gray-400 h-10'></div>
        </div>
      </div>
    </AnimeCardContent>
  </AnimeCard>
)

export default AnimeItemSkeleton