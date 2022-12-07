/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { useDropzone } from 'react-dropzone'

import styles from './CoverUpload.module.scss'
import { IconClose } from '../Icons'

interface PageProps {
  imageType: string
  image: File | Blob | null
  setImage: (item: File | Blob) => void
  deleteImage: () => void
}

const CoverUpload = ({
  imageType,
  image,
  setImage,
  deleteImage,
}: PageProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.jpg, .jpeg, .gif, .webp, .png',
    onDrop: (acceptedFiles: any) => {
      const file = acceptedFiles[0]
      setImage(file)
    },
  })

  return (
    <div className="border border-gray-400 border-dashed rounded-3xl relative">
      {image ? (
        <div className={styles.uploadedImage}>
          <img src={URL.createObjectURL(image)} alt="nft" />
          <div className={styles.btnRemove} onClick={deleteImage}>
            <IconClose />
          </div>
        </div>
      ) : (
        <div className={styles.forUpload} {...getRootProps()}>
          <p>Recommended size: 1500 x 500px</p>
          <p>PNG, GIF, JPG</p>
          <p>10MB max size</p>
          <div className={`${styles.btnChoose} bg-choose rounded-full mt-4`}>
            <input {...getInputProps()} />
            <label htmlFor="upload">Choose file...</label>
          </div>
        </div>
      )}
    </div>
  )
}

export default CoverUpload
