/* eslint-disable no-prototype-builtins */
import React, { useState, createContext, useEffect, useContext } from 'react'
import Web3 from 'web3'
import { toast } from 'react-toastify'
import { useWeb3React } from '@web3-react/core'

const BASE_URL = process.env.REACT_APP_BASE_URL

export interface User {
  id: string
  userName: string
  nickName: string
  address: string
  avatarImage: string
  bio: string
  followingCount: number
  coverImage: string
  discordUrl: string
  facebookUrl: string
  instagramUrl: string
  twitterUrl: string
  websiteUrl: string
  created: number
  verified: boolean
}
interface AuthProps {
  isAuthenticated: boolean
  user: User | null
  updateUser: (item: User) => void
  login: () => void
  logout: () => void
}
const AuthContext = createContext<AuthProps>({} as AuthProps)

export const AuthProvider: React.FC = ({ children }) => {
  const { deactivate, library, account } = useWeb3React()
  const [isAuthenticated, setIsAuthernticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const updateUser = (item: User) => {
    setUser(item)
    localStorage.setItem('crypto528User', JSON.stringify(item))
  }

  const login = async () => {
    if (account && library) {
      const signer = library.getSigner()
      const type = 'ethereum'
      const token: string = Math.floor(Math.random() * 100000).toString()
      const signature = await signer.signMessage(
        `crypto528 one-time key : ${token}`
      )

      const payload = {
        address: account,
        type,
        token,
        signature,
      }

      try {
        const res = await (
          await fetch(`${BASE_URL}/api/login`, {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
        ).json()
        localStorage.setItem('crypto528Token', res.token.token)
        localStorage.setItem('crypto528User', JSON.stringify(res.user))
        setIsAuthernticated(true)
        setUser(res.user)
      } catch {
        toast.error('Fail to connect server.')
      }
    }
  }

  const logout = () => {
    deactivate()
    localStorage.removeItem('crypto528Token')
    localStorage.removeItem('crypto528User')
    setIsAuthernticated(false)
    setUser(null)
  }

  useEffect(() => {
    const authUser = () => {
      const crypto528Token = localStorage.getItem('crypto528Token')
      const userInfo = localStorage.getItem('crypto528User')
      setIsAuthernticated(!!crypto528Token)
      setUser(userInfo ? JSON.parse(userInfo) : null)
    }
    authUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, updateUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
