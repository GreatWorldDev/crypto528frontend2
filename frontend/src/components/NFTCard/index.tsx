import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/useAuth'
import { NFTCardType, TypeNFT } from '../../types'
import './style.scss'

interface PageProps {
  item: TypeNFT
}

const NFTCard = ({ item }: PageProps) => {
  const { user } = useAuthContext()
  const [isFollow, setIsFollow] = useState<boolean>(false)
  const [followerCount, setFollowerCount] = useState<number>(item.followerCount)

  return (
    <div className="card-item">
      <div className="card-image">
        <img src={item.image} alt="NFT Item" />
      </div>
      <div className="detail">
        <h5>{item.title}</h5>
        <div className="price">
          <div>
            <h6>Price</h6>
            <p>
              {item.price.toFixed(2)} {item.currencyType}
            </p>
          </div>
        </div>
        <Link to={`/nft/${item.tokenId}`}>
          <button type="button">View NFT</button>
        </Link>
      </div>
    </div>
  )
}

export default NFTCard
