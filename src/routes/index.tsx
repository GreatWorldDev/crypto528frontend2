import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import CryptoCollege from '../pages/CryptoCollege'
import Landing from '../pages/Landing'
import { ErrorPage } from '../pages/404Page'
import CollegeDetail from '../pages/CryptoCollege/detail'
import Home from '../pages/Home'
import Explore from '../pages/ExploreLayout'
import Profile from '../pages/Profile'
import Detail from '../pages/Detail'
import KYC from '../pages/KYC'
import { Setting } from '../pages/Setting'
import 'aos/dist/aos.css'

const blockList = [
  'AF',
  'BY',
  'CF',
  'CN',
  'CU',
  'KP',
  'IR',
  'CD',
  'HK',
  'LY',
  'SO',
  'RU',
  'ZW',
]

const Router = () => {
  const [isBlockList, setIsBlockList] = useState<boolean>(false)
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    if (blockList.includes(res.data.country_code)) {
      setIsBlockList(true)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    AOS.init({
      once: true,
    })
    AOS.refresh()
  })

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        {isBlockList ? (
          <Route path="/" element={<ErrorPage />} />
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/cryptocollege" element={<CryptoCollege />} />
            <Route path="/cryptocollege/:id" element={<CollegeDetail />} />
            {/* <Route path="/nftmarketplace" element={<Home />} /> */}
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/nft/:tokenId" element={<Detail />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
