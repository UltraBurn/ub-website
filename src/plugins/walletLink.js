// TypeScript
import WalletLink from 'walletlink'
// import Web3 from 'web3'

const APP_NAME = 'UltraBurn'
const APP_LOGO_URL = 'https://ultraburn.it/img/UCR_logo_256x256.png'
const ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/3cd774e14cf34ff78167908f8377051c'
const CHAIN_ID = 1

// Initialize WalletLink
export const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
})

// Initialize a Web3 Provider object
export const wlprovider = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID)

// Initialize a Web3 object
// export const web3 = new Web3(wlprovider)
