import TOKEN_INFO from '../paymentTokenABIs/ERC20.json'
import USDC_INFO from '../paymentTokenABIs/USDC.json'
import USDT_INFO from '../paymentTokenABIs/USDT.json'

export const CHAIN_ID = 1

export const DefaultNetwork = Number(CHAIN_ID)

export const supportedChainIds = [1]

export const networkLists = [1, 5, 43113]

export const networkInfo: any = {
  1: {
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    nativeCurrency: 'ETH',
    explorer: 'https://etherscan.io',
  },
  5: {
    label: 'Goerli test network',
    rpcUrl: 'https://goerli.infura.io/v3/',
    nativeCurrency: 'GoerliETH',
    explorer: 'https://goerli.etherscan.io',
  },
  43113: {
    label: 'Avax test network',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    nativeCurrency: 'AVAX',
    explorer: 'https://testnet.snowtrace.io/',
  },
}

export const NFT_MARKET_ADDRESS: string =
  '0xdd0Ad8b02868F7F79AF843a6f5095314EE445608'
export const NFT_ADDRESS: string = '0xf45D5f69AE2138F4488A777c3AceEae2Ae248C90'

export const PAYMENT_TOKEN = {
  USDT: {
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: USDT_INFO,
  },
  USDC: {
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    abi: TOKEN_INFO,
  },
}

// export const PAYMENT_TOKEN = {
//   USDT: {
//     tokenAddress: '0xaeb9a4587ac3f43c7f96412e08ccd62e32ed27fc',
//     abi: TOKEN_INFO,
//   },
//   USDC: {
//     tokenAddress: '0xaf82969ecf299c1f1bb5e1d12ddacc9027431160',
//     abi: TOKEN_INFO,
//   },
// }
