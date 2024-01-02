export const pageConfig = [
  {
    href: '/',
    title: 'Home',
    icon: '/home.svg',
  },
  {
    href: '/tokens',
    title: 'Tokens',
    icon: '/identification.svg',
  },
  {
    href: '/airdrop',
    title: 'Airdrop',
    icon: '/cloud.svg',
  },
  {
    href: '/messaging',
    title: 'Messaging',
    icon: '/chat.svg',
  },
  {
    href: '/analytics',
    title: 'Analytics',
    icon: '/chart.svg',
  },
  {
    href: '/integration',
    title: 'Integration',
    icon: '/code.svg',
  },
];

export const tokenConfig = [
  {
    id: 'erc20',
    name: 'ERC20',
    description:
      'ERC20 is a technical standard used for smart contracts on the Ethereum blockchain for implementing tokens. ERC stands for Ethereum Request for Comment, and 20 is the number that was assigned to this request.',
    imageURI: '/coin.png',
  },
  {
    id: 'erc721',
    name: 'ERC721',
    description:
      'ERC721 is a free, open standard that describes how to build non-fungible or unique tokens on the Ethereum blockchain. While most tokens are fungible (every token is the same as every other token), ERC721 tokens are all unique.',
    imageURI: '/nft.png',
  },
  {
    id: 'erc1155',
    name: 'ERC1155',
    description:
      'ERC1155 is a standard interface for contracts that manage multiple token types. It is inspired by and inherits from ERC721, but unlike ERC721, ERC1155 tokens are fungible and minted in batches.',
    imageURI: '/nfts.png',
  },
];

export const tokenTableHeader = ['TOKEN ID', 'HOLDER', 'MINTED AT', 'STATUS'];
