import React from 'react'
import { AnimeList_Page_media } from '../../../graphql/animeList/__generated__/AnimeList'
import { AnimeContainer, AnimeListItem } from '../../styles/AnimeStyles'
import AnimeItem from '../molecules/AnimeItem'
import AnimeItemSkeleton from '../molecules/AnimeITemSkeleton'


type AnimeListContainerProps = {
  animeList: AnimeList_Page_media[]
  isLoading: boolean
  error: boolean
}


const AnimeListContainer:React.FC<AnimeListContainerProps> = ({ animeList, isLoading, error }) => {

  if (isLoading) {
    return (
      <AnimeListItem>
        {
          new Array(18).fill({}).map((_, idx) => <AnimeItemSkeleton id={idx} key={`anime-card-${idx}`} />)
        }
      </AnimeListItem>
    )
  }

  if (error) {
    return <AnimeContainer>ERROR</AnimeContainer>
  }

  return (
    <AnimeListItem>
    {
      animeList.map((anime, idx) => {
        if(anime) {
          return (<AnimeItem key={`anime-card-${idx}`} anime={anime} />)
        }
      })
    }
    </AnimeListItem>
  )
}

export default AnimeListContainer


