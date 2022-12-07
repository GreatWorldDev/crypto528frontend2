/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-concat */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Contract } from '@ethersproject/contracts'
import { parseUnits } from '@ethersproject/units'
import { toast } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import { useAuthContext } from '../../context/useAuth'
import {
  TypeNFT,
  durations,
  TypeNFTOwner,
  durationsTime,
  TypeNFTHistory,
  paymentTypes,
  levelETHPrices,
  levelPrices,
} from '../../types'
import MARKET_INFO from '../../artifacts/contracts/Marketplace.sol/Crypto528Marketplace.json'
import NFT_INFO from '../../artifacts/contracts/Crypto528.sol/Crypto528.json'
import { NFT_ADDRESS, NFT_MARKET_ADDRESS, PAYMENT_TOKEN } from '../../constant'
import Header from '../../components/Header/ExploreHeader'
import './style.scss'
import {
  fetchGetApi,
  fetchPostApi,
  getETHPrice,
  getToken,
} from '../../utils/backendApi'
import { IconClose, IconExpand, IconHeart } from '../../components/Icons'
import { Loading } from '../../components/Loading'
import { CustomDropdown } from '../../components/customDropdown'
import { ProgressContainer } from '../../components/progressContainer'
import { CountDown } from '../../components/CountDown'
import { BidBtn } from '../../components/bidBtn'
import { FollowerUser } from '../../components/followerUser'
import { BidderBox } from '../../components/BidderBox'
import 'react-datepicker/dist/react-datepicker.css'

