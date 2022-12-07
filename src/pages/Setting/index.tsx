import React, { useState, useContext, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useWeb3React } from '@web3-react/core'
import Header from '../../components/Header/ExploreHeader'
import styles from './Setting.module.scss'
import { EditInput } from '../../components/editInput'
import CoverUpload from '../../components/coverUpload'
import AvatarUpload from '../../components/avatarUpload'
import { useAuthContext } from '../../context/useAuth'
import {
  IconEarth,
  IconDiscord,
  IconFacebook,
  IconInstagram,
  Icontwitter,
} from '../../components/Icons'
import {
  fetchGetApi,
  fetchPutApi,
  getToken,
  pinFileToIPFS,
} from '../../utils/backendApi'

export const Setting: React.FC = () => {
  const { active } = useWeb3React()
  const { user, updateUser } = useAuthContext()
  const [image, setImage] = useState<File | Blob | null>(null)
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [imageType, setImageType] = useState<string>('image')
  const [avatarImage, setAvatarImage] = useState<File | Blob | null>(null)
  const [errors, setErrors] = useState<Record<string, unknown>>({})
  const [buffer, setBuffer] = useState<string | ArrayBuffer | null>(null)
  const [bufferAvatar, setBufferAvatar] = useState<string | ArrayBuffer | null>(
    null
  )
  const [bioLength, setBioLength] = useState(0)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [nickName, setNickName] = useState<string>('')
  const [overLength, setOverLength] = useState<boolean>(false)
  const [bio, setBio] = useState<string>('')
  const [websiteUrl, setWebsiteUrl] = useState<string>('')
  const [discordUrl, setDiscordUrl] = useState<string>('')
  const [facebookUrl, setFacebookUrl] = useState<string>('')
  const [instagramUrl, setInstagramUrl] = useState<string>('')
  const [twitterUrl, setTwitterUrl] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const onAddCoverImage = (item: File | Blob) => {
    if (item) setImageType(item.type.split('/')[0])
    setErrors(prev => ({
      ...prev,
      image: '',
    }))
    setImage(item)
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      setBuffer(binaryStr)
    }
    reader.readAsArrayBuffer(item)
  }

  const onAddAvatar = (item: File | Blob) => {
    if (item) setImageType(item.type.split('/')[0])
    setErrors(prev => ({
      ...prev,
      image: '',
    }))
    setAvatarImage(item)
    console.log(avatarImage)
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      setBufferAvatar(binaryStr)
    }
    reader.readAsArrayBuffer(item)
  }

  const deleteAvatar = () => {
    const reader = new FileReader()
    reader.abort()
    setAvatarImage(null)
    setAvatarUrl(null)
    setBufferAvatar(null)
  }

  const deleteCoverImage = () => {
    const reader = new FileReader()
    reader.abort()
    setImage(null)
    setBuffer(null)
    setCoverUrl(null)
  }

  const sendData = async () => {
    if (!firstName || !lastName) {
      toast.error('Please fill the First Name and Last Name')

      return
    }
    if (!nickName) {
      toast.error('Please fill the Nickname')

      return
    }
    if (!bio) {
      toast.error('Please fill the Bio')

      return
    }
    setIsProcessing(true)
    if (active) {
      try {
        let imageCover: string | null = coverUrl
        let imageAvatar: string | null = avatarUrl

        // upload avatar image
        if (buffer && image) {
          const pinataData = await pinFileToIPFS(image)
          if (pinataData.success) {
            imageCover = pinataData.imageUrl
            setCoverUrl(imageCover)
          } else {
            toast.error('Failed to upload avatar.')
            setIsProcessing(false)

            return
          }
        }

        // upload cover image
        if (bufferAvatar && avatarImage) {
          const pinataData = await pinFileToIPFS(avatarImage)
          if (pinataData.success) {
            imageAvatar = pinataData.imageUrl
            setAvatarUrl(imageAvatar)
          } else {
            toast.error('Failed to upload cover image.')
            setIsProcessing(false)

            return
          }
        }

        const payload = {
          userName: `${firstName} ${lastName}`,
          nickName: `@${nickName}`,
          avatarImage: imageAvatar,
          coverImage: imageCover,
          bio,
          websiteUrl,
          discordUrl,
          facebookUrl,
          instagramUrl,
          twitterUrl,
        }

        const res = await fetchPutApi('api/user', payload, true)
        updateUser(res)
        setIsProcessing(false)
        // router.push(`/profile/${user?.id}`)
      } catch (err) {
        console.log(err)
        toast.error('Failed to update profile')
        setIsProcessing(false)
      }
    }
  }

  const handleBio = (e: any) => {
    if (e.target.value.length > 300) {
      setOverLength(true)
    } else {
      setOverLength(false)
      setBio(e.target.value)
      setBioLength(e.target.value.length)
    }
  }

  const splitName = (item: string) => {
    return item.split(' ')
  }

  const getInitialData = async () => {
    if (user) {
      const userId = user.id
      try {
        await fetchGetApi(`api/user/${userId}`, true).then(async res => {
          if (res.data.coverImage) {
            const cover = await fetch(res.data.coverImage).then(r => r.blob())
            setCoverUrl(res.data.coverImage)
            setImage(cover)
          }
          if (res.data.avatarImage) {
            const avatar = await fetch(res.data.avatarImage).then(r => r.blob())
            setAvatarUrl(res.data.avatarImage)
            setAvatarImage(avatar)
          }
          setFirstName(splitName(res.data.userName || ' ')[0])
          setLastName(splitName(res.data.userName || ' ')[1])
          setNickName(res.data.nickName?.slice(1))
          setBio(res.data.bio)
          setBioLength(res.data.bio.length)
          setWebsiteUrl(res.data.websiteUrl)
          setDiscordUrl(res.data.discordUrl)
          setInstagramUrl(res.data.instagramUrl)
          setFacebookUrl(res.data.facebookUrl)
          setTwitterUrl(res.data.twitterUrl)
        })
      } catch (err) {
        console.log('toggleFollow', err)
        toast.error(`Failed to connect server`)
      }
    } else {
      console.log('ERROR: ', 'no user')
    }
  }

  useEffect(() => {
    if (user) {
      if (!getToken()) {
        toast.error('Please login first')
        // router.push('/')
      } else {
        getInitialData()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <Header />
      <div className="text-white mt-12 max-w-screen-xl mx-auto py-16 text-white px-6 xl:px-16">
        <div className={styles.header}>
          <span className="md:text-2xl text-xl font-black text-white mb-10 text-left">
            Edit Profile
          </span>
          <div className="mt-4 max-w-full flex-shrink-0 flex-direction flex-col flex">
            <span className="text-lg text-edit text-left">
              You can set preferred display name, create your branded profile
              URL and manage other personal settings
            </span>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center md:items-start  md:flex-row md:flex-shrink-0">
          <div className={styles.forms}>
            <div className="px-6 sm:px-8 mt-12 mb-10">
              <h3 className="text-lg md:text-xl mb-5 font-semibold mb-10">
                Upload a Cover Image
              </h3>
              <CoverUpload
                imageType={imageType}
                image={image}
                setImage={onAddCoverImage}
                deleteImage={deleteCoverImage}
              />
            </div>
            <div className="flex flex-wrap justify-between mt-6 text-lg">
              <div className="flex flex-wrap w-full justify-between lg:w-6/12 sm:pl-8 pr-8 lg:pr-2 pl-8">
                <div className="w-full sm:w-5/12 flex-col text-left">
                  <span>First Name *</span>
                  <EditInput
                    placeholder="First Name"
                    max={15}
                    value={firstName}
                    onChange={(e: any) => {
                      setFirstName(e)
                    }}
                  />
                </div>
                <div className="w-full sm:w-5/12 flex-col text-left">
                  <span>Last Name *</span>
                  <EditInput
                    placeholder="Last Name"
                    max={15}
                    value={lastName}
                    onChange={(e: any) => {
                      setLastName(e)
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 flex-col pr-8 pl-8 lg:pl-0 text-left">
                <span>Nickname *</span>
                <EditInput
                  prefix="@"
                  max={15}
                  placeholder="Nickname"
                  value={nickName}
                  onChange={(e: any) => {
                    setNickName(e)
                  }}
                />
              </div>
            </div>
            <div className="max-w-full flex-col px-6 sm:px-8 mt-6 text-lg text-left">
              <span>Bio *</span>
              <div className="text-white my-6 form-input">
                <textarea
                  placeholder="Tell about yourself in a few words"
                  value={bio}
                  onChange={(e: any) => handleBio(e)}
                />
              </div>
              <p className={`text-right ${overLength ? 'text-red-400' : ''}`}>
                {bioLength}/300
              </p>
            </div>
            <div className="max-w-full flex-col px-6 sm:px-8 mt-6 text-lg">
              <div className="flex">
                <IconEarth color="white" />
                <span className="ml-4">Personal site or Portfolio</span>
              </div>
              <EditInput
                placeholder="https://"
                max={50}
                value={websiteUrl}
                onChange={(e: any) => setWebsiteUrl(e)}
              />
            </div>
            <div className="max-w-full flex-col px-6 sm:px-8 mt-6 text-lg">
              <div className="flex">
                <IconDiscord color="white" />
                <span className="ml-4">Discord</span>
              </div>
              <EditInput
                placeholder="Include #code"
                value={discordUrl}
                max={30}
                onChange={(e: any) => setDiscordUrl(e)}
              />
            </div>
            <div className="max-w-full flex-col px-6 sm:px-8 mt-6 text-lg">
              <div className="flex">
                <IconFacebook color="white" />
                <span className="ml-4">Facebook</span>
              </div>
              <EditInput
                placeholder="https://facebook.com/"
                max={50}
                value={facebookUrl}
                onChange={(e: any) => setFacebookUrl(e)}
              />
            </div>
            <div className="max-w-full flex-col px-6 sm:px-8 mt-6 text-lg">
              <div className="flex">
                <IconInstagram color="white" />
                <span className="ml-4">Instagram</span>
              </div>
              <EditInput
                placeholder="https://instagram.com/"
                max={50}
                value={instagramUrl}
                onChange={(e: any) => setInstagramUrl(e)}
              />
            </div>
            <div className="max-w-full flex-col px-6 sm:px-8 mt-6 text-lg">
              <div className="flex">
                <Icontwitter color="white" />
                <span className="ml-4">Twitter</span>
              </div>
              <EditInput
                placeholder="https://twitter.com/"
                max={50}
                value={twitterUrl}
                onChange={(e: any) => {
                  setTwitterUrl(e)
                }}
              />
            </div>
            <div className="flex justify-start px-6 sm:px-8 mt-6">
              <button
                className={`${styles.saveBtn} w-full text-xl mt-16`}
                disabled={isProcessing}
                onClick={() => sendData()}
                type="button"
              >
                {isProcessing ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
          <div className={styles.upload}>
            <AvatarUpload
              imageType={imageType}
              image={avatarImage}
              setAvatar={onAddAvatar}
              deleteAvatar={deleteAvatar}
            />
          </div>
        </div>
      </div>
    </>
  )
}
