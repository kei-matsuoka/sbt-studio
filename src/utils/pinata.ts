import axios from 'axios';
import FormData from 'form-data';

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios({
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
    });

    const imageURI = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
    console.log('imageURI:', imageURI);
    return imageURI;
  } catch (error) {
    console.log('Error uploading image to IPFS: ', error);
  }
};

export const uploadJSON = async (metadata: string) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data: metadata,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
    });

    const jsonURI = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
    console.log('jsonURI:', jsonURI);
    return jsonURI;
  } catch (error) {
    console.log('Error uploading JSON to IPFS: ', error);
  }
};
