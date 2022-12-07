/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import styles from './AvatarUpload.module.scss'
import { IconClose } from '../Icons'

interface PageProps {
  imageType: string
  image: File | Blob | null
  setAvatar: (item: File | Blob) => void
  deleteAvatar: () => void
}

const AvatarUpload = ({
  imageType,
  image,
  setAvatar,
  deleteAvatar,
}: PageProps) => {
  return (
    <>
      <div className={`md:mt-24 mt-8 ${styles.avatarContainer}`}>
        <div className={styles.avatarArea}>
          {image && <img src={URL.createObjectURL(image)} alt="avatar" />}
          <div className={styles.btnRemove} onClick={deleteAvatar}>
            <IconClose />
          </div>
        </div>
        <p className="text-gray-500 text-center mt-2">
          We recommend an image of at least 400x400.
          <br />
          GIFs work too!
        </p>
      </div>
      <div className={styles.forUpload}>
        <div
          className={`${styles.btnChoose} bg-choose bg-choose-dark rounded-full`}
        >
          {!image && (
            <>
              <input
                type="file"
                id="avatar"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={e => {
                  if (e.target.files && e.target.files?.length > 0)
                    setAvatar(e.target.files[0])
                }}
              />
              <label htmlFor="avatar">Choose file...</label>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AvatarUpload
