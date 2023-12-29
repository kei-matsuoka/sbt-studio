export type Token = {
  id: string;
  name: string;
  imageURI: string;
  description: string;
  createdAtTimestamp: string;
};

export type MintedToken = {
  tokenId: string;
  minter: {
    id: string;
  };
  isBurned: boolean;
  mintedAtTimestamp: number;
};

export type FormattedToken = {
  tokenId: string;
  minter: {
    id: string;
  };
  status: string;
  formattedDate: string;
};
