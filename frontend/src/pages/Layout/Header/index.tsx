/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
// this is a component file
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trans, t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import './style.scss'

interface HeaderProps {
  lang: string
  setLingui: (item: string) => void
  setLang: (item: string) => void
}

const Header = ({ lang, setLingui, setLang }: HeaderProps) => {
  const { i18n } = useLingui()

  const [isHamburger, setIsHamburger] = useState<boolean>(false)
  const [isDoc, setIsDoc] = useState<boolean>(false)
  const [isLang, setIsLang] = useState<boolean>(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const docRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      if (isHamburger) setIsHamburger(false)
    }
    if (docRef.current && !docRef.current.contains(event.target)) {
      if (isDoc) setIsDoc(false)
    }
    if (langRef.current && !langRef.current.contains(event.target)) {
      if (isLang) setIsLang(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)

    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  })

  return (
    <div className="landing-navbar">
      <Link to="/">
        <img src="/images/logolanding.png" alt="Logo" className="logo" />
      </Link>
      <div className={`menu ${isHamburger && 'active'}`} ref={headerRef}>
        <ul>
          <li>
            <a href="#overview">
              <Trans>Overview</Trans>
            </a>
          </li>
          <li>
            <a href="#marketplace" onClick={() => setIsHamburger(false)}>
              {i18n._(t`NFT Marketplace`)}
            </a>
          </li>
          <li>
            <a href="#ecosystem" onClick={() => setIsHamburger(false)}>
              {i18n._(t`Ecosystem`)}
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setIsHamburger(false)}>
              {i18n._(t`About us`)}
            </a>
          </li>
          <li>
            <a href="#tokenomics" onClick={() => setIsHamburger(false)}>
              {i18n._(t`Tokenomics`)}
            </a>
          </li>
          <li>
            <button type="button" onClick={() => setIsDoc(!isDoc)}>
              <p>{i18n._(t`Docs`)}</p>
              <img
                src="/images/arrow.png"
                alt="arrow"
                className={isDoc ? 'rotate' : ''}
              />
              {isDoc && (
                <div ref={docRef}>
                  <a
                    href={
                      lang === '中文'
                        ? '/docs/Crypto_528_-_Purchase_Agreement_08.09.22_zh.pdf'
                        : lang === 'العربية'
                        ? '/docs/Crypto_528_-_Purchase_Agreement_08.09.22_ar.pdf'
                        : lang === 'Português'
                        ? '/docs/Crypto_528_-_Purchase_Agreement_08.09.22_br.pdf'
                        : lang === 'Español'
                        ? '/docs/Crypto_528_-_Purchase_Agreement_08.09.22_es.pdf'
                        : '/docs/Crypto_528_-_Purchase_Agreement_08.09.22.pdf'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {i18n._(t`Purchase Agreement`)}
                  </a>
                  <a
                    href="https://www.certik.com/projects/crypto528-dao-republik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {i18n._(t`KYC Certificate`)}
                  </a>
                  <a
                    href="/docs/528_Holdings_Ltd_-_Certificate_of_Incorporation_-_20_May_2022.PDF"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {i18n._(t`Certificate of Incorporation`)}
                  </a>
                  <a
                    href="/docs/Crypto528_Privacy_Policy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {i18n._(t`Privacy Policy`)}
                  </a>
                  <a
                    href="/docs/Crypto528_Terms_and_Conditions.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {i18n._(t`Terms and Conditions`)}
                  </a>
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
                    rel="noopener noreferrer"
                  >
                    {i18n._(t`White Paper`)}
                  </a>
                  <Link to="/cryptocollege">{i18n._(t`Crypto College`)}</Link>
                </div>
              )}
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setIsLang(!isLang)}>
              <p>{lang}</p>
              <img
                src="/images/arrow.png"
                alt="arrow"
                className={isLang ? 'rotate' : ''}
              />
              {isLang && (
                <div ref={langRef}>
                  <a
                    onClick={() => {
                      setLingui('en')
                      setIsLang(false)
                      setLang('English')
                    }}
                  >
                    English
                  </a>
                  <a
                    onClick={() => {
                      setLingui('es')
                      setIsLang(false)
                      setLang('Español')
                    }}
                  >
                    Español
                  </a>
                  <a
                    onClick={() => {
                      setLingui('pt_BR')
                      setIsLang(false)
                      setLang('Português')
                    }}
                  >
                    Português
                  </a>
                  <a
                    onClick={() => {
                      setLingui('ar')
                      setIsLang(false)
                      setLang('العربية')
                    }}
                  >
                    العربية
                  </a>
                  <a
                    onClick={() => {
                      setLingui('zh_CN')
                      setIsLang(false)
                      setLang('中文')
                    }}
                  >
                    中文
                  </a>
                </div>
              )}
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
  )
}

export default Header
