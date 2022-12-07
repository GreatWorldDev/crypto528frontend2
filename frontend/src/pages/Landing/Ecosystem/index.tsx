/* eslint-disable import/no-extraneous-dependencies */
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import './style.scss'

const Ecosystem = () => {
  const { i18n } = useLingui()

  return (
    <div className="ecosystem" id="ecosystem">
      <h1>{i18n._(t`Ecosystem`)}</h1>
      <p>
        {i18n._(t`Crypto528 DAO Republik has a unique token economy which gives tokenholders exposure to a basket of cryptocurrency assets which are then  
        used to provide liquidity to the DAO's synthetic asset trading platform. Tokenholders are rewarded for staking their C-528 tokens and have the choice 
        in receiving monthly Bitcoin or USD Coin paid to their wallets. Operating as a DAO, Crypto528 is run by a governance board that is elected by C-528 tokenholders`)}
      </p>
      <div className="blocks">
        <div>
          <img src="/images/block1.png" alt="asset" />
          <h3>{i18n._(t`Crypto Trading Platform`)}</h3>
          <p>
            {i18n._(
              t`Crypto528 will use resources in the community treasury to build and supply liquidity to a collateralized cryptocurrency trading platform`
            )}
          </p>
        </div>
        <div>
          <img src="/images/block2.png" alt="asset" />
          <h3>{i18n._(t`Cryptocurrency Index`)}</h3>
          <p>
            {i18n._(t`Crypto528 will hold a basket of cryptocurrencies which provides C-528 tokenholders exposure to 
            multiple different crypto assets`)}
          </p>
        </div>
        <div>
          <img src="/images/block3.png" alt="asset" />
          <h3>{i18n._(t`Staking Rewards`)}</h3>
          <p>
            {i18n._(t`All C-528 tokenholders that participate in staking will receive
            monthly BTC or USDC rewards paid to the wallet of their choosing`)}
          </p>
        </div>
        <div>
          <img src="/images/block4.png" alt="asset" />
          <h3>{i18n._(t`Treasury`)}</h3>
          <p>
            {i18n._(t`Crypto528 will hold all resources in a community owned treasury that
            can only be accessed with a vote done by C-528 tokenholders`)}
          </p>
        </div>
        <div>
          <img src="/images/block5.png" alt="asset" />
          <h3>{i18n._(t`Deflationary`)}</h3>
          <p>
            {i18n._(t`The DAO will propose to use 5% of any monthly rewards that are
            distributed to buyback and burn (remove) C-528 tokens`)}
          </p>
        </div>
        <div>
          <img src="/images/block6.png" alt="asset" />
          <h3>{i18n._(t`Global Charity Initiatives`)}</h3>
          <p>
            {i18n._(t`Crypto528 will donate 5% of the C-528 token supply to various
            charities that are approved by the DAO`)}
          </p>
        </div>
        <div>
          <img src="/images/block7.png" alt="asset" />
          <h3>{i18n._(t`Governance Board`)}</h3>
          <p>
            {i18n._(
              t`Every four years the Crypto528 DAO Republik will hold elections where C-528 
              tokenholders can vote to elect eight Chancellors and one Overseer to the governance board. 
              Governance board members will be responsible for managing the DAO operations and driving value for tokenholders`
            )}
          </p>
        </div>
        <div>
          <img src="/images/block8.png" alt="asset" />
          <h3>{i18n._(t`Environmental, Social & Governance (ESG)`)}</h3>
          <p>
            {i18n._(t`Crypto528's approach to Environment, Social and Governance (ESG) is
            guided by the United Nations Sustainable Development Goals (UNSDG)`)}
          </p>
        </div>
        <div>
          <img src="/images/block9.png" alt="asset" />
          <h3>{i18n._(t`Samantha: Crypto528 Proprietary AI`)}</h3>
          <p>
            {i18n._(
              t`Samantha, a neural network, will scan the order flow of a large quantity of crypto assets and will select, based on risk and performance ratios, the ones with the highest risk rewards ratios as well as the holdings’ percentage.`
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Ecosystem
