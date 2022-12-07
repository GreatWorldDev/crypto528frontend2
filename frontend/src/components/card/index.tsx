/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from './Card.module.scss'
import { CountDown } from '../CountDown'
import { BidBtn } from '../bidBtn'
import { IconHeart } from '../Icons'
import { TypeNFT } from '../../types'
import { useAuthContext } from '../../context/useAuth'
import { fetchGetApi, fetchPostApi } from '../../utils/backendApi'

interface PageProps {
  item: TypeNFT
}

export const Card = ({ item }: PageProps) => {
  const { user } = useAuthContext()
  const [isFollow, setIsFollow] = useState<boolean>(false)
  const [followerCount, setFollowerCount] = useState<number>(item.followerCount)

  const getNftfollow = () => {
    if (item.tokenId) {
      fetchGetApi(`api/nft/${item.tokenId}/isFollow`, true)
        .then(followRes => {
          if (!isNaN(followRes?.isFollowed)) {
            setIsFollow(followRes.isFollowed)
          } else {
            console.log('Can not check follow', followRes)
            setIsFollow(false)
          }
        })
        .catch(err => console.log(err))
    }
  }
  useEffect(() => {
    if (user) {
      getNftfollow()
    } else {
      setIsFollow(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const toggleFollow = async () => {
    if (!user) {
      toast.error('Please login first')

      return
    }
    if (item?.owner?.id === user?.id) {
      toast.error('You can not follow the NFT that you created')

      return
    }

    try {
      const res = await fetchPostApi(
        `api/nft/follow`,
        { tokenId: item.tokenId },
        true
      )
      if (res?.status === 'Success') {
        toast.success(`You ${isFollow ? 'stopped' : 'are'} following this NFT`)
        setFollowerCount(followerCount + (isFollow ? -1 : 1))
        setIsFollow(!isFollow)
      } else {
        toast.error('Internal Server Error')
      }
    } catch (err) {
      console.log('toggleFollow', err)
      toast.error(`Failed to ${isFollow ? 'un' : ''}follow!`)
    }
  }

  return (
    <div className={styles.nftCard}>
      <Link to={`/nft/${item.tokenId}`}>
        <div className={styles.cardImg}>
          {typeof item.image !== 'string' ? (
            <img src={URL.createObjectURL(item.image)} alt="NFT Image" />
          ) : (
            <img src={item.image} alt={item.description} />
          )}
        </div>
      </Link>
      {/* <div className={styles.favorite} onClick={() => toggleFollow()}>
        <IconHeart active={isFollow} />
      </div> */}
      <h3 className={styles.title}>
        {item.title}
        {/* <div>
          <img src="/images/white_heart.png" alt="heart" />
          {followerCount}
        </div> */}
      </h3>
      <div>
        <div className="flex justify-between mb-4 text-md px-2">
          <div className="flex items-center">
            {item.currencyType && (
              <img
                src={`/images/${item.currencyType.toLowerCase()}.svg`}
                className="token-symbol mr-2 "
                alt="eth"
              />
            )}
            <b className={`text-md ${styles.price}`}>
              {item.price.toFixed(2)} {item.currencyType}
            </b>
          </div>
        </div>
        <div className="flex justify-between flex-col">
          <CountDown time={item} className="mb-2" />
          <BidBtn tokenId={item.tokenId} />
        </div>
      </div>
    </div>
  )
}
