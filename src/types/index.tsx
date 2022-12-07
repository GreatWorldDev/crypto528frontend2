export interface ChartData {
  price: number
  // eslint-disable-next-line camelcase
  y_position: number
  time: number
}

export interface TypeNFT {
  tokenId: string
  auctionInfo: TypeAuctionInfo | null
  category: string
  creator: TypeNFTOwner
  owner: TypeNFTOwner
  currencyType: string
  title: string
  description: string
  image: string
  imageType: string
  isSale: boolean
  price: number
  tokenURI: string
  created?: number
  bidHistory: TypeNFTHistory[] | []
  totalHistory: TypeNFTHistory[] | []
  followerCount: number
  traits: { key: string; value: string }[]
  tags: string[]
}

export interface TypeNFTHistory {
  tokenId: string
  walletAddress: string
  walletType: string
  user: TypeNFTOwner
  time: number
  actionType: string
  price: number
  priceUSD: number
  transactionURL: string
}

export interface TypeAuctionInfo {
  tokenId: string
  auctionCreator: TypeNFTOwner
  lastBidder: TypeNFTOwner | null
  auctionStartTime: number
  auctionEndTime: number
  currentPrice: number
}

export interface TypeNFTOwner {
  id: string
  addressAlgo: string[]
  addressPoly: string[]
  avatarImage: string
  nickName: string
  userName: string
  bio: string
  followerCount: number
  followingCount: number
}

export interface NFTCardType {
  title: string
  image: string
  isOnSale: boolean
  highestBid?: number
  minBid?: number
}

export interface CreatorType {
  name: string
  avatar: string
  id: string
  totalAssets: number
  followers: number
  topNFTs: string[]
}

export interface TypeExplorerFilter {
  searchText: string
  status: string
  price: {
    startPrice: string
    endPrice: string
  }
  collection: string
  category: string
}

export interface FilterType {
  title: string
  slug: string
}

export interface TypeCurrency {
  title: string
  rate: number
}

export const durations: string[] = [
  '20 mins', // for only test
  '12 hours',
  '1 day',
  '3 days',
  '5 days',
  '7 days',
]
export const durationsTime: any = {
  '20 mins': 20 * 60, // for only test
  '12 hours': 12 * 3600,
  '1 day': 24 * 3600,
  '3 days': 3 * 24 * 3600,
  '5 days': 5 * 24 * 3600,
  '7 days': 7 * 24 * 3600,
}
export const paymentTypes: string[] = ['ETH', 'USDC']

export const levelETHPrices = [0.05, 0.25, 0.5, 2.5, 5, 10, 20, 50]
export const levelPrices = [50, 250, 500, 2500, 5000, 10000, 20000, 50000]

