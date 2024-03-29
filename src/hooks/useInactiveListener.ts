import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from '../connectors'

declare let window: any

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React()

  useEffect(() => {
    if (suppress) {
      // eslint-disable-next-line prettier/prettier
      return () => { }
    }
    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = (chainId: string) => {
        activate(injected)
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(injected)
        }
      }

      const handleNetworkChanged = (networkId: string) => {
        activate(injected)
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }

    // eslint-disable-next-line prettier/prettier
    return () => { }
  }, [active, error, suppress, activate])
}
