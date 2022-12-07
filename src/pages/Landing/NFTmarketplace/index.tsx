/* eslint-disable import/no-extraneous-dependencies */
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import './style.scss'

const NFTmarketplace = () => {
  const { i18n } = useLingui()
  const navigate = useNavigate()
  const comingSoon = () => {
    navigate('/explore')
  }

  return (
    <div className="nftmarket" id="marketplace">
      <div className="banner">
        <div>
          <Trans>
            <h1>
              Discover Your Inner <br /> Turtle Spirit
            </h1>
          </Trans>
          <div className="btn-group">
            <button type="button" className="btnStyle1" onClick={comingSoon}>
              {i18n._(t`Start NFT Collection`)}
            </button>
            <button
              type="button"
              className="btnStyle2"
              onClick={() => navigate('/nftmarketplace')}
            >
              {i18n._(t`Create Account`)}
            </button>
          </div>
          {/* <div className="satistics">
            <div>
              <h2>50M+</h2>
              <p>Executive Assets</p>
            </div>
            <div>
              <h2>350K+</h2>
              <p>NFT Best Creator</p>
            </div>
            <div>
              <h2>100+</h2>
              <p>Platform Support</p>
            </div>
          </div> */}
        </div>
        <div>
          <div>
            <img src="/images/Crypto528_DAO.png" alt="Top Asset" />
            {/* <div>
              <img src="/images/avatar.png" alt="creator" />
              <div>
                <h6>Africa UNDER-30 Apes</h6>
                <p>Provide by Ryan Azhari</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTmarketplace
