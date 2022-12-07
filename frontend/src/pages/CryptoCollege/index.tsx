/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { i18n } from '@lingui/core'
import { t, Trans } from '@lingui/macro'
import Layout from '../Layout'
import { blogs } from '../../constant/blogs'
import './style.scss'

const settings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '0px',
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 6000,
  speed: 500,
  initialSlide: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 845,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

const CryptoCollege = () => {
  return (
    <Layout>
      <div className="blog">
        <div className="banner">
          <div>
            <Trans>
              <h1>
                New to crypto? Not for long —{' '}
                <span>start with these guides and explainers</span>
              </h1>
            </Trans>
            <p>
              {i18n._(
                t`Cryptocurrencies like Bitcoin and Ethereum are powered by a technology called the blockchain. At its most basic, a blockchain is a list of transactions that anyone can view and verify.`
              )}
            </p>
            <a
              href="https://www.coinbase.com/learn/crypto-basics"
              target="_blank"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
          <div>
            <img src="/images/blog1.png" alt="blog" />
          </div>
        </div>
        <div className="latest">
          <h5>{i18n._(t`Latest posts`)}</h5>
          <Slider {...settings}>
            {blogs.map((item: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="slider" key={`faq-${index}`}>
                <div>
                  <img src={`/images/${item.image}`} alt="blog" />
                </div>
                <h3>{item.title}</h3>
                <div className="content">
                  <p dangerouslySetInnerHTML={{ __html: item?.content }} />
                </div>
                <Link to={`/cryptocollege/${index}`}>
                  <button type="button" className="readmore">
                    Read More
                  </button>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Layout>
  )
}

export default CryptoCollege
