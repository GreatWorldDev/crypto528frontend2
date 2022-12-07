/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import './style.scss'

interface RewardProps {
  lang: string
}

const RewardDistribution = ({ lang }: RewardProps) => {
  const { i18n } = useLingui()

  return (
    <div className="rewardDistribute">
      <h4>{i18n._(t`Our Reward distribution`)}</h4>
      <div className="info">
        {/* <div className="detail">
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
        </div> */}
        <div className="reward">
          <img
            src={
              lang === '中文'
                ? '/images/rewarddistribution_zh.png'
                : lang === 'العربية'
                ? '/images/rewarddistribution_ar.png'
                : lang === 'Português'
                ? '/images/rewarddistribution_br.png'
                : lang === 'Español'
                ? '/images/rewarddistribution_es.png'
                : '/images/rewarddistribution.png'
            }
            alt="reward"
          />
        </div>
      </div>
      {/* <div className="underbase1">
        <img src="/images/underbase1.png" alt="" />
      </div> */}
    </div>
  )
}

export default RewardDistribution
