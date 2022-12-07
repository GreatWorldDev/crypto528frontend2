/* eslint-disable import/no-extraneous-dependencies */
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { RoadmapSvg } from '../../../svgs'
import './style.scss'

const Roadmap = () => {
  const { i18n } = useLingui()

  return (
    <>
      <div className="roadmap">
        <h3>{i18n._(t`Roadmap`)}</h3>
        <Trans>
          <p>
            With help from <span>our teams, contributors</span> and{' '}
            <span>investors</span> these are the <span>milestones</span> we are
            looking forward to achieve.
          </p>
        </Trans>
        <div className="road-map-svg">
          <RoadmapSvg />
          <div className="tiles-card pos-absolute pos-1 ">
            <div>
              <img src="/images/finish.svg" alt="" />
              <p className="card-title">{i18n._(t`Q4 2022`)}</p>
              <div className="card-content">
                <ul>
                  <li>{i18n._(t`Trading platform + app development`)}</li>
                  <li>{i18n._(t`Traders input on Discord for design`)}</li>
                  <li>{i18n._(t`Beta testing of platform`)}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bar">
            <img src="/images/roadmapbar.png" alt="bar" />
          </div>
          <div className="tiles-card pos-absolute pos-2">
            <div>
              <img src="/images/finish.svg" alt="" />
              <p className="card-title">{i18n._(t`Q1 2023`)}</p>
              <div className="card-content">
                <ul>
                  <li>{i18n._(t`DAO governance token issued (TGE)`)} </li>
                  <li>{i18n._(t`IDO`)}</li>
                  <li>{i18n._(t`Liquidity pool funded`)}</li>
                  <li>{i18n._(t`Trading platform launch`)}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bar">
            <img src="/images/roadmapbar.png" alt="bar" />
          </div>
          <div className="tiles-card pos-absolute pos-3">
            <div>
              <img src="/images/finish.svg" alt="" />
              <p className="card-title">{i18n._(t`Q2 2023`)}</p>
              <div className="card-content">
                <ul>
                  <li>{i18n._(t`DAO governance board elections`)}</li>
                  <li>{i18n._(t`Build brand awareness`)}</li>
                  <li>{i18n._(t`Listing on Quickswap`)}</li>
                  <li>{i18n._(t`Additional liquidity pool funding `)}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bar">
            <img src="/images/roadmapbar.png" alt="bar" />
          </div>
          <div className="tiles-card pos-absolute pos-4">
            <div>
              <img src="/images/finish.svg" alt="" />
              <p className="card-title">{i18n._(t`Q3 2023`)}</p>
              <div className="card-content">
                <ul>
                  <li>{i18n._(t`Major Exchange Listing 1`)}</li>
                  <li>{i18n._(t`Expand brand awareness`)}</li>
                  <li>
                    {i18n._(t`Evaluate cryptocurrency mining profitability`)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="underbase2">
        <img src="/images/underbase2.png" alt="underbase2" />
      </div> */}
    </>
  )
}

export default Roadmap
