import React from 'react'
import { CreatorType } from '../../types'
import './style.scss'

const Creator = ({
  name,
  id,
  avatar,
  totalAssets,
  followers,
  topNFTs,
}: CreatorType) => {
  return (
    <div className="creator-item">
      <div className="header">
        <div>
          <img src={avatar} alt="creator" />
          <div>
            <h3>{name}</h3>
            <p>@{id}</p>
          </div>
        </div>
        <button type="button">
          <img src="/images/followIcon.png" alt="follow" />
          Follow
        </button>
      </div>
      <div className="statistics">
        <div>
          <h4>Total Assets</h4>
          <p>{totalAssets} ETH</p>
        </div>
        <div>
          <h4>Followers</h4>
          <p>{followers}</p>
        </div>
      </div>
      <h3>Top NFT Collection</h3>
      <div className="topnfts">
        <div>
          <img src={topNFTs[0]} alt="nft1" />
        </div>
        <div>
          <img src={topNFTs[1]} alt="nft1" />
        </div>
        <div>
          <img src={topNFTs[2]} alt="nft1" />
        </div>
      </div>
    </div>
  )
}

export default Creator
