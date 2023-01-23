import React from 'react'
import { AnimeList_Page_media as Media } from '../../../graphql/animeList/__generated__/AnimeList'
import { AnimeCard, AnimeCardContent, AnimeCover } from '../../styles/AnimeStyles'

type AnimeItemProps = {
  anime: Media, 
}

const AnimeItem: React.FC<AnimeItemProps> = ({ anime }) => {
  const studioName = anime.studios?.edges?.filter(studio => studio?.isMain)[0]?.node?.name

  return (
    <AnimeCard key={`anime-card-${anime.id}`}>
      <AnimeCardContent>
        <AnimeCover>
          <img alt={anime.title?.english || ''} src={anime.coverImage?.extraLarge || ''} />
        </AnimeCover>
        <div tw='p-1 relative'>
          <div tw='flex justify-between text-sm mb-8'>
            <div tw='text-sm text-gray-500 font-medium py-1.5'>{anime.season} {anime.seasonYear}</div>
            <div tw='text-xl text-yellow-400 font-bold'>{anime.meanScore}</div>
          </div>
          <div tw='text-sm font-normal text-gray-500 mb-4'>{anime.title?.romaji}</div>
          <div tw='absolute bottom-0'>
            <div tw='text-sm font-medium text-pink-500 mb-4'>{studioName}</div>
            <div tw='text-sm font-normal text-gray-500 mb-4'>{anime.format} - {anime.episodes} episodes</div>
            <div tw='flex'>
              {
                anime.genres?.slice(0, 2).map((genre, idx) => 
                  <div 
                    key={`genre-${idx}`} 
                    tw='text-[10px] font-normal text-gray-500 mb-4 px-2 py-1 rounded-full bg-yellow-500 text-white mx-1 mb-3'
                  > 
                    {genre} 
                  </div>
                )
              }
            </div>
          </div>
        </div> 
      </AnimeCardContent>
    </AnimeCard>
  )
}

export default AnimeItem

