/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Creators from './Creators'
import Explore from './Explore'
import Footer from '../../components/Footer'

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/modules/effect-fade/effect-fade'
import 'swiper/modules/navigation/navigation'
import 'swiper/modules/pagination/pagination'
import 'swiper/swiper.scss'
import './style.scss'
import Header from '../../components/Header'

const coverEffectSetting = {
  rotate: 0,
  stretch: -100,
  depth: 200,
  modifier: 1,
  slideShadows: true,
}

const breakPointsSetting = {
  768: {
    slidesPerView: 3,
    coverflowEffect: {
      stretch: -80,
      depth: 200,
      modifier: 1,
    },
  },
  1200: {
    slidesPerView: 3,
    coverflowEffect: {
      stretch: -80,
      depth: 200,
      modifier: 1,
    },
  },
  1400: {
    slidesPerView: 3,
    coverflowEffect: {
      stretch: -100,
      depth: 200,
      modifier: 1,
    },
  },
}

const mainImages = [
  'https://528holdings.mypinata.cloud/ipfs/Qme395uEBW4nPGmJiWVvg95cLEk7R7JhuZuPdJcHEZ4vFB?filename=528%2520Turtles%2520Club%2520%2523468.png',
  'https://528holdings.mypinata.cloud/ipfs/QmeKiSngSWcD5jdJDvstJJ1gnSXkCFgSGCHMB85z9HGKPZ?filename=528%2520Turtles%2520Club%2520%252345.png',
  'https://528holdings.mypinata.cloud/ipfs/QmUbGasaR8kwSww9PadCyrFdtL1gh8LvtA1c8gJWrySfjh?filename=528%2520Turtles%2520Club%2520%252359.png',
  'https://528holdings.mypinata.cloud/ipfs/QmSDtPBTJvuatF35iTWvrUKZmtwiqYSU3qRCvehy9QhXhz?filename=528%2520Turtles%2520Club%2520%252362.png',
  'https://528holdings.mypinata.cloud/ipfs/QmTqd6y3STarM8zyXTCzuUKsUVtfJfTzsR6pPptvRStuY9?filename=528%2520Turtles%2520Club%2520%2523115.png',
  'https://528holdings.mypinata.cloud/ipfs/QmbSGrDZFFKewzQSGyjjmcnxWgHpzV6ewVdjUaZiqHiWa8?filename=528%2520Turtles%2520Club%2520%2523417.png',
  'https://528holdings.mypinata.cloud/ipfs/QmdvuweSJrdzgV4FbwNc4FfhuJMG1nEeNeYjYsmsSsgxm6?filename=528%2520Turtles%2520Club%2520%2523453.png',
  'https://528holdings.mypinata.cloud/ipfs/QmVfk2P76EGbdKyrAwtxY5cR5zVAQH16XB46HXDEkW198Q?filename=528%2520Turtles%2520Club%2520%2523289.png',
  'https://528holdings.mypinata.cloud/ipfs/QmZTPeeDVMn6W9bXukPQ5Zqqtcxr3z5XqsgDdfhZ6jya3o?filename=528%2520Turtles%2520Club%2520%2523309.png',
  'https://528holdings.mypinata.cloud/ipfs/QmYF6LVEp7PoyF5qULFX95PyvPid3KHYqE3MnZjaxvXs8u?filename=528%2520Turtles%2520Club%2520%2523276.png',
  'https://528holdings.mypinata.cloud/ipfs/QmPExtSm6N4mCJK5xvWTPULVuWn3t52e5vB1ZJce2hzqaq?filename=528%2520Turtles%2520Club%2520%252322.png',
  'https://528holdings.mypinata.cloud/ipfs/QmVdgbZty4mpCK4BLsMFVoB9w7MnxQjxrgtzpX81Pub4Zf?filename=528%2520Turtles%2520Club%2520%2523361.png',
]

const localImages = [
  '/sliders/1.png',
  '/sliders/2.png',
  '/sliders/3.png',
  '/sliders/4.png',
  '/sliders/5.png',
  '/sliders/6.png',
  '/sliders/7.png',
  '/sliders/8.png',
  '/sliders/9.png',
  '/sliders/10.png',
  '/sliders/11.png',
]

const Home = () => {
  const { account, library, active, activate } = useWeb3React()

  const comingSoon = () => {
    toast.info('Coming soon!')
  }

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="nftmarketplace">
      <Header />
      <div className="banner-wrapper">
        <div className="banner">
          <div>
            <h1>
              Best Collection Of <span>NFT</span> Digital Assets
            </h1>
            <p>
              More easier to collect the best NFT digital assets from various
              creators and figures in this part of the world with your crypto
              money now
            </p>
            {/* <div className="btn-group">
              <Link to="/nfts" className="btnStyle1">
                Start NFT Collection
              </Link>
              <Link to="/" className="btnStyle2">
                Create Account
              </Link>
            </div> */}
          </div>
          <div>
            <div>
              <img src="/images/Crypto528_DAO.png" alt="Top Asset" />
            </div>
          </div>
        </div>
      </div>
      <div className="slider-container">
        <h3>
          Get <Link to="/nfts">Popular NFT </Link>Collection <br />
          Here For You
        </h3>
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          effect="coverflow"
          centeredSlides
          autoplay={{
            delay: 3000,
          }}
          grabCursor
          coverflowEffect={coverEffectSetting}
          breakpoints={breakPointsSetting}
          navigation
          loop
        >
          {localImages.map((image: string, index: number) => (
            <SwiperSlide key={`explore-slider-${index}`}>
              <img src={image} alt="sliderImage" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Explore />
      {/* <Creators /> */}
      <Footer />
    </div>
  )
}

export default Home
