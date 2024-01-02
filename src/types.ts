export type Token = {
  id: string;
  name: string;
  imageURI: string;
  description: string;
  mintedTokens: MintedToken[];
};

export type TokenConfig = {
  id: string;
  name: string;
  imageURI: string;
  description: string;
};

export type MintedToken = {
  tokenId: number;
  minter: {
    id: string;
  };
  isBurned: boolean;
  mintedAtTimestamp: number;
};

export type FormattedMintedToken = {
  tokenId: number;
  minter: {
    id: string;
  };
  isBurned: boolean;
  mintedAtTimestamp: number;
  status: string;
  formattedDate: string;
};

export type CreatedToken = {
  id: string;
  name: string;
  imageURI: string;
  description: string;
  maxSupply: number;
  burnAuth: number;
  createdAtTimestamp: number;
  mintedTokens: MintedToken[];
};

export type FormattedCreatedToken = {
  id: string;
  name: string;
  imageURI: string;
  description: string;
  maxSupply: number;
  burnAuth: number;
  createdAtTimestamp: number;
  mintedTokens: MintedToken[];
  formattedAddress: string;
  supplyRatio: string;
  owners: string;
  formattedBurnAuth: string;
  formattedDate: string;
};
