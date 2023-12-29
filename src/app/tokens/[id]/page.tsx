type Token = {
  id: string;
  name: string;
  symbol: string;
  imageURI: string;
  description: string;
  createdAtTimestamp: string;
};

export default function Token() {
  return (
    <div>
      <h1>会員証詳細</h1>
    </div>
  );
}
