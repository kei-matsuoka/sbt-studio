import { CreatedToken, MintedToken } from '@/types';

function convertTimestampToFormattedDate(timestamp: number) {
  // UNIXタイムスタンプをミリ秒に変換
  const date = new Date(timestamp * 1000);

  // 日付をフォーマットする
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
}

function formatEthAddress(address: string): string {
  return `${address.substring(0, 5)}...${address.substring(
    address.length - 5
  )}`;
}

function formatBurnAuth(burnAuth: number): string {
  switch (burnAuth) {
    case 0:
      return 'Creator Only';
    case 1:
      return 'Holder Only';
    case 2:
      return 'Both';
    case 3:
      return 'Neither';
    default:
      return 'Error';
  }
}

export function formatMintedTokens(tokens: MintedToken[]) {
  return tokens.map((token) => ({
    ...token,
    status: token.isBurned ? 'Burned' : 'Not Burned',
    formattedDate: convertTimestampToFormattedDate(token.mintedAtTimestamp),
  }));
}

export function formatCreatedToken(token: CreatedToken) {
  return {
    ...token,
    formattedAddress: formatEthAddress(token.id),
    supplyRatio: token.mintedTokens.length + ' / ' + token.maxSupply,
    owners: String(
      token.mintedTokens.filter((token) => !token.isBurned).length
    ),
    formattedBurnAuth: formatBurnAuth(token.burnAuth),
    formattedDate: convertTimestampToFormattedDate(token.createdAtTimestamp),
  };
}
