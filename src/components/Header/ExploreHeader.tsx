/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// this is a component file

import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { isMobile } from 'react-device-detect'
import { useAuthContext } from '../../context/useAuth'
import { DefaultNetwork, networkInfo } from '../../constant'
import { chainIdToHexString, shortenAddress } from '../../utils/web3Functions'
import { useEagerConnect } from '../../hooks/useEagerConnect'
import { useInactiveListener } from '../../hooks/useInactiveListener'
import './style.scss'
import { IconLogin, IconLogout } from '../Icons'
import { TypeNFT } from '../../types'
import { fetchGetApi } from '../../utils/backendApi'
import { Loading } from '../Loading'

export interface OwnerCardData {
  id: number
  userName: string
  nickName: string
  coverImage: string
  avatarImage: string
  bio: string
  followerCount: number
  verified: boolean
}

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [DefaultNetwork],
})

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [1],
  rpc: { 1: 'https://mainnet.infura.io/v3/0119edc6415640eea2f6cf743af57472' },
  qrcode: true,
})

const HeaderComponent = () => {
  const { error, activate, active, account, connector } = useWeb3React()
  const { login, user, logout } = useAuthContext()
  const location = useLocation()
  const { pathname } = location
  const splitLocation = pathname.split('/')
  const triedEager = useEagerConnect()
  const [activatingConnector, setActivatingConnector] = useState()
  useInactiveListener(!triedEager || !!activatingConnector)

  const [isHamburger, setIsHamburger] = useState<boolean>(false)
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError
  const [wrongNetwork, setWrongNetwork] = useState(false)
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [artData, setArtData] = useState<TypeNFT[]>([])
  const [isArtLoading, setIsArtLoading] = useState<boolean>(false)
  const [profileData, setProfileData] = useState<OwnerCardData[]>([])
  const [isSearchModal, setIsSearchModal] = useState<boolean>(false)
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: any) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      if (isHamburger) setIsHamburger(false)
    }
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      isFocus === false
    ) {
      if (isSearchModal) setIsSearchModal(false)
    }
  }

  const getProfileData = async (text: string) => {
    try {
      setIsProfileLoading(true)
      const res = await fetchGetApi(
        `api/search/user?keyword=${text}&sortType=created.desc&page=0&size=20`
      )
      const profile = []
      let j = 0
      for (let i = 0; i < res?.data.length; i += 1) {
        if (res?.data[i].nickName) {
          profile.push(res?.data[i])
          if (res?.data.length > 3) {
            j += 1
            if (j === 3) break
          }
        }
      }
      setProfileData(profile)
      setIsProfileLoading(false)

      return res
    } catch (err) {
      console.log(err)
    }
  }

  const getArtData = async (text: string) => {
    try {
      setIsArtLoading(true)
      const res = await fetchGetApi(
        `api/search/nft?${
          text ? `keyword=${text}` : ''
        }&sortType=time.desc&isSale=4&page=0&size=3`
      )
      setArtData(res?.data)
      setIsArtLoading(false)

      return res
    } catch (err) {
      console.log(err)
    }
  }

  const onSearchModal = (text: string) => {
    setIsFocus(true)
    setIsSearchModal(true)
    setSearchText(text)
  }

  const connectWallet = async () => {
    try {
      if (!isMobile) {
        await activate(injectedConnector)
      } else {
        await activate(walletconnect)
      }
      login()
    } catch (err) {
      console.log(err)
    }
  }

  const changeNetwork = async () => {
    const wa: any = window
    const { ethereum } = wa
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdToHexString(DefaultNetwork) }],
      })
    } catch (switchError) {
      // eslint-disable-next-line no-shadow
      const error = JSON.parse(JSON.stringify(switchError))
      if (
        error.code === 4902 ||
        (error.code === -32603 && error?.data?.originalError.code === 4902)
      ) {
        try {
          const item = networkInfo[DefaultNetwork]
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdToHexString(DefaultNetwork),
                chainName: item.label,
                rpcUrls: [item.rpcUrl],
                nativeCurrency: {
                  name: item.nativeCurrency,
                  symbol: item.nativeCurrency,
                  decimals: 18,
                },
                blockExplorerUrls: [item.explorer],
              },
            ],
          })
        } catch (addError) {
          console.log('addError', addError)
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)

    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  })

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getProfileData(searchText)
      getArtData(searchText)
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchText])

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  useEffect(() => {
    setWrongNetwork(isUnsupportedChainIdError)
  }, [isUnsupportedChainIdError])

  useEffect(() => {
    if (wrongNetwork) changeNetwork()
  }, [wrongNetwork])

  return (
    <>
      <div className="navbar-explore">
        <Link to="/nftmarketplace">
          <img src="/images/nftlogo.png" alt="Logo" className="logo" />
        </Link>
        <img
          src="/images/logolanding.png"
          alt="Mini Logo"
          className="minilogo"
        />
        <div className="searchbar relative">
          <img src="/images/search_explore.png" alt="search" />
          <input
            type="text"
            placeholder="Search..."
            contentEditable
            maxLength={30}
            // value={searchText}
            onBlur={() => setIsFocus(false)}
            onFocus={(e: any) => onSearchModal(e.target.value)}
            onChange={(e: any) => onSearchModal(e.target.value)}
          />
          {isSearchModal && (
            <div
              className="absolute header-search-modal top-28 left-0 w-full bg-body rounded-xl p-4 border-2 border-gray-400 out-line shadow-lg p-12"
              ref={searchRef}
            >
              <p className="text-lg text-white text-left">Profiles</p>
              {isProfileLoading ? (
                <div className="relative p-4 flex-auto overflow-y-auto">
                  Loading...
                </div>
              ) : (
                <>
                  <div className="relative p-4 flex-auto overflow-y-auto">
                    {profileData && profileData.length > 0 ? (
                      profileData.map(
                        (x: any, index: number) =>
                          x.nickName && (
                            <div
                              className="flex justify-between items-center text-white mb-6"
                              key={`Follower-${index}`}
                            >
                              <div className="relative flex items-center mr-3">
                                <img
                                  src={
                                    x.avatarImage || '/images/avatar-alt.png'
                                  }
                                  width="44px"
                                  className="header-avatar"
                                  height="44px"
                                  alt=""
                                />
                                <div>
                                  <div className="text-md ml-3 max150">
                                    {x.userName || 'Unknown'}
                                  </div>
                                  <p className="ml-6 userName">
                                    {x.nickName || 'Unknown'}
                                  </p>
                                </div>
                              </div>
                              <Link to={`/profile/${x.id}`}>
                                <a className="bg-btn-main size-auto">View</a>
                              </Link>
                            </div>
                          )
                      )
                    ) : (
                      <p className="text-center text-md py-4 text-white">
                        No matched results.
                      </p>
                    )}
                  </div>
                </>
              )}
              <p className="text-lg text-lg text-white text-left">Artworks</p>
              {isArtLoading ? (
                <div className="relative p-4 flex-auto overflow-y-auto">
                  Loading...
                </div>
              ) : (
                <>
                  <div className="relative p-4 flex-auto overflow-y-auto">
                    {artData && artData.length > 0 ? (
                      artData.map((x: any, index: number) => (
                        <div
                          className="flex justify-between items-center dark:text-white mb-6"
                          key={`Follower-${index}`}
                        >
                          <div className="relative flex items-center mr-3">
                            <img
                              src={x.image}
                              width="44px"
                              className="art"
                              height="44px"
                              alt=""
                            />
                            <div>
                              <div className="text-md ml-3 text-white text-left">
                                {x.title || 'Unknown'}
                              </div>
                              <p className="ml-6 userName text-left">
                                {x?.owner?.nickName || 'Not minted'}
                              </p>
                            </div>
                          </div>
                          <Link to={`/nft/${x.tokenId}`}>
                            <a
                              className="bg-btn-main size-auto text-white"
                              // onClick={toggleModal}
                            >
                              View
                            </a>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-md py-4 text-white">
                        No matched results.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {account ? (
          <div className="user-info" onClick={() => setIsOpen(!isOpen)}>
            <img
              src={user?.avatarImage || '/images/avatar-alt.png'}
              alt="user"
              className="avatar"
            />
            <div className="info">
              <div>
                <h3>{user?.nickName || 'Unknown'}</h3>
                <p>{shortenAddress(account)}</p>
              </div>
              <img
                src="/images/arrow.png"
                alt="arrow"
                className={isOpen ? 'rotate' : ''}
              />
            </div>
            {isOpen && (
              <div className="user-info-dropdown">
                {user?.id ? (
                  <>
                    <Link to={`/profile/${user?.id}`} className="mt-2">
                      My Profile
                    </Link>
                    <button
                      className="my-4"
                      onClick={() => {
                        setIsOpen(false)
                        logout()
                      }}
                    >
                      Logout
                      <IconLogout color="white" />
                    </button>
                  </>
                ) : (
                  <button
                    className="my-4"
                    onClick={() => {
                      setIsOpen(false)
                      login()
                    }}
                  >
                    Login
                    <IconLogin color="white" />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => !account && connectWallet()}
            className="wallet-btn"
          >
            Connect Wallet
          </div>
        )}
      </div>
    </>
  )
}

export default HeaderComponent
