export const shortenAddress = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-4)}`

export const chainIdToHexString = (chainId: number | null) =>
  chainId && `0x${chainId.toString(16)}`

export const chainIdToNumber = (chainId: string) =>
  parseInt(Number(chainId).toString(10), 10)
