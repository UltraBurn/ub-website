const Self = {
  networkHexToInt: {
    '0x1': 1,
    '0x3': 3,
    '0x4': 4,
    '0x5': 5,
    '0x2a': 42,
  },
  networks: {
    '1': 'Mainnet',
    '3': 'Ropsten Testnet',
    '4': 'Rinkeby Testnet',
    '5': 'Goerli Testnet',
    '42': 'Koven Testnet',
  },
  etherscan: {
    '1': 'https://etherscan.io/',
    '3': 'https://ropsten.etherscan.io/',
  },
}

module.exports = Self
