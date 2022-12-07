/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom'
import { NFTCardType, TypeNFT } from '../../../types'
import NFTCard from '../../../components/NFTCard'
import './style.scss'
import { fetchGetApi } from '../../../utils/backendApi'
import { Card } from '../../../components/card'
import { Loading } from '../../../components/Loading'

const nftSort = ['latest', 'art', 'memes', 'music', 'videos', 'photos']
const nftList = [
  {
    title: 'Crystal Current Art',
    image: '/images/1.png',
    isOnSale: true,
    highestBid: 1.0084,
    minBid: 0.015,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
  {
    title: 'Deep Darkness Wave',
    image: '/images/1.png',
    isOnSale: false,
    highestBid: 0.259,
    minBid: 0.01,
  },
]

const Explore = () => {
  const { account, library, active, activate } = useWeb3React()
  const [selected, setSelected] = useState<string>(nftSort[0])
  const [isGetting, setIsGetting] = useState<boolean>(false)
  const [cards, setCards] = useState<TypeNFT[]>([])

  const getCards = () => {
    setIsGetting(true)
    fetchGetApi('api/search/nft?sortType=time.desc&page=0&size=20')
      .then(res => {
        if (res?.data && res.data.length > 0) {
          const allCards = res.data
          setCards(allCards)
        }
        setIsGetting(false)
      })
      .catch(err => {
        console.log(err)
        setIsGetting(false)
      })
  }

  useEffect(() => {
    getCards()
  }, [])

  return (
    <div className="explore-container">
      <h3>
        Explorer The <Link to="/nfts">Best NFTs</Link>
      </h3>
      {/* <div className="nftCategory">
        {nftSort.map((item: string, index: number) => (
          <button
            onClick={() => setSelected(item)}
            // eslint-disable-next-line react/no-array-index-key
            key={`nfts-${index}`}
            className={selected === item ? 'active' : ''}
            type="button"
          >
            {item}
          </button>
        ))}
      </div> */}
      {isGetting || !cards.length ? (
        <div className="my-24 text-lg">Loading...</div>
      ) : (
        <>
          <div className="grid 2xl:grid-cols-4 2xl:gap-4 px-5 xl:grid-cols-3 lg:grid-cols-2 gap-4">
            {cards.map((card: TypeNFT, index: number) => (
              <Card
                // eslint-disable-next-line react/no-array-index-key
                key={`nftCard-${index}`}
                item={card}
              />
            ))}
          </div>
          <div className="explore-btn">
            <Link to="/explore">Explore All</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Explore
