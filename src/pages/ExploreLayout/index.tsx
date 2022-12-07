/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { useState } from 'react'
import Header from '../../components/Header/ExploreHeader'
import { TypeExplorerFilter } from '../../types'
import ExploreFilter from './Filter'
import { ExplorerContent } from './Content'
import './style.scss'

const initFilter: TypeExplorerFilter = {
  searchText: '',
  status: 'all',
  price: { startPrice: '0', endPrice: '' },
  collection: 'all',
  category: 'all',
}

const Explore = () => {
  const [filters, setFilters] = useState<TypeExplorerFilter>(initFilter)

  const updateFilter = (payload: any) => {
    setFilters({ ...filters, ...payload })
  }
  const resetFilter = () => {
    setFilters(initFilter)
  }

  return (
    <div className="explore-wrapper">
      <Header />
      <div className="explore-content">
        <ExploreFilter
          filters={filters}
          updateFilter={updateFilter}
          resetFilter={resetFilter}
        />
        <ExplorerContent filters={filters} updateFilters={updateFilter} />
      </div>
    </div>
  )
}

export default Explore
