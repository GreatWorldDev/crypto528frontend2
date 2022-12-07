/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
// this is a component file
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import './style.scss'

interface FooterEmail {
  email: string
  setEmail: (item: string) => void
  submit: (item: string) => void
  lang: string
}

const Footer = ({ email, setEmail, submit, lang }: FooterEmail) => {
  const { i18n } = useLingui()

  return (
    <div className="footer">
      <div>
        <div className="contact">
          <h4>{i18n._(t`Contact`)}</h4>
          <a href="mailto:info@crypto528.com">info@crypto528.com</a>
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
            <a
              href="https://t.me/crypto528DAO"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/images/Telegram.svg" alt="Telegram" />
            </a>
          </div>
        </div>
        <div className="about">
          <h4>{i18n._(t`About`)}</h4>
          <Link to="/">{i18n._(t`Home`)}</Link>
          <a href="/#about">{i18n._(t`About us`)}</a>
          <a href="#tokenomics">{i18n._(t`Tokenomics`)}</a>
          <a
            href={
              lang === '中文'
                ? 'https://crypto528.gitbook.io/crypto528-whitepaper/'
                : lang === 'العربية'
                ? 'https://crypto528.gitbook.io/alwrqh-alfnyh-l-crypto528/'
                : lang === 'Português'
                ? 'https://crypto528.gitbook.io/whitepaper-da-crypto528/'
                : lang === 'Español'
                ? 'https://crypto528.gitbook.io/crypto528-whitepaper-espanol/'
                : 'https://docs.crypto528.com'
            }
            target="_blank"
            rel="noreferrer"
          >
            {i18n._(t`White Paper`)}
          </a>
          <Link to="/cryptocollege">{i18n._(t`Crypto College`)}</Link>
        </div>
        <div className="newsletter">
          <h4>{i18n._(t`Newsletter`)}</h4>
          <p>
            {i18n._(t`Please enter your e-mail to receive our token updates.`)}
          </p>
          <div>
            <input
              type="text"
              placeholder={i18n._(t`Your e-mail`)}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="button" onClick={() => submit(email)}>
              {i18n._(t`Subscribe`)}
            </button>
          </div>
        </div>
        <div className="copyright">&copy; 528 Holdings Ltd</div>
      </div>
    </div>
  )
}

export default Footer
