import React from 'react'
import { Link } from 'react-router-dom'
import { TypeNFTOwner } from '../../types'
import styles from './FollowerUser.module.scss'

interface PageProps {
  user: TypeNFTOwner
}

export const FollowerUser = ({ user }: PageProps) => {
  return (
    <div className="flex justify-between items-center dark:text-white mb-6">
      <div className="relative flex items-center mr-3">
        <img
          src={user.avatarImage || '/images/avatar-alt.png'}
          className={styles.avatar}
          alt=""
        />
        <p className="ml-6 text-white">{user.nickName || 'Unknown'}</p>
      </div>
      <Link to={`/profile/${user.id}`} className="bg-btn-main size-auto">
        View
      </Link>
    </div>
  )
}
