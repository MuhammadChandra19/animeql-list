import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { AnimeList as AnimeListType, AnimeListVariables, AnimeList_Page_media } from './../graphql/animeList/__generated__/AnimeList'
import { QUERY_MEDIA_LIST } from './../graphql/animeList/queries.graphql'
import { AnimeContainer } from './styles/AnimeStyles'
import Pagination from './components/molecules/Pagination'
import AnimeListContainer from './components/organisms/AnimeListContainer'


const AnimeList: React.FC = () => {
  const [page, setPage] = useState(1)
  const { data, loading, error } = useQuery<AnimeListType, AnimeListVariables>(QUERY_MEDIA_LIST, { variables : { page , perPage: 12 }})

  const animeList = data?.Page?.media as AnimeList_Page_media[]
  const errorFecth = (error || !data) as boolean
  return (
    <div tw='max-w-6xl mx-auto pt-5 pb-5 h-full'>
      <div tw='text-xl font-bold mb-5'>Anime List</div>
      <AnimeContainer>
        <AnimeListContainer animeList={animeList} error={errorFecth} isLoading={loading}/>
        <Pagination
          action={(value) => setPage(value)}
          hasNextPage={data?.Page?.pageInfo?.hasNextPage || false } 
          currentPage={page}
        />
        {/* <TopAnime /> */}
      </AnimeContainer>
    </div>
  )
}

export default AnimeList
