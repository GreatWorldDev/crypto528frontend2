import moment from 'moment'
import React from 'react'
import { TypeNFT } from '../../types'
import styles from './ProgressContainer.module.scss'

interface PageProps {
  nftData: TypeNFT | null
}

export const ProgressContainer = ({ nftData }: PageProps) => {
  const getProgress = () => {
    if (nftData?.auctionInfo) {
      const now = parseInt(moment.utc().format('x'), 10)
      if (now < nftData.auctionInfo.auctionStartTime) return '100%'
      if (now > nftData.auctionInfo.auctionEndTime) return '0%'

      return `${((nftData.auctionInfo.auctionEndTime - now) /
        (nftData.auctionInfo.auctionEndTime -
          nftData.auctionInfo.auctionStartTime)) *
        100}%`
    }

    return '0px'
  }

  return (
    <div className={`bg-progress ${styles.progressContainer}`}>
      <div
        className={styles.progressIndicator}
        style={{ width: getProgress() }}
      ></div>
    </div>
  )
}
