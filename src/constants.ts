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

export const tokenTableHeader = ['TOKEN ID', 'HOLDER', 'MINTED AT', 'BURN'];

export const quickLinks = [
  {
    href: '/tokens/create',
    src: '/membership.png',
    alt: 'Membership Token',
    title: 'Create Membership Token',
    description:
      'Create your own membership token and distribute it to your community.',
  },
  {
    href: '/airdrop/erc20',
    src: '/coin.png',
    alt: 'ERC20',
    title: 'Airdrop ERC20 Token',
    description:
      'Airdrop your ERC20 token to your community and grow your community.',
  },
  {
    href: '/airdrop/erc721',
    src: '/nft.png',
    alt: 'ERC721',
    title: 'Airdrop ERC721 Token',
    description:
      'Airdrop your ERC721 token to your community and grow your community.',
  },
  {
    href: '/airdrop/erc1155',
    src: '/nfts.png',
    alt: 'ERC1155',
    title: 'Airdrop ERC1155 Token',
    description:
      'Airdrop your ERC1155 token to your community and grow your community.',
  },
];

export const sbtFactoryAddress = '0x80bE32C2549Fb64DDafBe34139C7D75A2BB865bf';