import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { TypeNFTHistory } from '../../types'
import styles from './BidderBox.module.scss'
import { IconExpand } from '../Icons'

interface BidderProps {
  bidHistory: TypeNFTHistory
}

export const BidderBox = ({ bidHistory }: BidderProps) => {
  return (
    <div className="bid-history">
      <div>
        {bidHistory.user.avatarImage ? (
          <img src={bidHistory.user.avatarImage} alt="avatar" />
        ) : (
          <div className="alt-avatar" />
        )}
        <div>
          <h4>Bid {bidHistory.price} ETH</h4>
          <h5>
            by{' '}
            <Link to={`/profile/${bidHistory.user.id}`}>
              {bidHistory.user.nickName || 'Unknown'}
            </Link>{' '}
            at{' '}
            {`${moment(bidHistory.time).format('MMM d, YYYY')} at ${moment(
              bidHistory.time
            ).format('H:mma')}`}
          </h5>
        </div>
      </div>
    </div>
  )
}
