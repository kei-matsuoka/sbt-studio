import { MintedToken } from '@/types';

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

export function formatMintedTokens(tokens: MintedToken[]) {
  return tokens.map((token) => ({
    ...token,
    status: token.isBurned ? 'Burned' : 'Active',
    formattedDate: convertTimestampToFormattedDate(token.mintedAtTimestamp),
  }));
}
