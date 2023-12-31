import PageTitle from '@/components/PageTitle';
import Card from '@/components/Card';
import { tokenConfig } from '@/constants';
import { TokenConfig } from '@/types';

export default function Airdrop() {
  return (
    <>
      <PageTitle title="Airdrop" />
      <div className="flex flex-wrap gap-3">
        {tokenConfig.map((token: TokenConfig) => (
          <Card page="airdrop" token={token} key={token.id} />
        ))}
      </div>
    </>
  );
}
