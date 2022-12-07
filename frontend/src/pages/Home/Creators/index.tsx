import { useState } from 'react'
import { Link } from 'react-router-dom'
import Creator from '../../../components/Creator'
import { CreatorType } from '../../../types'
import './style.scss'

const creatorList = [
  {
    name: 'Ryan Azhari',
    avatar: '/images/avatar1.png',
    id: 'azhary_an74',
    totalAssets: 5.092,
    followers: 527,
    topNFTs: ['/images/nft1.png', '/images/nft2.png', '/images/nft3.png'],
  },
  {
    name: 'Ryan Azhari',
    avatar: '/images/avatar1.png',
    id: 'azhary_an74',
    totalAssets: 5.092,
    followers: 527,
    topNFTs: ['/images/nft4.png', '/images/nft3.png', '/images/nft2.png'],
  },
  {
    name: 'Ryan Azhari',
    avatar: '/images/avatar1.png',
    id: 'azhary_an74',
    totalAssets: 5.092,
    followers: 527,
    topNFTs: ['/images/nft4.png', '/images/nft2.png', '/images/nft3.png'],
  },
  {
    name: 'Ryan Azhari',
    avatar: '/images/avatar1.png',
    id: 'azhary_an74',
    totalAssets: 5.092,
    followers: 527,
    topNFTs: ['/images/nft4.png', '/images/nft2.png', '/images/nft3.png'],
  },
  {
    name: 'Ryan Azhari',
    avatar: '/images/avatar1.png',
    id: 'azhary_an74',
    totalAssets: 5.092,
    followers: 527,
    topNFTs: ['/images/nft4.png', '/images/nft2.png', '/images/nft3.png'],
  },
  {
    name: 'Ryan Azhari',
    avatar: '/images/avatar1.png',
    id: 'azhary_an74',
    totalAssets: 5.092,
    followers: 527,
    topNFTs: ['/images/nft4.png', '/images/nft2.png', '/images/nft3.png'],
  },
]

const Creators = () => {
  return (
    <div className="creators-container">
      <div className="title">
        <h3>
          Top NFT Assets <Link to="/nfts">Creators</Link>
        </h3>
        {/* <div className="showmore-btn">
          <Link to="/nfts">Show more</Link>
        </div> */}
      </div>
      <div className="creatorCards">
        {creatorList.map((item: CreatorType, index: number) => (
          <Creator
            name={item.name}
            avatar={item.avatar}
            id={item.id}
            totalAssets={item.totalAssets}
            followers={item.followers}
            topNFTs={item.topNFTs}
          />
        ))}
      </div>
    </div>
  )
}

export default Creators
