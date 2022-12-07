// this is a component file
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { isMobile } from 'react-device-detect'
import { useAuthContext } from '../../../context/useAuth'
import { DefaultNetwork, networkInfo } from '../../../constant'
import {
  chainIdToHexString,
  shortenAddress,
} from '../../../utils/web3Functions'

import './style.scss'
import { useEagerConnect } from '../../../hooks/useEagerConnect'
import { useInactiveListener } from '../../../hooks/useInactiveListener'

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
  const { login, logout } = useAuthContext()
  const location = useLocation()
  const { pathname } = location
  const splitLocation = pathname.split('/')
  const triedEager = useEagerConnect()
  const [activatingConnector, setActivatingConnector] = useState()
  useInactiveListener(!triedEager || !!activatingConnector)

  const [isHamburger, setIsHamburger] = useState<boolean>(false)
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError
  const [wrongNetwork, setWrongNetwork] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      if (isHamburger) setIsHamburger(false)
    }
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

  // useEffect(() => {
  //   if (!account) connectWallet()
  // }, [active, account])

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
      <div className="navbar">
        <Link to="/">
          <img src="images/nftlogo.png" alt="Logo" className="logo" />
        </Link>
        <div className={`menu ${isHamburger ? 'active' : ''}`} ref={headerRef}>
          <ul>
            <li>
              <Link to="/" className={splitLocation[1] === '' ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className={splitLocation[1] === 'nfts' ? 'active' : ''}
                onClick={() => setIsHamburger(false)}
              >
                NFTs
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className={splitLocation[1] === 'support' ? 'active' : ''}
                onClick={() => setIsHamburger(false)}
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                to="/cryptocollege"
                className={splitLocation[1] === 'blogs' ? 'active' : ''}
                onClick={() => setIsHamburger(false)}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={splitLocation[1] === 'about' ? 'active' : ''}
                onClick={() => setIsHamburger(false)}
              >
                About
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => !account && connectWallet()}
                className="wallet-btn"
              >
                {account ? shortenAddress(account) : 'Connect Wallet'}
              </button>
            </li>
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setIsHamburger(!isHamburger)}
          className={`hamburger ${isHamburger && 'active'}`}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </>
  )
}

export default HeaderComponent
