/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { useState } from 'react'
import { FilterExpand } from '../../components/FilterExpand'
import { TypeExplorerFilter } from '../../types'
import './style.scss'

const statuses = [
  { title: 'all', slug: 'ALL' },
  { title: '0', slug: 'NOT ON SALE' },
  { title: '1', slug: 'LISTED ON SALE' },
  { title: '2', slug: 'LIVE AUCTION' },
  { title: '3', slug: 'HAS OFFERS' },
]

const initFilter: TypeExplorerFilter = {
  searchText: '',
  status: 'all',
  price: { startPrice: '0', endPrice: '' },
  collection: 'all',
  category: 'all',
}

const categories = [
  { title: 'all', slug: 'All' },
  { title: 'Republik Extraterrestrials', slug: 'Republik Extraterrestrials' },
  { title: 'Republik Artists', slug: 'Republik Artists' },
  { title: 'Good Vibes Only', slug: 'Good Vibes Only' },
  { title: 'Republik Cryptonaires', slug: 'Republik Cryptonaires' },
  { title: 'The Crypto Syndicate', slug: 'The Crypto Syndicate' },
  { title: 'Republik Supernaturals', slug: 'Republik Supernaturals' },
  { title: 'Republik Gym Rats', slug: 'Republik Gym Rats' },
  { title: 'Intergalactic Traveler', slug: 'Intergalactic Traveler' },
  { title: '528 Sports', slug: '528 Sports' },
  { title: 'Republik Pride', slug: 'Republik Pride' },
  { title: 'New World Order', slug: 'New World Order' },
  { title: 'Republik Services', slug: 'Republik Services' },
  { title: 'Republik OGs', slug: 'Republik OGs' },
  { title: 'Repbulik Horticulture', slug: 'Repbulik Horticulture' },
  { title: 'Republik Ocean Crew', slug: 'Republik Ocean Crew' },
  { title: 'The 528 Hub', slug: 'The 528 Hub' },
  { title: 'Republik Transportation', slug: 'Republik Transportation' },
]

const trendingLists: string[] = [
  'Newest',
  'Oldest',
  'Most Expensive',
  'Most Famous',
]

const currencyMap = [
  {
    title: 'United States Dollar (USD)',
    rate: 1,
  },
  {
    title: 'Ethereum Network (ETH)',
    rate: 10,
  },
]

interface ExplorerFilterProps {
  filters: TypeExplorerFilter
  updateFilter: (payload: any) => void
  resetFilter: () => void
}

const ExploreFilter = ({
  filters,
  updateFilter,
  resetFilter,
}: ExplorerFilterProps) => {
  const [endPrice, setEndPrice] = useState<string>(initFilter.price.endPrice)
  const [startPrice, setStartPrice] = useState<string>(
    initFilter.price.startPrice
  )
  const [currentCurrency, setCurrentCurrency] = useState<number>(0)
  const [active, setIsActive] = useState<boolean>(true)

  return (
    <div className={`filter ${active ? 'active' : ''}`}>
      <div className="relative w-full">
        <div className="hamburger" onClick={() => setIsActive(!active)}>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="title">
          <div>
            Filter
            <img src="/images/filter.png" alt="filter" />
          </div>
          <button onClick={resetFilter}>Reset</button>
        </div>
        <FilterExpand title="Status" open>
          {statuses.map((x: any, index: number) => (
            <button
              className="group-content text-white flex justify-between w-full py-4 mb-2 size-auto"
              key={`status-${index}`}
              onClick={() => {
                if (x.title !== filters.status)
                  updateFilter({ status: x.title })
              }}
            >
              {x.slug}
              <input type="checkbox" checked={filters.status === x.title} />
            </button>
          ))}
        </FilterExpand>
        <FilterExpand title="Price" open>
          <button
            className="w-full price-switch mt-4"
            onClick={() => {
              setCurrentCurrency((currentCurrency + 1) % currencyMap.length)
            }}
          >
            {currencyMap[currentCurrency].title}
          </button>
          <div className="flex gap-3 justify-between mb-5 mt-4">
            <div className="w-full p-3 price-border">
              <input
                type="number"
                className="bg-transparent border-none outline-none w-full text-center  start-price"
                value={startPrice}
                placeholder="Start price"
                onChange={e => {
                  setStartPrice(e.target.value)
                }}
              />
            </div>
            <div className="w-full p-3 price-border">
              <input
                type="number"
                className="bg-transparent border-none outline-none w-full text-center start-price"
                value={endPrice}
                placeholder="End price"
                onChange={e => {
                  setEndPrice(e.target.value)
                }}
              />
            </div>
          </div>
          <button
            className="bg-btn-main btn-price w-full text-lg font-bold"
            onClick={() => {
              if (
                startPrice !== filters.price.startPrice ||
                endPrice !== filters.price.endPrice
              )
                updateFilter({
                  price: { startPrice, endPrice },
                })
            }}
          >
            SET PRICE
          </button>
        </FilterExpand>
        <FilterExpand title="Category" open={false}>
          {categories.map((x: any, index: number) => (
            <button
              className="group-content text-white flex justify-between w-full py-4 mb-2 size-auto"
              key={`status-${index}`}
              onClick={() => {
                if (x.title !== filters.category)
                  updateFilter({ category: x.title })
              }}
            >
              {x.slug}
              <input type="checkbox" checked={filters.category === x.title} />
            </button>
          ))}
        </FilterExpand>
      </div>
    </div>
  )
}

export default ExploreFilter