const Detail = () => {
  const { account, library, active } = useWeb3React()
  const navigate = useNavigate()
  const { tokenId } = useParams()
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [paymentType, setPaymentType] = useState<string>(paymentTypes[0])
  const { user, login } = useAuthContext()
  const [nftData, setNftData] = useState<TypeNFT | null>(null)
  const [putOnSale, setPutOnSale] = useState<boolean>(false)
  const [rate, setRate] = useState<number>(0)
  const [usdcRate, setUSDCRate] = useState<number>(0)
  const [usdtRate, setUSDTRate] = useState<number>(0)
  const [bidPrice, setBidPrice] = useState<string>('0')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [minPrice, setMinPrice] = useState<string>('0')
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [duration, setDuration] = useState<string>(durations[0])
  const [isFollow, setIsFollow] = useState<boolean>(false)
  const [followers, setFollowers] = useState<TypeNFTOwner[]>([])
  const [totalFollowers, setTotalFollowers] = useState<TypeNFTOwner[]>([])
  const [isGettingFollowers, setIsGettingFollowers] = useState<boolean>(false)
  const [isGettingNft, setIsGettingNft] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openFollowersModal, setOpenFollowersModal] = useState<boolean>(false)
  const [isAuctionFinished, setIsAuctionFinished] = useState<boolean>(false)
  const [isSelectModal, setIsSelectModal] = useState<boolean>(false)
  const [level, setLevel] = useState<number>(0)

  const getFiveFolloers = () => {
    setIsGettingFollowers(true)
    fetchGetApi(`api/nft/${tokenId}/followers?page=0&size=5`)
      .then(res => {
        if (res?.data) {
          setFollowers(res.data)
        }
        setIsGettingFollowers(false)
      })
      .catch(err => {
        console.log(err)
        setIsGettingFollowers(false)
      })
  }

  const getFollowers = async (page: number = 0, size: number = 20) => {
    try {
      const res = await fetchGetApi(
        `api/nft/${tokenId}/followers?page=${page}&size=${size}`
      )
      if (page === 0) setTotalFollowers(res.data)
      else setTotalFollowers([...totalFollowers, ...res.data])
    } catch (err) {
      console.log(err)
    }
  }
  const showFollowModal = async () => {
    try {
      setOpenFollowersModal(true)
      setIsLoading(true)
      await getFollowers()
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const auctionValidate = (item: TypeNFT) => {
    if (item?.auctionInfo) {
      const now = parseInt(moment.utc().format('x'), 10)
      if (now > item?.auctionInfo?.auctionEndTime) setIsAuctionFinished(true)
    }
  }

  const toggleFollow = async () => {
    if (!user) {
      toast.error('Please login first')

      return
    }
    if (nftData?.creator?.id === user?.id) {
      toast.error('You can not follow the NFT that you created')

      return
    }

    try {
      const res = await fetchPostApi(`api/nft/follow`, { tokenId }, true)
      if (res?.status === 'Success') {
        toast.success(`You ${isFollow ? 'stopped' : 'are'} following this NFT`)
        setIsFollow(!isFollow)
        getFiveFolloers()
      } else {
        toast.error('Internal Server Error')
      }
    } catch (err) {
      console.log('toggleFollow', err)
      toast.error(`Failed to ${isFollow ? 'un' : ''}follow!`)
    }
  }

  const getCard = () => {
    // get NFT data
    setIsGettingNft(true)
    fetchGetApi(`api/nft/${tokenId}`)
      .then(res => {
        if (res?.data) {
          setNftData(res.data)
          auctionValidate(res.data)
          setPutOnSale(res.data.isSale)
        } else {
          console.log('No nft data', res)
        }
        setIsGettingNft(false)
      })
      .catch(err => {
        console.log(err)
        setIsGettingNft(false)
      })

    // check if you follow this NFT
    fetchGetApi(`api/nft/${tokenId}/isFollow`, true)
      .then(followRes => {
        if (!isNaN(followRes?.isFollowed)) {
          setIsFollow(followRes.isFollowed)
        } else {
          console.log('Can not check follow', followRes)
          setIsFollow(false)
        }
      })
      .catch(err => console.log(err))

    // get follower lists
    getFiveFolloers()
  }

  useEffect(() => {
    const getRate = async () => {
      setRate(await getETHPrice())
      setUSDCRate(await getETHPrice('usd-coin'))
      setUSDTRate(await getETHPrice('tether'))
    }
    getRate()
  }, [])

  useEffect(() => {
    if (openFollowersModal || showModal) {
      document.body.className += ' ' + 'lock-scroll'
    } else {
      document.body.className = ''
    }
  }, [openFollowersModal, showModal])

  useEffect(() => {
    if (tokenId) getCard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId])

  useEffect(() => {
    if (tokenId) getCard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mintNFT = async () => {
    try {
      if (!user) {
        toast.error('Please login with metamask!')

        return
      }
      // if (!user.verified) {
      //   toast.error('Please verify your KYC!')
      //   navigate("/kyc")

      //   return
      // }
      setIsProcessing(true)
      const contract = new Contract(
        NFT_MARKET_ADDRESS,
        MARKET_INFO.abi,
        library.getSigner()
      )
      const nftContract = new Contract(
        NFT_ADDRESS,
        NFT_INFO.abi,
        library.getSigner()
      )
      const isApproved = await nftContract.isApprovedForAll(
        account,
        NFT_MARKET_ADDRESS
      )
      if (!isApproved) {
        const approve = await nftContract.setApprovalForAll(
          NFT_MARKET_ADDRESS,
          true
        )
        await approve.wait()
      }
      const prices = await contract.levelETHPrices(level)
      const usdcPrice = await contract.levelPrices(level)
      // let res: any
      if (!nftData?.tokenId) {
        toast.error('No nft data')
        setIsProcessing(false)
        setIsSelectModal(false)

        return
      }
      if (paymentType === 'ETH') {
        const res = await contract.mint(
          level,
          tokenId,
          'ETH',
          nftData.tokenURI,
          { from: account, value: prices }
        )
        res
          .wait()
          .then(async () => {
            await getCard()
            toast.success('Mint is completed')
            setIsProcessing(false)
          })
          .catch(() => {
            toast.error('Failed to mint')
            setIsProcessing(false)
          })
      } else if (paymentType === 'USDC') {
        const tokenContract = new Contract(
          PAYMENT_TOKEN.USDC.tokenAddress,
          PAYMENT_TOKEN.USDC.abi,
          library.getSigner()
        )
        const approve = await tokenContract.approve(
          NFT_MARKET_ADDRESS,
          usdcPrice
        )
        await approve.wait()
        const res = await contract.mint(
          level,
          tokenId,
          paymentType,
          nftData.tokenURI,
          { from: account, value: usdcPrice }
        )
        res
          .wait()
          .then(async () => {
            await getCard()
            toast.success('Mint is completed')
            setIsProcessing(false)
          })
          .catch(() => {
            toast.error('Failed to mint')
            setIsProcessing(false)
          })
      } else {
        console.log('---step-1---')
        const tokenContract = new Contract(
          PAYMENT_TOKEN.USDT.tokenAddress,
          PAYMENT_TOKEN.USDT.abi,
          library.getSigner()
        )
        console.log('---step-2---', tokenContract)
        const approve = await tokenContract.approve(
          NFT_MARKET_ADDRESS,
          usdcPrice
        )
        console.log('---step-3---', paymentType)
        await approve.wait()
        const res = await contract.mint(
          level,
          tokenId,
          paymentType,
          nftData.tokenURI,
          { from: account, value: usdcPrice }
        )
        res
          .wait()
          .then(async () => {
            await getCard()
            toast.success('Mint is completed')
            setIsProcessing(false)
          })
          .catch(() => {
            toast.error('Failed to mint')
            setIsProcessing(false)
          })
      }

      setIsProcessing(false)
      setIsSelectModal(false)
      // eslint-disable-next-line prettier/prettier
    } catch (err: any) {
      setIsProcessing(false)
      setIsSelectModal(false)
      toast.error(
        err?.data?.message ||
        err?.message ||
        'Something went wrong. Please contact the support!'
      )
      console.log(err)
    }
  }

  const createAuction = async () => {
    try {
      if (!getToken()) {
        toast.error('Please login first')

        return
      }
      if (!user) {
        toast.error('Please login with metamask!')

        return
      }
      // if (!user.verified) {
      //   toast.error('Please verify your KYC!')
      //   navigate("/kyc")

      //   return
      // }

      if (nftData) {
        if (active) {
          setIsProcessing(true)
          try {
            const contract = new Contract(
              NFT_MARKET_ADDRESS,
              MARKET_INFO.abi,
              library.getSigner()
            )
            const nftContract = new Contract(
              NFT_ADDRESS,
              NFT_INFO.abi,
              library.getSigner()
            )

            // check if the wallet is approved to contract
            const isApproved = await nftContract.isApprovedForAll(
              account,
              NFT_MARKET_ADDRESS
            )
            if (!isApproved) {
              const approve = await nftContract.setApprovalForAll(
                NFT_MARKET_ADDRESS,
                true
              )
              await approve.wait()
            }

            const res = await contract.createAuction(
              tokenId,
              Math.floor(Number(moment.utc(startDate).format('x')) / 1000),
              durationsTime[duration],
              parseUnits(minPrice),
              nftData.currencyType
            )

            res.wait().then(async () => {
              await getCard()
              toast.success('Success')
              setShowModal(false)
              setIsProcessing(false)
            })
          } catch (err) {
            console.log(err)
            toast.error('Failed to start auction')
            setIsProcessing(false)
          }
        } else {
          toast.error('Please connect your wallet first')
        }
      } else {
        toast.error('No auction')
        setIsProcessing(false)

        return
      }
    } catch (err) {
      console.log(err)
    }
  }

  const createBid = async () => {
    try {
      if (!getToken()) {
        toast.error('Please login first')

        return
      }
      if (!user) {
        toast.error('Please login with metamask!')

        return
      }
      // if (!user.verified) {
      //   toast.error('Please verify your KYC!')
      //   navigate("/kyc")

      //   return
      // }

      if (nftData?.auctionInfo) {
        if (active) {
          if (
            !(
              parseFloat(bidPrice) >= nftData?.auctionInfo.currentPrice * 1.1 ||
              (parseFloat(bidPrice) >= nftData?.auctionInfo.currentPrice &&
                nftData?.auctionInfo.lastBidder === null)
            )
          ) {
            toast.error('Bid amount must not less than minimum bid')

            return
          }
          setIsProcessing(true)
          try {
            // Need to check if user create profile

            // approve to nftContract
            const nftContract = new Contract(
              NFT_ADDRESS,
              NFT_INFO.abi,
              library.getSigner()
            )
            const isApproved = await nftContract.isApprovedForAll(
              account,
              NFT_MARKET_ADDRESS
            )

            if (!isApproved) {
              const approve = await nftContract.setApprovalForAll(
                NFT_MARKET_ADDRESS,
                true
              )
              await approve.wait()
            }

            const contract = new Contract(
              NFT_MARKET_ADDRESS,
              MARKET_INFO.abi,
              library.getSigner()
            )

            let res: any
            if (paymentType === 'ETH') {
              res = await contract.createBid(
                nftData?.tokenId,
                nftData?.currencyType,
                parseUnits(bidPrice),
                {
                  value: parseUnits(bidPrice),
                }
              )
            } else {
              res = await contract.createBid(
                nftData?.tokenId,
                nftData?.currencyType,
                parseUnits(bidPrice)
              )
            }

            res.wait().then(async () => {
              await getCard()
              toast.success('Success')
              setIsProcessing(false)
            })
          } catch (err) {
            console.log(err)
            setIsProcessing(false)
            setIsProcessing(false)
          }
        } else {
          toast.error('Please connect your wallet first.')
          setIsProcessing(false)
        }
      } else {
        toast.error('No auction')
        setIsProcessing(false)

        return
      }
    } catch (err) {
      console.log(err)
    }
  }

  const endAuction = async () => {
    try {
      if (!getToken()) {
        toast.error('Please login first')

        return
      }
      if (!user) {
        toast.error('Please login with metamask!')

        return
      }
      // if (!user.verified) {
      //   toast.error('Please verify your KYC!')
      //   navigate("/kyc")

      //   return
      // }

      if (!nftData?.auctionInfo) {
        toast.error('There is no auction for this NFT')

        return
      }
      if (active) {
        setIsProcessing(true)
        try {
          const contract = new Contract(
            NFT_MARKET_ADDRESS,
            MARKET_INFO.abi,
            library.getSigner()
          )

          const res = await contract.endAuction(tokenId)

          res
            .wait()
            .then(async () => {
              await getCard()
              toast.success('Auction is completed')
              setIsProcessing(false)
            })
            .catch(() => {
              toast.error('Failed to complete auction')
              setIsProcessing(false)
            })
        } catch (err) {
          toast.error('Failed to complete auction')
          setIsProcessing(false)
        }
      } else {
        toast.error('Please connect your wallet first.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const cancelAuction = async () => {
    try {
      if (!getToken()) {
        toast.error('Please login first')

        return
      }
      if (!user) {
        toast.error('Please login with metamask!')

        return
      }
      // if (!user.verified) {
      //   toast.error('Please verify your KYC!')
      //   navigate("/kyc")

      //   return
      // }

      if (!nftData?.auctionInfo) {
        toast.error('There is no auction for this NFT')

        return
      }

      if (!(nftData?.auctionInfo.auctionCreator.id === user?.id)) {
        toast.error('You are not owner of this NFT')

        return
      }

      if (nftData?.auctionInfo.lastBidder) {
        toast.error('Auction is already started')

        return
      }

      if (active) {
        setIsProcessing(true)
        try {
          const contract = new Contract(
            NFT_MARKET_ADDRESS,
            MARKET_INFO.abi,
            library.getSigner()
          )

          const res = await contract.cancelAuction(tokenId)

          res
            .wait()
            .then(async () => {
              await getCard()
              toast.success('Auction is canceled')
              setIsProcessing(false)
            })
            .catch(() => {
              toast.error('Failed to cancel auction')
              setIsProcessing(false)
            })
        } catch (err) {
          toast.error('Failed to cancel auction')
          setIsProcessing(false)
        }
      } else {
        toast.error('Please connect your wallet first.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  console.log(nftData)

  return (
    <div className="detail-page">
      <Header />
      {isGettingNft ? (
        <div className="flex justify-center items-center h-full text-2xl py-40 text-white">
          Loading...
        </div>
      ) : nftData ? (
        <div className="detail-container">
          <div className="detail-images">
            <h1 className="mobile-show">{nftData?.title}</h1>
            <div className="pb-24">
              <img
                src={nftData?.image}
                alt={nftData?.description}
                className="nft-image"
              />
              {/* <img src="/images/richard.png" alt="" className="nft-image" /> */}
              {/* {user?.id != nftData?.owner?.id && ( */}
              {/* <div className="favorite" onClick={toggleFollow}>
                <IconHeart active={isFollow} />
              </div> */}
            </div>
            <div>
              <h3>Description</h3>
              <p className="description">{nftData?.description}</p>
              {nftData?.creator && (
                <div className="created">
                  <img src={nftData?.creator?.avatarImage || '/images/avatar-alt.png'} alt="avatar" />
                  <div>
                    <h4>Minted by</h4>
                    <Link to={`/profile/${nftData?.creator?.id}`}>
                      <h5>{nftData?.creator?.nickName || 'Unknown user'}</h5>
                    </Link>
                  </div>
                </div>
              )}
              {nftData?.price ? (
                <div className="price">
                  <p>Price</p>
                  <h6>
                    {nftData?.currencyType === 'USDC' ? nftData?.price * 10 ** 12 : nftData?.price} {nftData?.currencyType}{' '}
                    <span>
                      ($
                      {(nftData?.currencyType === 'ETH'
                        ? nftData?.price * rate : nftData?.currencyType === 'USDC'
                          ? nftData?.price * usdcRate : nftData?.price * usdtRate).toFixed(3)}
                      )
                    </span>
                  </h6>
                </div>
              ) : null}
              {!nftData.auctionInfo && <div className="btn-group mt-14">
                {nftData?.owner ? (
                  nftData.owner.id !== user?.id ? (
                    <button onClick={() => console.log('buy nft')}>
                      {isProcessing ? 'Loading...' : 'Buy Now'}
                    </button>
                  ) : (
                    <button onClick={() => setShowModal(true)}>
                      {showModal ? 'Loading...' : 'List On Sale'}
                    </button>
                  )
                ) : (
                  <button onClick={() => setIsSelectModal(true)}>
                    {isProcessing ? 'Loading...' : 'Mint'}
                  </button>
                )}
              </div>}
              <div className="text-left text-white flex-shrink-0 my-16">
                {nftData?.isSale && nftData?.auctionInfo ? (
                  <>
                    <div className='flex items-center mb-12'>
                      {/* {!isAuctionFinished && (
                      <>
                        <p className="text-base mb-12">Drops in</p>
                        <ProgressContainer nftData={nftData} />
                      </>
                    )} */}
                      <CountDown time={nftData} secondType />
                      <div className="price">
                        <p>Minimum Bid Price</p>
                        <h6>
                          {(nftData?.auctionInfo?.lastBidder
                            ? nftData?.auctionInfo.currentPrice * 1.1
                            : nftData?.price).toFixed(3)}{nftData?.currencyType}
                          <span>
                            $
                            {(
                              (Math.ceil(
                                1000 *
                                (nftData?.auctionInfo?.lastBidder
                                  ? nftData?.auctionInfo.currentPrice * 1.1
                                  : nftData?.price)
                              ) /
                                1000) *
                              (nftData?.currencyType === 'ETH'
                                ? rate : nftData?.currencyType === 'USDC'
                                  ? usdcRate : usdtRate)
                            )
                              .toFixed(3)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                        </h6>
                      </div>
                    </div>
                    {user ? (
                      parseInt(moment.utc().format('x'), 10) <
                        nftData?.auctionInfo.auctionEndTime ? (
                        user?.id !== nftData?.owner?.id ? (
                          <div className="flex items-center">
                            <div className="form-input py-4">
                              <input
                                type="text"
                                value={bidPrice}
                                onChange={e => {
                                  setBidPrice(e.target.value)
                                }}
                              />
                            </div>
                            {user?.id ===
                              nftData?.auctionInfo?.lastBidder?.id ? (
                              <div className="bg-btn-main py-4 opacity-70 cursor-not-allowed">
                                You are the highest bidder
                              </div>
                            ) : (
                              <BidBtn
                                disabled={isProcessing}
                                className="w-6/12 py-6 disabled:opacity-50 disabled:cursor-not-allowed fit-content"
                                clickHandler={createBid}
                              />
                            )}
                          </div>
                        ) : nftData?.auctionInfo.lastBidder ? (
                          <div className="bg-btn-main py-4 opacity-70 cursor-not-allowed">
                            Auction is started
                          </div>
                        ) : (
                          <button
                            className="bg-btn-main py-8"
                            onClick={cancelAuction}
                          >
                            {isProcessing ? (
                              'Loading...'
                            ) : (
                              'Cancel Auction'
                            )}
                          </button>
                        )
                      ) : user?.id === nftData?.owner.id ||
                        user?.id === nftData?.auctionInfo?.lastBidder?.id ? (
                        <button
                          className="bg-btn-main py-8"
                          onClick={endAuction}
                        >
                          {isProcessing ? 'Loading...' : 'End Auction'}
                        </button>
                      ) : (
                        <div className="bg-btn-main py-8 opacity-70 cursor-not-allowed">
                          Auction is ended
                        </div>
                      )
                    ) : (
                      <button
                        className="bg-btn-main py-8"
                        onClick={login}
                      >
                        {isProcessing ? 'Loading...' : 'Log in'}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-left text-2md mb-12 mt-8">
                    This NFT is not listed on sale yet.
                  </p>
                )}
              </div>
            </div>
            {/* <div className="w-328">
              <div className="flex justify-between items-center my-12">
                <p className="text-xl mr-12">Followers</p>
                <div className="cursor-pointer" onClick={showFollowModal}>
                  <IconExpand />
                </div>
              </div>
              {isGettingFollowers ? (
                <p className="text-lg mb-20">Loading...</p>
              ) : followers && followers.length > 0 ? (
                <div className="flex items-left mb-16">
                  {followers.map((user: TypeNFTOwner, index: number) => (
                    <Link to={`/profile/${user.id}`} key={`follower-${index}`}>
                      <a
                        className="followUser"
                        data-tip={user.nickName || 'Unknown'}
                      >
                        <img
                          src={user.avatarImage || '/images/avatar-alt.png'}
                          width="60px"
                          height="60px"
                          alt={user.nickName}
                        />

                        <ReactTooltip
                          effect="solid"
                          place="top"
                          delayHide={300}
                          delayShow={300}
                          offset={{ top: -5 }}
                        />
                      </a>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-lg mb-20">No followers yet</p>
              )}
            </div> */}
          </div>
          <div className="detail-content">
            <h1 className="desktop-show">{nftData?.title}</h1>
            <img src="/images/chart.png" alt="" className="mb-24" />
            <div className="history">
              <p>Bid History</p>
              <div className="flex flex-col overflow-x-auto">
                {nftData &&
                  nftData?.bidHistory?.length > 0 &&
                  nftData?.bidHistory.map(
                    (bidHistory: TypeNFTHistory, index: number) =>
                      bidHistory.user && (
                        <BidderBox
                          bidHistory={bidHistory}
                          key={`bidHistory-${index}`}
                        />
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full text-2xl py-40 text-white">
          No NFT Data
        </div>
      )}
      {isSelectModal && (
        <div className="select-modal overflow-x-hidden overflow-y-auto fixed inset-0 flex outline-none focus:outline-none justify-center items-center mint-detail-modal">
          <div className="relative w-auto my-6 mx-auto max-w-3xl w-full">
            <div className="border border-gray-500 rounded-3xl shadow-lg relative flex flex-col w-full bg-body outline-none focus:outline-none py-4 px-8 mint-detail-modal">
              <div className="flex items-center justify-between p-5 border-b border-create rounded-t">
                <p className="text-center title">Select Payment Type & Price</p>
                <button
                  className="p-1 ml-auto bg-transparent text-gray-300 float-right text-xl leading-none font-semibold outline-none focus:outline-none close-btn"
                  onClick={() => {
                    setIsSelectModal(false)
                  }}
                >
                  <IconClose />
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <div className="form-group text-md md:text-lg w-full size-auto mb-5">
                  <p className="mb-3 text-md text-white text-left">Price:</p>
                  <div className="flex items-center flex-wrap">
                    {paymentType === 'ETH'
                      ? levelETHPrices.map((item: number, index: number) => (
                        <div
                          className={`form-input w-full size-auto py-4 mb-5 ${level === index ? 'active' : ''
                            }`}
                          key={`payment-${index}`}
                          onClick={() => setLevel(index)}
                        >
                          <button>{item} ETH</button>
                        </div>
                      ))
                      : levelPrices.map((item: number, index: number) => (
                        <div
                          className={`form-input size-auto w-full py-4 mb-5 ${level === index ? 'active' : ''
                            }`}
                          key={`payment-${index}`}
                          onClick={() => setLevel(index)}
                        >
                          <button>{`${item} ${paymentType}`}</button>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="form-group text-md md:text-lg w-ful mb-14">
                  <p className="mb-4 text-white text-left">Referral code</p>
                  <div className="form-input size-auto z-20 w-full py-4">
                    <input type="text" />
                  </div>
                </div>

                {/* Duration */}
                <div className="form-group text-md md:text-lg w-ful mb-14">
                  <p className="mb-4 text-white text-left">Payment Type</p>
                  <div className="form-input size-auto z-20 w-full py-4">
                    <CustomDropdown
                      className="w-full size-auto text-white-important bg-transparent-important"
                      selected={paymentType}
                      lists={paymentTypes}
                      handleSelect={item => {
                        setPaymentType(item)
                      }}
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  className="bg-btn-main form-input w-full text-2md py-2 text-white"
                  onClick={mintNFT}
                >
                  {isProcessing ? 'Minting...' : 'Mint'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="select-modal overflow-x-hidden overflow-y-auto fixed inset-0 flex outline-none focus:outline-none justify-center items-center">
          <div className="relative w-auto my-6 mx-auto max-w-3xl w-full">
            <div className="border border-gray-500 rounded-3xl shadow-lg relative flex flex-col w-full bg-body outline-none focus:outline-none py-4 px-8">
              <div className="flex items-center justify-between p-5 border-b border-create rounded-t">
                <p className="text-center title">List On Sale</p>
                <button
                  className="p-1 ml-auto bg-transparent text-gray-300 float-right text-xl leading-none font-semibold outline-none focus:outline-none close-btn"
                  onClick={() => {
                    setShowModal(false)
                  }}
                >
                  <IconClose />
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <div className="form-group text-md md:text-lg w-full mb-5">
                  <p className="mb-3 text-md text-white text-left">
                    (Current price: {nftData?.price} {nftData?.currencyType})
                  </p>
                  <div className="form-input w-full py-4 mb-5">
                    <input
                      type="text"
                      placeholder="Enter minimum bid"
                      value={minPrice}
                      onChange={e => {
                        if (/^(\d+)?(.(\d+)?)?$/.test(e.target.value))
                          setMinPrice(e.target.value)
                      }}
                    />
                  </div>
                </div>

                {/* Starting date */}
                <div className="form-group text-md md:text-lg w-full mb-5">
                  <p className="mb-4 text-white text-left">Starting date</p>
                  <div className="form-input w-full z-50 py-4 date-picker-input">
                    <ReactDatePicker
                      selected={startDate}
                      className="text-md py-0 w-full"
                      onChange={(e: any) => {
                        setStartDate(e as Date)
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={20}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="form-group text-md md:text-lg w-ful mb-14">
                  <p className="mb-4 text-white text-left">Duration</p>
                  <div className="form-input z-20 w-full py-4">
                    <CustomDropdown
                      className="w-full text-white-important size-auto bg-transparent-important"
                      selected={duration}
                      lists={durations}
                      handleSelect={item => {
                        setDuration(item)
                      }}
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  className="bg-btn-main w-full text-2md py-4 text-white"
                  onClick={createAuction}
                >
                  {isProcessing ? 'Loading...' : 'List On Sale'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openFollowersModal && (
        <>
          <div className="overflow-x-hidden overflow-y-auto fixed  max-w-2xl w-full h-4/5 m-auto inset-0 z-50 flex outline-none focus:outline-none justify-center items-center">
            <div className="relative w-full max-h-full mx-auto">
              <div className="border-0 rounded-3xl max-h-full shadow-lg relative flex flex-col w-full bg-body outline-none focus:outline-none py-4 px-8">
                <div className="flex items-start justify-between p-5 border-b border-create rounded-t">
                  <h3 className="text-2xl text-center w-full text-white">Followers</h3>
                  <button
                    className="p-1 ml-auto bg-transparent text-gray-300 float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setOpenFollowersModal(false);
                    }}
                  >
                    <IconClose />
                  </button>
                </div>
                {isLoading ?
                  <div className="relative p-6 flex-auto overflow-y-auto">
                    <p className="text-center text-md py-16 text-white">
                      Loading...
                    </p>
                  </div>
                  :
                  <>
                    <div className="relative p-6 flex-auto overflow-y-auto">
                      {totalFollowers.length > 0 ? (
                        totalFollowers.map((x: TypeNFTOwner, index: number) => (
                          <FollowerUser user={x} key={`totalFollower-${index}`} />
                        ))
                      ) : (
                        <p className="text-center text-md py-16 text-white">
                          No followers yet.
                        </p>
                      )}
                    </div>
                  </>}
              </div>
            </div>
          </div>
          <div
            className="flex opacity-25 fixed inset-0 z-40 bg-white"
            onClick={() => {
              setOpenFollowersModal(false);
            }}
          ></div>
        </>
      )}
    </div>
  )
}

export default Detail
