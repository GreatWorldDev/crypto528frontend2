/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import './style.scss'

interface ProceedProps {
  lang: string
}

const UseofProceeds = ({ lang }: ProceedProps) => {
  const { i18n } = useLingui()

  return (
    <div className="proceed">
      <h4 className="main-titles">{i18n._(t`Use of Seed Round Proceeds`)}</h4>
      <div>
        <img
          src={
            lang === '中文'
              ? '/images/useofproceeds_zh.png'
              : lang === 'العربية'
              ? '/images/useofproceeds_ar.png'
              : lang === 'Português'
              ? '/images/useofproceeds_br.png'
              : lang === 'Español'
              ? '/images/useofproceeds_es.png'
              : '/images/useofproceeds.png'
          }
          alt="proceed"
        />
      </div>
      <h4 className="main-titles">
        <Trans>
          <span>Crypto528</span> NFT Marketplace
        </Trans>
      </h4>
      <p className="main-contents">
        {i18n._(t`The 528 Turtles Club is a limited NFT collection which doubles as your
        membership to a futuristic utopian DAO Republik known as Crypto528`)}
      </p>
    </div>
  )
}

export default UseofProceeds
