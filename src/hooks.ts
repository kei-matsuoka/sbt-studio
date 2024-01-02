import { useAccount, useContractRead, useContractWrite } from 'wagmi';

import ERC20Json from '@/abis/ERC20Token.json';
import ERC721Json from '@/abis/ERC721Token.json';

export const useAirdropERC20 = (
  contractAddress: `0x${string}`,
  from: `0x${string}`
) => {
  const { address } = useAccount();

  // balanceOfの確認
  const balanceOf = useContractRead({
    address: contractAddress,
    abi: ERC20Json.abi,
    functionName: 'balanceOf',
    args: [address],
  });

  // allowanceの確認
  const allowance = useContractRead({
    address: contractAddress,
    abi: ERC20Json.abi,
    functionName: 'allowance',
    args: [from, address],
  });

  // transferの実行
  const transfer = useContractWrite({
    address: contractAddress,
    abi: ERC20Json.abi,
    functionName: 'transfer',
  });

  // transferFromの実行
  const transferFrom = useContractWrite({
    address: contractAddress,
    abi: ERC20Json.abi,
    functionName: 'transferFrom',
  });

  return {
    balanceOf,
    allowance,
    transfer,
    transferFrom,
  };
};

export const useAirdropERC721 = (
  contractAddress: `0x${string}`,
  tokenId: number
) => {
  const { address } = useAccount();

  // balanceOfの確認
  const balanceOf = useContractRead({
    address: contractAddress,
    abi: ERC721Json.abi,
    functionName: 'balanceOf',
    args: [address],
  });

  // getApprovedの確認
  const getApproved = useContractRead({
    address: contractAddress,
    abi: ERC721Json.abi,
    functionName: 'getApproved',
    args: [tokenId],
  });

  // safeTransferFromの実行
  const safeTransferFrom = useContractWrite({
    address: contractAddress,
    abi: ERC721Json.abi,
    functionName: 'safeTransferFrom',
  });

  return {
    balanceOf,
    getApproved,
    safeTransferFrom,
  };
};
