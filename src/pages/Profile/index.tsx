/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Card } from '../../components/card'
import Header from '../../components/Header/ExploreHeader'
import { Banner } from '../../components/banner'
import { useAuthContext, User } from '../../context/useAuth'
import { TypeNFT } from '../../types'
import {
  IconCopy,
  IconInstagram,
  Icontwitter,
  IconVerifyBadge,
} from '../../components/Icons'
import { fetchGetApi, fetchPostApi, getToken } from '../../utils/backendApi'
import './style.scss'
import { Modal } from '../../components/modal'

const Profile = () => {
  const { userId } = useParams()
  const [cards, setCards] = useState<TypeNFT[]>([])
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [data, setData] = useState<User>()
  const [isFollow, setIsfollow] = useState(false)
  const { isAuthenticated, user, login, logout } = useAuthContext()
  const [modalShow, setModalshow] = useState<boolean>(false)
  const [followers, setFollowers] = useState<number>()
  const [followingData, setFollowingdata] = useState()
  const [followerData, setFollowerdata] = useState<any>()
  const [followFlag, setFollowFlag] = useState<boolean>(true)
  const [isGettingData, setIsGettingData] = useState<boolean>(false)
  const [clickedTab, setClickedTab] = useState<number>(0)
  const [copied, setCopied] = useState<boolean>(false)
  const ref = useRef<HTMLInputElement>(null)

  const copyToClipboard = () => {
    if (ref.current !== null) {
      ref.current?.select()
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }

  const tabs = ['Created', 'Owned', 'On Sale', 'Offered']
  const getProfileData = async () => {
    try {
      setIsGettingData(true)
      fetchGetApi(`api/user/${userId}`)
        .then(res => {
          if (res.data) {
            setData(res.data)
            setFollowers(res.data.followerCount)
          } else {
            console.log('No user data', res)
          }
          setIsGettingData(false)
        })
        .catch(err => {
          setIsGettingData(false)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const getFollowings = async (page: number = 0, size: number = 20) => {
    setModalLoading(true)
    const res = await fetchGetApi(
      `api/user/${userId}/followings?page=${page}&size=${size}`
    )
    setFollowingdata(res?.data)
    setModalLoading(false)
    setFollowFlag(true)
  }

  const getFollowers = async (page: number = 0, size: number = 20) => {
    setModalLoading(true)
    const res = await fetchGetApi(
      `api/user/${userId}/followers?page=${page}&size=${size}`
    )
    setFollowerdata(res?.data)
    setModalLoading(false)
    setFollowFlag(false)
  }

  const getIsFollower = async () => {
    setIsGettingData(true)
    fetchGetApi(`api/user/${userId}/isFollow`, true)
      .then(res => {
        setIsfollow(res.status)
        setIsGettingData(false)
      })
      .catch(err => {
        setIsGettingData(false)
      })
  }

  const toggleFollow = async () => {
    if (!getToken()) {
      toast.error('Please login first')

      return
    }
    try {
      const res = await fetchPostApi(
        `api/user/follow`,
        { followingId: userId },
        true
      )
      if (res?.status === 'Success') {
        setIsfollow(!isFollow)
        await getFollowers()
        isFollow
          ? setFollowers((followers || 1) - 1)
          : setFollowers((followers || 0) + 1)
        isFollow
          ? toast.success(`Unfollowed successfully!`)
          : toast.success(`Followed successfully!`)
      } else {
        toast.error('Please login first')
      }
    } catch (err) {
      console.log('toggleFollow', err)
      toast.error(`Failed to ${isFollow ? 'un' : ''}follow this User`)
    }
  }

  const showFollowing = async () => {
    if (!getToken()) {
      toast.error('Please login first')

      return
    }
    setModalshow(true)
    await getFollowings()
  }

  const getOffered = async () => {
    const nftCards = await fetchGetApi(`api/nft/onBid/${userId}?page=0&size=20`)
    setCards(nftCards?.data)
  }

  const getCreated = async () => {
    const nftCards = await fetchGetApi(
      `api/nft/doneBy/${userId}?userType=creator&page=0&size=10`
    )
    setCards(nftCards?.data)
  }

  const getOwned = async () => {
    const nftCards = await fetchGetApi(
      `api/nft/doneBy/${userId}?userType=owner&page=0&size=10`
    )
    setCards(nftCards?.data)
  }

  const getOnSale = async () => {
    const nftCards = await fetchGetApi(
      `api/nft/onSale/${userId}?page=0&size=20`
    )
    setCards(nftCards?.data)
  }

  const showFollowers = async () => {
    if (!getToken()) {
      toast.error('Please login first')

      return
    }
    setModalshow(true)
    await getFollowers()
  }

  const convertMonth = (timestamp: number) => {
    const d = new Date(timestamp)
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    return `${monthNames[d.getMonth()]}. ${d.getFullYear()}`
  }

  const isMyprofile = () => {
    return user?.id === userId
  }
  const clickTab = (tabNo: number) => {
    setClickedTab(tabNo)
    switch (tabNo) {
      case 0:
        getCreated()
        break
      case 1:
        getOwned()
        break
      case 2:
        getOnSale()
        break
      case 3:
        getOffered()
        break
      default:
        break
    }
  }

  useEffect(() => {
    try {
      if (userId) {
        getCreated()
        getProfileData()
        getFollowers()
        if (getToken()) getIsFollower()
      }
    } catch {
      toast.error('Server is not connected.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])
  console.log(data)

  return (
    <div className="profile-container">
      <Header />
      <Banner banner={data?.coverImage} avatar={data?.avatarImage} />
      <div className="profile-content">
        <div className="m-0 max-w-1/3">
          <div className="profile-wallet-outbox">
            <div className="profile-wallet-container">
              <div className="profile-wallet">
                <input
                  className="profile-wallet-address text-white"
                  value={data?.address[0]}
                  ref={ref}
                  readOnly
                />
                <div className="profile-wallet-copy" onClick={copyToClipboard}>
                  <span className={`${copied && 'show'}`}>Copied!</span>
                  <IconCopy />
                </div>
              </div>
            </div>
          </div>
          <div className="box-sizing-box">
            <div className="profile-grid">
              <div className="my-3 flex flex-col items-center md:items-start">
                <div className="profile-name-container">
                  <div className="m-0">
                    <div className="profile-name text-white">
                      {data?.userName}
                    </div>
                  </div>
                </div>
                <div className="profile-username-container">
                  <div className="profile-username">{data?.nickName}</div>
                </div>
              </div>
              <div className="profile-grid-wide">
                <div className="profile-grid">
                  <div className="profile-follow">
                    <div className="profile-follow-following">
                      <div className="profile-follow-following-inside">
                        <div className="profile-font-18">
                          {data?.followingCount}
                        </div>
                        <div
                          className="profile-font-16"
                          onClick={() => {
                            showFollowing()
                          }}
                        >
                          Following
                        </div>
                      </div>
                    </div>
                    <div className="profile-follow-following">
                      <div className="profile-follow-following-inside">
                        <div className="profile-font-18">{followers}</div>
                        <div
                          className="profile-font-16"
                          onClick={() => {
                            showFollowers()
                          }}
                        >
                          Followers
                        </div>
                      </div>
                    </div>
                    <div className="profile-btn-wrap">
                      {isMyprofile() ? (
                        <Link to="/setting">
                          <div className="profile-follow-btn">Edit Profile</div>
                        </Link>
                      ) : (
                        <button
                          className="profile-follow-btn"
                          onClick={() => {
                            toggleFollow()
                          }}
                        >
                          {isFollow ? 'UnFollow' : 'Follow'}
                        </button>
                      )}
                    </div>
                  </div>
                  {followers !== 0 && (
                    <div className="box-sizing-box">
                      <h2 className="profile-font-18">Followed by</h2>
                      <div className="profile-followers">
                        <div className="profile-btn-wrap">
                          {followerData &&
                            followerData.map(
                              (item: any, index: number) =>
                                index <= 4 && (
                                  <div
                                    className="box-sizing-box"
                                    key={`profile-avatars-${index}`}
                                  >
                                    <div
                                      className="collect-btn-avatar-container"
                                      aria-expanded="false"
                                    >
                                      <Link to={`/profile/${item.id}`}>
                                        <div
                                          className="collect-btn-avatar"
                                          style={{
                                            backgroundImage: `url(${item.avatarImage ||
                                              '/images/avatar-alt.png'})`,
                                          }}
                                        ></div>
                                      </Link>
                                    </div>
                                  </div>
                                )
                            )}
                        </div>
                      </div>
                      <div className="profile-btn-wrap">
                        <div
                          className="profile-follow-viewall"
                          onClick={() => {
                            showFollowers()
                          }}
                        >
                          View all
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="profile-display">
                  <div className="profile-grid-wide">
                    <div className="profile-out-net">
                      {data?.twitterUrl && (
                        <div className="profile-btn-wrap">
                          <div className="profile-transition">
                            <a
                              href={`${data?.twitterUrl}`}
                              className="profile-twitter out-net"
                            >
                              <IconVerifyBadge />
                              <div className="profile-font-14">{`${data?.twitterUrl}`}</div>
                              <Icontwitter color="#fff" />
                            </a>
                          </div>
                        </div>
                      )}
                      <div className="profile-btn-wrap">
                        {data?.instagramUrl && (
                          <div className="profile-transition">
                            <a
                              href={`${data?.instagramUrl}`}
                              className="profile-twitter out-net"
                            >
                              <IconVerifyBadge />
                              <div className="profile-font-14">{`${data?.instagramUrl}`}</div>
                              <IconInstagram color="#fff" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="box-sizing-box">
                      <div className="profile-bio text-white">Bio</div>
                      <div className="box-sizing-box">
                        <div className="profile-bio-content">
                          <p className="text-white">{data?.bio}</p>
                        </div>
                      </div>
                    </div>
                    <div className="profile-joined">
                      <div className="profile-join-font  text-white">
                        Joined
                      </div>
                      <div className="profile-join-date  text-white">
                        {convertMonth(data?.created || 0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-0">
          <div className="border-b border-black border-white border-solid pb-2 mb-4">
            <div className="text-black text-white font-semibold text-lg mb-2 flex justify-start items-center">
              {tabs.map((item: string, index: number) => (
                <div
                  key={`ownernft-${index}`}
                  className={`${index === clickedTab &&
                    'bg-btn-active'} bg-btn-main`}
                  onClick={() => clickTab(index)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="profile-display-grid">
            <div className="profile-display-grid-inside">
              {cards &&
                cards.map((card: TypeNFT, index: number) => (
                  <Card item={card} key={`card-${card.tokenId}-${index}`} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isfollowing={followFlag}
        data={followFlag ? followingData : followerData}
        showModal={modalShow}
        modalLoading={modalLoading}
        toggleModal={() => setModalshow(false)}
        onFollowers={() => getFollowings()}
        onFollowings={() => getFollowings()}
      />
    </div>
  )
}

export default Profile
