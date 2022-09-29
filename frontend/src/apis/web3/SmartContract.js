import Web3 from "web3";

const web3 = new Web3("http://j7c2081.p.ssafy.io:8545");

// Token Contract
const TokenABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
export const TokenCA = "0x53D0650Aff21fe90C8d47A9B72122a123dD73f98";

export const TokenContract = new web3.eth.Contract(TokenABI, TokenCA);

// NFT Contract
const NFTABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string"
      }
    ],
    name: "mintNFT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "allTokenUris",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "getTokenURIs",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
const NFTCA = "0xa62AcEf1640B5Eb12757f7e8f6Af73DbCd6EB9F5";

export const NFTContract = new web3.eth.Contract(NFTABI, NFTCA);

// League Contract
const LeagueABI = [
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "cancled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "winner",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "ended",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creatorAddress",
        type: "address"
      },
      {
        internalType: "address",
        name: "teamA",
        type: "address"
      },
      {
        internalType: "address",
        name: "teamB",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "A",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "B",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "creator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isOpened",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
const LeagueByte =
  "608060405234801561001057600080fd5b50604051610d37380380610d378339818101604052810190610032919061016c565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060146101000a81548160ff02191690831515021790555050505061020d565b600081519050610166816101f6565b92915050565b600080600060608486031215610185576101846101f1565b5b600061019386828701610157565b93505060206101a486828701610157565b92505060406101b586828701610157565b9150509250925092565b60006101ca826101d1565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b6101ff816101bf565b811461020a57600080fd5b50565b610b1b8061021c6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063692aa97e1161005b578063692aa97e146100da5780639f102ae2146100f8578063b2bdfa7b14610114578063f446c1d0146101325761007d565b806302d05d3f1461008257806332e7c5bf146100a057806344e803b1146100be575b600080fd5b61008a610150565b60405161009791906108f6565b60405180910390f35b6100a8610176565b6040516100b591906108f6565b60405180910390f35b6100d860048036038101906100d391906107a0565b61019c565b005b6100e26103c8565b6040516100ef919061093a565b60405180910390f35b610112600480360381019061010d91906107e0565b6103db565b005b61011c6106d5565b60405161012991906108f6565b60405180910390f35b61013a6106f9565b60405161014791906108f6565b60405180910390f35b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461022a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161022190610955565b60405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161026591906108f6565b60206040518083038186803b15801561027d57600080fd5b505afa158015610291573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102b59190610833565b9050808211156102fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f190610995565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b8152600401610355929190610911565b602060405180830381600087803b15801561036f57600080fd5b505af1158015610383573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a79190610773565b506000600160146101000a81548160ff021916908315150217905550505050565b600160149054906101000a900460ff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461046b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046290610975565b60405180910390fd5b60008373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016104a691906108f6565b60206040518083038186803b1580156104be57600080fd5b505afa1580156104d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f69190610833565b90508082111561053b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053290610995565b60405180910390fd5b60008314156105f9578373ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b81526004016105a1929190610911565b602060405180830381600087803b1580156105bb57600080fd5b505af11580156105cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f39190610773565b506106b4565b60018314156106b3578373ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b815260040161065f929190610911565b602060405180830381600087803b15801561067957600080fd5b505af115801561068d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b19190610773565b505b5b6000600160146101000a81548160ff02191690831515021790555050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008151905061072e81610aa0565b92915050565b60008135905061074381610ab7565b92915050565b60008135905061075881610ace565b92915050565b60008151905061076d81610ace565b92915050565b60006020828403121561078957610788610a20565b5b60006107978482850161071f565b91505092915050565b600080604083850312156107b7576107b6610a20565b5b60006107c585828601610734565b92505060206107d685828601610749565b9150509250929050565b6000806000606084860312156107f9576107f8610a20565b5b600061080786828701610734565b935050602061081886828701610749565b925050604061082986828701610749565b9150509250925092565b60006020828403121561084957610848610a20565b5b60006108578482850161075e565b91505092915050565b610869816109c6565b82525050565b610878816109d8565b82525050565b600061088b600a836109b5565b915061089682610a25565b602082019050919050565b60006108ae600c836109b5565b91506108b982610a4e565b602082019050919050565b60006108d1600e836109b5565b91506108dc82610a77565b602082019050919050565b6108f081610a16565b82525050565b600060208201905061090b6000830184610860565b92915050565b60006040820190506109266000830185610860565b61093360208301846108e7565b9392505050565b600060208201905061094f600083018461086f565b92915050565b6000602082019050818103600083015261096e8161087e565b9050919050565b6000602082019050818103600083015261098e816108a1565b9050919050565b600060208201905081810360008301526109ae816108c4565b9050919050565b600082825260208201905092915050565b60006109d1826109f6565b9050919050565b60008115159050919050565b60006109ef826109c6565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600080fd5b7f4f6e6c79206f6e77657200000000000000000000000000000000000000000000600082015250565b7f4f6e6c792063726561746f720000000000000000000000000000000000000000600082015250565b7f62616c616e6365206973206c6f77000000000000000000000000000000000000600082015250565b610aa9816109d8565b8114610ab457600080fd5b50565b610ac0816109e4565b8114610acb57600080fd5b50565b610ad781610a16565b8114610ae257600080fd5b5056fea2646970667358221220c97fa6c8870c88f263e671521448c1d10e6e31c38a5871b0d8b1e75994713e3664736f6c63430008070033";

const LeagueCA = "";

const LeagueContract = new web3.eth.Contract(LeagueABI, LeagueCA);

// Deploy Clone League Contract
export const deployCloneLeagueContract = async (creator, teamA, teamB) => {
  // 코인베이스 잠금 해제
  const coinBase = web3.eth.getCoinbase();
  web3.eth.personal.unlockAccount(
    coinBase,
    process.env.REACT_APP_COINBASE_PASSWORD,
    300
  );

  // 컨트랙트 클론 후 배포
  const newContract = LeagueContract.clone();
  const newContractCA = newContract
    .deploy({
      data: LeagueByte,
      arguments: [creator, teamA, teamB]
    })
    .send({ from: coinBase })
    .then(res => res.options.address);
  console.timeLog(newContractCA);
  return newContractCA;
};

// 배포된 컨트랙트 주소 반환하기
export const getContractCA = address => {
  const LC = new web3.eth.Contract(LeagueABI, address);
  return LC;
};
export default {};
