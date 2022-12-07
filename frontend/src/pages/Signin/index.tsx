/* eslint-disable react/button-has-type */
import Header from '../../components/Header'
import Footer from './Footer'

const Signin = () => {
  return (
    <div className="signin">
      <Header />
      <div className="wallet-connect">
        <div>
          <img src="/images/Crypto528_DAO.png" alt="DAO Background" />
        </div>
        <div>
          <h2>
            <span>Connect wallet</span>to sign in
          </h2>
          <p>
            If you don't have a wallet yet, you can select a provider and create
            one now.
          </p>
          <div>
            <button>
              Metamask
              <img src="/images/metamask.png" alt="metamask" />
            </button>
            <button>
              Wallet Connect
              <img src="/images/walletconnect.png" alt="wallet connect" />
            </button>
          </div>
          <button>Connect wal</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signin
