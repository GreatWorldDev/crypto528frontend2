/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import './style.scss'

interface TokenomicsProps {
  lang: string
}

const Tokenomics = ({ lang }: TokenomicsProps) => {
  const { i18n } = useLingui()

  return (
    <div className="tokenomic" id="tokenomics">
      <h4>{i18n._(t`Tokenomics`)}</h4>
      <h6>
        {i18n._(t`Crypto528 DAO Republik will have a total token supply of 250,000,000
        which will be released in various stages and series. Of the total token
        supply 5% will be donated equally to various different charities.
        Project founding team tokens will be vested over a period of 4 years`)}
      </h6>
      <div className="info">
        {/* <div className="detail">
          <div className="last">
            <h2>TOKEN: THE GOVERNANCE TOKEN</h2>
          </div>
          <div>
            <h5 className="header">Information</h5>
            <h5>Details</h5>
          </div>
          <div>
            <h5>TokenSupply</h5>
            <p>100.000.000 BDRM ETH</p>
          </div>
          <div>
            <h5>Accepted Tokens</h5>
            <p>BTC, ETH, ETC, NEM, EOS</p>
          </div>
          <div>
            <h5>Project Protocol</h5>
            <p>ETH, ETC - BDRM 20</p>
          </div>
          <div>
            <h5>Total Supply</h5>
            <p>37.000.000 BDRM ETH</p>
          </div>
          <div className="last">
            <h5>Maximum Cap</h5>
            <p>60 M USD</p>
          </div>
          <div>
            <h5 className="header">Reward Distribution</h5>
            <h5>Details</h5>
          </div>
          <div>
            <h5>Allocated token</h5>
            <p>37.000.000 BDRM ETH</p>
          </div>
          <div className="last">
            <h2>THE 528 TOKEN</h2>
          </div>
        </div> */}
        <div className="reward">
          <img
            src={
              lang === '中文'
                ? '/images/tokenomics_zh.png'
                : lang === 'العربية'
                ? '/images/tokenomics_ar.png'
                : lang === 'Português'
                ? '/images/tokenomics_br.png'
                : lang === 'Español'
                ? '/images/tokenomics_es.png'
                : '/images/tokenomics.png'
            }
            alt="reward"
          />
        </div>
      </div>
    </div>
  )
}

export default Tokenomics
