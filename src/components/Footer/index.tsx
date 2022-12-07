import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { t } from '@lingui/macro'
import { Link } from 'react-router-dom'
import { useLingui } from '@lingui/react'
import './style.scss'

const Footer = () => {
  const { i18n } = useLingui()

  return (
    <>
      <div className="nft-footer">
        <div>
          <h2>{i18n._(t`Services`)}</h2>
          <Link to="/">{i18n._(t`NFT Assets`)}</Link>
          <Link to="/">{i18n._(t`Crypto528`)}</Link>
          <Link to="https://www.crypto528.com/cryptocollege">
            {i18n._(t`Crypto College`)}
          </Link>
          <Link to="/">{i18n._(t`Newsletter`)}</Link>
        </div>
        <div>
          <h2>{i18n._(t`Information`)}</h2>
          <Link to="/">{i18n._(t`Sign Up`)}</Link>
          <Link to="/">{i18n._(t`NFT Dashboard`)}</Link>
          <Link to="/">{i18n._(t`About Us`)}</Link>
        </div>
        <div>
          <h2>{i18n._(t`Company`)}</h2>
          <Link to="https://www.crypto528.com/docs/Crypto528_Terms_and_Conditions.pdf">
            {i18n._(t`Terms of Use`)}
          </Link>
          <Link to="/">{i18n._(t`FAQ`)}</Link>
          <Link to="/">{i18n._(t`Contact Us`)}</Link>
          <Link to="/">{i18n._(t`Partnership`)}</Link>
        </div>
        <div>
          <h2>{i18n._(t`Get in touch`)}</h2>
          <h3>
            Want to become a Crypto528 Ambassador? <br /> Email us at
            social@crypto528.com
          </h3>
          <div className="contact">
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
          </div>
        </div>
      </div>
      <h4 className="nft-copyright">&copy; 528 Holdings Ltd</h4>
    </>
  )
}

export default Footer
