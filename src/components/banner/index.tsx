/* eslint-disable react/require-default-props */
import React from 'react'

export interface BannerProps {
  banner?: string
  avatar?: string
}

export const Banner: React.FC<BannerProps> = ({
  banner,
  avatar,
}: BannerProps) => {
  return (
    <div className="box-border sm:mb-36 mb-20 relative">
      <div className="box-border m-0 relative">
        {banner ? (
          <div
            className="profile-banner-image"
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
        ) : (
          <>
            <div className="profile-banner-bg-gradient"></div>
            <div className="profile-banner-image"></div>
          </>
        )}
      </div>
      <div className="profile-avatar-bar">
        <div className="profile-avatar-container">
          {avatar ? (
            <div
              className="profile-avatar"
              style={{ backgroundImage: `url(${avatar})` }}
            ></div>
          ) : (
            <div className="profile-avatar"></div>
          )}
        </div>
      </div>
    </div>
  )
}
