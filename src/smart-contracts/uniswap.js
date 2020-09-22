import { store } from '@/store/index'
import { ethers } from 'ethers'
import Erc20Contracts from '@/smart-contracts/erc20'

// const locker_address = '0x03a37ef0C08f015107aB1105Cb42DD1060DaDa3E'

const Self = {
  getUniswapFactory: () => {
    var sEthers = store.state.ethers
    var contract_abi = [
      {
        inputs: [{ internalType: 'address', name: '_feeToSetter', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'token0', type: 'address' },
          { indexed: true, internalType: 'address', name: 'token1', type: 'address' },
          { indexed: false, internalType: 'address', name: 'pair', type: 'address' },
          { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
        ],
        name: 'PairCreated',
        type: 'event',
      },
      {
        constant: true,
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'allPairs',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'allPairsLength',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'tokenA', type: 'address' },
          { internalType: 'address', name: 'tokenB', type: 'address' },
        ],
        name: 'createPair',
        outputs: [{ internalType: 'address', name: 'pair', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'feeTo',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'feeToSetter',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'address', name: '', type: 'address' },
        ],
        name: 'getPair',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ internalType: 'address', name: '_feeTo', type: 'address' }],
        name: 'setFeeTo',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ internalType: 'address', name: '_feeToSetter', type: 'address' }],
        name: 'setFeeToSetter',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ]
    var IUniswapV2Factory = new ethers.Contract('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', contract_abi, sEthers.provider)
    return IUniswapV2Factory
  },
  getUniswapV2Pair: pair_address => {
    var sEthers = store.state.ethers
    var contract_abi = [
      { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
          { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256' },
          { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' },
          { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        ],
        name: 'Burn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256' },
          { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' },
        ],
        name: 'Mint',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'amount0In', type: 'uint256' },
          { indexed: false, internalType: 'uint256', name: 'amount1In', type: 'uint256' },
          { indexed: false, internalType: 'uint256', name: 'amount0Out', type: 'uint256' },
          { indexed: false, internalType: 'uint256', name: 'amount1Out', type: 'uint256' },
          { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        ],
        name: 'Swap',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: 'uint112', name: 'reserve0', type: 'uint112' },
          { indexed: false, internalType: 'uint112', name: 'reserve1', type: 'uint112' },
        ],
        name: 'Sync',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'from', type: 'address' },
          { indexed: true, internalType: 'address', name: 'to', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        constant: true,
        inputs: [],
        name: 'DOMAIN_SEPARATOR',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'MINIMUM_LIQUIDITY',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'PERMIT_TYPEHASH',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'address', name: '', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
        name: 'burn',
        outputs: [
          { internalType: 'uint256', name: 'amount0', type: 'uint256' },
          { internalType: 'uint256', name: 'amount1', type: 'uint256' },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'factory',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getReserves',
        outputs: [
          { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
          { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
          { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_token0', type: 'address' },
          { internalType: 'address', name: '_token1', type: 'address' },
        ],
        name: 'initialize',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'kLast',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
        name: 'mint',
        outputs: [{ internalType: 'uint256', name: 'liquidity', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'nonces',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' },
        ],
        name: 'permit',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'price0CumulativeLast',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'price1CumulativeLast',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
        name: 'skim',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'uint256', name: 'amount0Out', type: 'uint256' },
          { internalType: 'uint256', name: 'amount1Out', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        name: 'swap',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      { constant: false, inputs: [], name: 'sync', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' },
      {
        constant: true,
        inputs: [],
        name: 'token0',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'token1',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ]
    var UniswapV2Pair = new ethers.Contract(pair_address, contract_abi, sEthers.provider)
    return UniswapV2Pair
  },
  getCumulativePrice: async pair_address => {
    var UniswapV2Pair = Self.getUniswapV2Pair(pair_address)
    var price0CumulativeLast = await UniswapV2Pair.price0CumulativeLast()
    var price1CumulativeLast = await UniswapV2Pair.price1CumulativeLast()
    return {
      price0: price0CumulativeLast.toString(),
      price1: price1CumulativeLast.toString(),
    }
  },
  getPairsLength: async () => {
    var IUniswapV2Factory = Self.getUniswapFactory()
    var allPairsLength = await IUniswapV2Factory.allPairsLength()
    return allPairsLength
  },
  getLastNListings: async (page, n) => {
    var IUniswapV2Factory = Self.getUniswapFactory()
    var allPairsLength = await Self.getPairsLength()

    var response = []
    var offset = page * n
    var topPage = allPairsLength - 1 - offset
    for (var i = topPage; i > topPage - n; i--) {
      var pair_address = await IUniswapV2Factory.allPairs(i)
      response.push({
        index: i,
        pair_address: pair_address,
      })
    }
    return response
  },
  getPairTokens: async pair_address => {
    var UniswapV2Pair = Self.getUniswapV2Pair(pair_address)
    var reserves = await UniswapV2Pair.getReserves()
    var total_supply = await UniswapV2Pair.totalSupply()
    var token0 = await UniswapV2Pair.token0()
    var token1 = await UniswapV2Pair.token1()
    var name = await UniswapV2Pair.name()
    var symbol = await UniswapV2Pair.symbol()
    return {
      name: name,
      symbol: symbol,
      token0: token0,
      token1: token1,
      total_supply: total_supply.toString(),
      reserves: [reserves[0].toString(), reserves[1].toString()],
    }
  },
  getHydratedUniswapV2Pair: async pair_address => {
    var uniswapV2Pair = await Self.getPairTokens(pair_address)
    var token0 = await Erc20Contracts.getERC20(uniswapV2Pair.token0)
    var token1 = await Erc20Contracts.getERC20(uniswapV2Pair.token1)
    return {
      address: pair_address,
      token0: token0,
      token1: token1,
    }
  },
}

export default Self