export const mockNftDatas: TypeNFT[] = [
  {
    tokenId: '1',
    auctionInfo: null,
    category: 'art',
    creator: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    owner: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    currencyType: 'ALGO',
    title: 'Test NFT',
    description: 'This is test NFT',
    image: '/img/nft/1.png',
    imageType: 'image',
    isSale: true,
    price: 5636,
    tokenURI:
      'https://ipfs.io/ipfs/bafybeic6zypfb72zbk3guhrhs3jhywrlhhxvcrclh2qwhcw2rdh7dfn6q4/metadata.json',
    created: 1629971030309,
    followerCount: 0,
    bidHistory: [],
    totalHistory: [],
    traits: [],
    tags: [
      '3d makeup',
      'digital makeup',
      'digital',
      'cosmic',
      'new dimensions',
    ],
  },
  {
    tokenId: '2',
    auctionInfo: null,
    category: 'art',
    creator: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    owner: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    currencyType: 'ALGO',
    title: 'Test NFT',
    description: 'This is test NFT',
    image: '/img/nft/2.png',
    imageType: 'image',
    isSale: true,
    price: 5636,
    tokenURI:
      'https://ipfs.io/ipfs/bafybeic6zypfb72zbk3guhrhs3jhywrlhhxvcrclh2qwhcw2rdh7dfn6q4/metadata.json',
    created: 1629971030309,
    followerCount: 0,
    bidHistory: [],
    totalHistory: [],
    traits: [],
    tags: [
      '3d makeup',
      'digital makeup',
      'digital',
      'cosmic',
      'new dimensions',
    ],
  },
  {
    tokenId: '3',
    auctionInfo: null,
    category: 'art',
    creator: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    owner: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    currencyType: 'ALGO',
    title: 'Test NFT',
    description: 'This is test NFT',
    image: '/img/nft/3.png',
    imageType: 'image',
    isSale: true,
    price: 5636,
    tokenURI:
      'https://ipfs.io/ipfs/bafybeic6zypfb72zbk3guhrhs3jhywrlhhxvcrclh2qwhcw2rdh7dfn6q4/metadata.json',
    created: 1629971030309,
    followerCount: 0,
    bidHistory: [],
    totalHistory: [],
    traits: [],
    tags: [
      '3d makeup',
      'digital makeup',
      'digital',
      'cosmic',
      'new dimensions',
    ],
  },
  {
    tokenId: '4',
    auctionInfo: null,
    category: 'art',
    creator: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    owner: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    currencyType: 'ALGO',
    title: 'Test NFT',
    description: 'This is test NFT',
    image: '/img/nft/4.png',
    imageType: 'image',
    isSale: true,
    price: 5636,
    tokenURI:
      'https://ipfs.io/ipfs/bafybeic6zypfb72zbk3guhrhs3jhywrlhhxvcrclh2qwhcw2rdh7dfn6q4/metadata.json',
    created: 1629971030309,
    followerCount: 0,
    bidHistory: [],
    totalHistory: [],
    traits: [],
    tags: [
      '3d makeup',
      'digital makeup',
      'digital',
      'cosmic',
      'new dimensions',
    ],
  },
  {
    tokenId: '5',
    auctionInfo: null,
    category: 'art',
    creator: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    owner: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    currencyType: 'ALGO',
    title: 'Test NFT',
    description: 'This is test NFT',
    image: '/img/nft/5.png',
    imageType: 'image',
    isSale: true,
    price: 5636,
    tokenURI:
      'https://ipfs.io/ipfs/bafybeic6zypfb72zbk3guhrhs3jhywrlhhxvcrclh2qwhcw2rdh7dfn6q4/metadata.json',
    created: 1629971030309,
    followerCount: 0,
    bidHistory: [],
    totalHistory: [],
    traits: [],
    tags: [
      '3d makeup',
      'digital makeup',
      'digital',
      'cosmic',
      'new dimensions',
    ],
  },
  {
    tokenId: '6',
    auctionInfo: null,
    category: 'art',
    creator: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    owner: {
      id: '1',
      addressPoly: [
        '0xOOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      addressAlgo: [
        'OOEKZRB4DN4GEJSXDBOCCWQAZYJQG7Z4VPYHZQNN7E6YIFXHBFHTCFU5Y4',
      ],
      avatarImage: '/images/avatar-alt.png',
      nickName: '@nickName',
      userName: 'User Name',
      bio: 'This is test user',
      followerCount: 4,
      followingCount: 2,
    },
    currencyType: 'ALGO',
    title: 'Test NFT',
    description: 'This is test NFT',
    image: '/img/nft/6.png',
    imageType: 'image',
    isSale: true,
    price: 5636,
    tokenURI:
      'https://ipfs.io/ipfs/bafybeic6zypfb72zbk3guhrhs3jhywrlhhxvcrclh2qwhcw2rdh7dfn6q4/metadata.json',
    created: 1629971030309,
    followerCount: 0,
    bidHistory: [],
    totalHistory: [],
    traits: [],
    tags: [
      '3d makeup',
      'digital makeup',
      'digital',
      'cosmic',
      'new dimensions',
    ],
  },
]
