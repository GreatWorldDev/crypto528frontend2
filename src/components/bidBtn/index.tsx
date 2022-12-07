/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../Loading'
import styles from './BidBtn.module.scss'

interface BtnProps {
  title?: string
  tokenId?: string
  sizeMd?: boolean
  className?: string
  disabled?: boolean
  clickHandler?: () => void
}

export const BidBtn = ({
  title,
  tokenId,
  sizeMd,
  className,
  disabled,
  clickHandler,
}: BtnProps) => {
  return (
    <>
      {tokenId ? (
        <Link to={`/nft/${tokenId}`}>
          <a
            className={`${styles.bidBtn} ${
              sizeMd ? styles.sizeMd : ''
            } ${className}`}
            onClick={() => {
              if (clickHandler) clickHandler()
            }}
          >
            {disabled ? (
              <span className={`text-white ${sizeMd ? 'text-md' : 'text-sm'}`}>
                'Loading...'
              </span>
            ) : (
              <span className={`text-white ${sizeMd ? 'text-md' : 'text-sm'}`}>
                {title ?? 'View NFT'}
              </span>
            )}
          </a>
        </Link>
      ) : (
        <button
          className={`${styles.bidBtn} ${
            sizeMd ? styles.sizeMd : ''
          } ${className}`}
          onClick={() => {
            if (clickHandler) clickHandler()
          }}
        >
          {disabled ? (
            <span className={`text-white ${sizeMd ? 'text-md' : 'text-sm'}`}>
              'Loading...'
            </span>
          ) : (
            <span className={`text-white ${sizeMd ? 'text-md' : 'text-sm'}`}>
              PLACE A BID
            </span>
          )}
        </button>
      )}
    </>
  )
}
