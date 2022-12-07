/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import Slider from 'react-slick'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { useLinguiContext } from '../../context/LinguiContext'
import Ecosystem from './Ecosystem'
import Layout from '../Layout'
import RewardDistribution from './RewardDistribution'
import Tokenomics from './Tokenomics'
import Roadmap from './Roadmap'
import UseofProceeds from './UseofProceeds'
import NFTmarketplace from './NFTmarketplace'
import Team from './Team'
import FAQ from './FAQ'
import './style.scss'

const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 2000,
  autoplay: true,
  autoplaySpeed: 6000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const api = 'https://crypto528.herokuapp.com'
// const api = 'http://localhost:5000'
const baseURL = `${api}/api/v1/submitEmail`

const Landing = () => {
  const { i18n } = useLingui()
  const { lang } = useLinguiContext()
  const [topEmail, setTopEmail] = useState<string>('')
  const handleEmailCollector = async (email: string) => {
    if (!email) {
      toast.error('Please input email!')

      return
    }

    // eslint-disable-next-line no-useless-escape
    if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.error(`Please enter a valid email address.`)

      return
    }
    const location = await axios.get('https://geolocation-db.com/json/')
    const locale = localStorage.getItem('crypto528-locale')

    axios
      .post(baseURL, { email, location: location.data, locale })
      .then(response => {
        toast.success(response.data.message)
      })
      .catch((error: any) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <Layout>
      <Slider {...settings}>
        <div className="banner-slider" id="overview">
          <div>
            <h1>
              <Trans>
                Welcome to <br /> Crypto528 DAO Republik
              </Trans>
            </h1>
            <p>{i18n._(t`A tokenized blockchain society`)}</p>
            <div className="subscribe hide">
              <input
                type="text"
                placeholder={i18n._(t`Type email here to subscribe for token`)}
                value={topEmail}
                onChange={e => setTopEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleEmailCollector(topEmail)}
              >
                {i18n._(t`Subscribe`)}
              </button>
            </div>
          </div>
          <div>
            <img src="/images/slider1.png" alt="slider1" />
            <div className="subscribe show">
              <input
                type="text"
                placeholder={i18n._(t`Type email here to subscribe for token`)}
                value={topEmail}
                onChange={e => setTopEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleEmailCollector(topEmail)}
              >
                {i18n._(t`Subscribe`)}
              </button>
            </div>
          </div>
        </div>
        <div className="banner-slider">
          <div>
            <h1>
              {i18n._(t`Futuristic, AI, Trading Platform in the Multiverse`)}
            </h1>
            <p>
              {i18n._(t`A crypto trading platform made by traders for traders`)}
            </p>
            <div className="subscribe hide">
              <input
                type="text"
                placeholder={i18n._(t`Type email here to subscribe for token`)}
                value={topEmail}
                onChange={e => setTopEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleEmailCollector(topEmail)}
              >
                {i18n._(t`Subscribe`)}
              </button>
            </div>
          </div>
          <div>
            <img src="/images/slider2.png" alt="slider1" />
            <div className="subscribe show">
              <input
                type="text"
                placeholder={i18n._(t`Type email here to subscribe for token`)}
                value={topEmail}
                onChange={e => setTopEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleEmailCollector(topEmail)}
              >
                {i18n._(t`Subscribe`)}
              </button>
            </div>
          </div>
        </div>
        <div className="banner-slider">
          <div>
            <h1>{i18n._(t`Pays You Monthly Staking Rewards`)}</h1>
            <p>{i18n._(t`Earn staking rewards in either BTC or USDC`)}</p>
            <div className="subscribe hide">
              <input
                type="text"
                placeholder={i18n._(t`Type email here to subscribe for token`)}
                value={topEmail}
                onChange={e => setTopEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleEmailCollector(topEmail)}
              >
                {i18n._(t`Subscribe`)}
              </button>
            </div>
          </div>
          <div>
            <img src="/images/slider3.png" alt="slider1" />
            <div className="subscribe show">
              <input
                type="text"
                placeholder={i18n._(t`Type email here to subscribe for token`)}
                value={topEmail}
                onChange={e => setTopEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleEmailCollector(topEmail)}
              >
                {i18n._(t`Subscribe`)}
              </button>
            </div>
          </div>
        </div>
      </Slider>
      <div className="social">
        <a
          href="https://www.linkedin.com/company/crypto528dao/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/Linkedin.svg" alt="linkedin" />
        </a>
        <a
          href="https://mobile.twitter.com/crypto528dao?s=21"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/Twitter.svg" alt="Twitter" />
        </a>
        <a
          href="https://www.facebook.com/Crypto528DAO/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/Facebook.svg" alt="Facebook" />
        </a>
        <a
          href="https://www.instagram.com/crypto528dao/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/Instagram.svg" alt="Instagram" />
        </a>
        <a
          href="https://medium.com/@Crypto528DAO"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/Medium.svg" alt="Medium" />
        </a>
        <a
          href="https://www.tiktok.com/@crypto528dao"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/Tiktok.svg" alt="Tiktok" />
        </a>
        <a
          href="https://discord.gg/yvUFF26BkJ"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/Discord.svg" alt="Discord" />
        </a>
        <a
          href="https://www.reddit.com/user/Crypto528DAO/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/Reddit.svg" alt="Reddit" />
        </a>
        <a href="https://t.me/crypto528DAO" target="_blank" rel="noreferrer">
          <img src="/images/Telegram.svg" alt="Telegram" />
        </a>
      </div>
      <Ecosystem />
      <RewardDistribution lang={lang} />
      <Roadmap />
      <Tokenomics lang={lang} />
      <UseofProceeds lang={lang} />
      <NFTmarketplace />
      <Team lang={lang} />
      <FAQ />
    </Layout>
  )
}

export default Landing
