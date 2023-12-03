export const createMetadata = (
  name: string,
  image: string,
  description: string
) => {
  const metadata = JSON.stringify({
    name,
    image,
    description,
  });
  return metadata;
};
