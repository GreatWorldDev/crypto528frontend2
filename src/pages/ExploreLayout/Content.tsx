/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Card } from '../../components/card'
import { CustomDropdown } from '../../components/customDropdown'
import { Loading } from '../../components/Loading'
import { fetchGetApi } from '../../utils/backendApi'
import { FilterType, TypeExplorerFilter, TypeNFT } from '../../types'

const sortsList: FilterType[] = [
  { title: 'time.desc', slug: 'Newest' },
  { title: 'time.asc', slug: 'Oldest' },
  { title: 'price.desc', slug: 'Most Expensive' },
  { title: 'followerCount.desc', slug: 'Most Famous' },
]
interface ExplorerContentProps {
  filters: TypeExplorerFilter
  updateFilters: (payload: any) => void
}

export const ExplorerContent = ({
  filters,
  updateFilters,
}: ExplorerContentProps) => {
  const [isProcess, setIsProcess] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<FilterType>(sortsList[0])
  const [cards, setCards] = useState<TypeNFT[]>([])
  const [curPage, setCurPage] = useState<number>(0)
  const [isLast, setIsLast] = useState<boolean>(false)

  const getNFTs = async (page: number = 0, size: number = 20) => {
    setIsProcess(true)
    try {
      let apiUrl = `api/search/nft?`

      // eslint-disable-next-line no-param-reassign
      if (filters.searchText === undefined) filters.searchText = ''
      if (filters.searchText !== '') apiUrl += `keyword=${filters.searchText}&`
      if (filters.status !== 'all') apiUrl += `isSale=${filters.status}&`
      if (filters.category !== 'all') apiUrl += `category=${filters.category}&`

      apiUrl += `sortType=${sortBy.title}&`

      if (filters.price.startPrice != '')
        apiUrl += `minPrice=${filters.price.startPrice}&`
      if (filters.price.endPrice != '')
        apiUrl += `maxPrice=${filters.price.endPrice}&`
      apiUrl += `page=${page}&size=${size}`

      const res = await fetchGetApi(apiUrl)

      if (res?.data) {
        setCards(page === 0 ? res.data : [...cards, ...res.data])
        setIsLast(res.isLast)
      }
      setIsProcess(false)
    } catch (err) {
      console.log(err)
      setIsProcess(false)
    }
  }

  useEffect(() => {
    getNFTs()
    setCurPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy])

  return (
    <div className="content">
      <div className="py-12 px-4 flex justify-end">
        <div className="searchbar size-auto w-full text-lg">
          <input
            type="text"
            value={filters.searchText || ''}
            placeholder="Search NFTs..."
            onChange={e => {
              updateFilters({ searchText: e.target.value })
            }}
          />
        </div>
        <div className="size-auto flex-shrink-0 ml-5 bg-transparent py-4 z-20">
          <CustomDropdown
            className="w-full"
            selected={sortBy.slug}
            lists={sortsList.map(x => x.slug)}
            handleSelect={item => {
              setSortBy(sortsList.filter(x => x.slug === item)[0])
            }}
          />
        </div>
      </div>
      {cards.length > 0 ? (
        <>
          <div className="grid 2xl:grid-cols-5 2xl:gap-4 px-5 xl:grid-cols-4 lg:grid-cols-3 gap-4">
            {cards &&
              cards.map((card: TypeNFT, index: number) => (
                <div key={`card-${index}`}>
                  <Card item={card} />
                </div>
              ))}
          </div>
          {/* {!isLast && ( */}
          <div className="flex justify-center py-20">
            <button
              className="bg-btn-main view-more py-8"
              disabled={isProcess}
              onClick={() => {
                getNFTs(curPage + 1)
                setCurPage(curPage + 1)
              }}
            >
              {isProcess ? 'Loading...' : 'View more'}
            </button>
          </div>
          {/* )} */}
        </>
      ) : isProcess ? (
        <p className="text-white text-center py-40 text-xl">Loading...</p>
      ) : (
        <p className="text-white text-center py-40 text-xl">No NFT yet</p>
      )}
    </div>
  )
}
