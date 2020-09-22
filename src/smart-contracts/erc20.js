import { store } from '@/store/index'
import { ethers } from 'ethers'

const erc20_abi = [
  { constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' },
  {
    constant: false,
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'receivers', type: 'address[]' },
      { name: 'amounts', type: 'uint256[]' },
    ],
    name: 'multiTransfer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], payable: false, stateMutability: 'view', type: 'function' },
  {
    constant: false,
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'player', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  { constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' },
  {
    constant: false,
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'tokens', type: 'uint256' },
      { name: 'data', type: 'bytes' },
    ],
    name: 'approveAndCall',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: 'player', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'owner', type: 'address' },
      { indexed: true, name: 'spender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
]

const Self = {
  getERC20: async address => {
    var sEthers = store.state.ethers

    if (!ethers.utils.isAddress(address)) {
      throw new Error('Not a valid Ethereum address')
    }

    // try get name
    var name, nameABI, nameContract
    try {
      nameABI = [
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [{ name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ]
      nameContract = new ethers.Contract(address, nameABI, sEthers.provider)
      name = await nameContract.name()
    } catch (e) {
      nameABI = [
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [{ name: '', type: 'bytes32' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ]
      nameContract = new ethers.Contract(address, nameABI, sEthers.provider)
      name = await nameContract.name()
      name = ethers.utils.parseBytes32String(name)
    }

    // try get symbol
    var symbol, symbolABI, symbolContract
    try {
      symbolABI = [
        {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [{ name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ]
      symbolContract = new ethers.Contract(address, symbolABI, sEthers.provider)
      symbol = await symbolContract.symbol()
    } catch (e) {
      symbolABI = [
        {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [{ name: '', type: 'bytes32' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ]
      symbolContract = new ethers.Contract(address, symbolABI, sEthers.provider)
      symbol = await symbolContract.symbol()
      symbol = ethers.utils.parseBytes32String(symbol)
    }

    var erc20 = {}
    var tokenContract = new ethers.Contract(address, erc20_abi, sEthers.provider)
    // var name = await tokenContract.name()
    // var symbol = await tokenContract.symbol()
    var decimals = await tokenContract.decimals()
    var totalSupply = await tokenContract.totalSupply()
    var checksum_address = ethers.utils.getAddress(address)
    erc20 = {
      name: name,
      symbol: symbol,
      decimals: decimals,
      totalSupply: totalSupply.toString(),
      address: checksum_address,
    }
    return erc20
  },
  getUNCBalance: async coinbase => {
    var sEthers = store.state.ethers

    if (!ethers.utils.isAddress(coinbase)) {
      throw new Error('Not a valid Ethereum address')
    }

    var tokenAddress = '0xf29e46887FFAE92f1ff87DfE39713875Da541373' //UNC
    var contractABI = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'receivers', type: 'address[]' },
          { name: 'amounts', type: 'uint256[]' },
        ],
        name: 'multiTransfer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'spender', type: 'address' },
          { name: 'addedValue', type: 'uint256' },
        ],
        name: 'increaseAllowance',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'amount', type: 'uint256' }],
        name: 'burn',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'player', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'spender', type: 'address' },
          { name: 'subtractedValue', type: 'uint256' },
        ],
        name: 'decreaseAllowance',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'spender', type: 'address' },
          { name: 'tokens', type: 'uint256' },
          { name: 'data', type: 'bytes' },
        ],
        name: 'approveAndCall',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { name: 'player', type: 'address' },
          { name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'from', type: 'address' },
          { indexed: true, name: 'to', type: 'address' },
          { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'owner', type: 'address' },
          { indexed: true, name: 'spender', type: 'address' },
          { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
      },
    ]

    var tokenContract = new ethers.Contract(tokenAddress, contractABI, sEthers.provider)

    var balance = await tokenContract.balanceOf(coinbase)
    return balance.toString()
  },
  getBalance: async (user, token) => {
    if (!ethers.utils.isAddress(user)) {
      throw new Error('Not a valid user address')
    }

    if (!ethers.utils.isAddress(token)) {
      throw new Error('Not a valid token address')
    }
    var sEthers = store.state.ethers

    var tokenContract = new ethers.Contract(token, erc20_abi, sEthers.provider)

    var balance = await tokenContract.balanceOf(user)
    return balance.toString()
  },
}

export default Self
