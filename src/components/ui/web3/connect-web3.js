import { store } from '@/store/index'
import { ethers } from 'ethers'
import StaticMap from '@/static/maps'
import { wlprovider } from '@/plugins/walletLink'
import ERC20Contracts from '@/smart-contracts/erc20'

const Self = {
  async getCoinbase(provider) {
    // var accounts = await provider.send('eth_requestAccounts')
    var accounts = await provider.send('eth_accounts')
    return accounts[0]
  },
  async getUNCbalance(coinbase) {
    try {
      var tokenAddress = '0xf29e46887FFAE92f1ff87DfE39713875Da541373' //UNC

      var balance = '0'
      if (coinbase) {
        balance = await ERC20Contracts.getBalance(coinbase, tokenAddress)
      }
      return balance
    } catch (e) {
      return '0'
    }
  },
  async connectToMobileWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    var coinbase = await this.getCoinbase(provider)
    var unc_balance = await this.getUNCbalance(coinbase)
    var homesteadProvider = ethers.getDefaultProvider('homestead')

    var providerName = ''
    if (window.ethereum.isMetaMask) {
      providerName = 'Metamask'
    } else if (window.ethereum.isToshi || window.ethereum.isCoinbaseWallet) {
      providerName = 'Coinbase'
    }
    store.commit('updateEthers', {
      coinbase: coinbase,
      providerName: providerName,
      provider: homesteadProvider,
      signer: signer,
      network: 1,
      unc_balance: unc_balance,
    })
    // this.close()
  },
  async connectToWalletLink() {
    await wlprovider.enable()
    const provider = new ethers.providers.Web3Provider(wlprovider)
    const signer = provider.getSigner()
    var coinbase = await this.getCoinbase(provider)
    if (!coinbase) {
      throw new Error('Cant connect')
    }
    var unc_balance = await this.getUNCbalance(coinbase)
    var homesteadProvider = ethers.getDefaultProvider('homestead')
    store.commit('updateEthers', {
      coinbase: coinbase,
      providerName: 'Coinbase',
      provider: homesteadProvider,
      signer: signer,
      network: 1,
      unc_balance: unc_balance,
    })
    this.removeMetamaskListeners()
    // this.close()
  },
  async connectToMetamask() {
    window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    var coinbase = await this.getCoinbase(provider)
    var unc_balance = await this.getUNCbalance(coinbase)
    store.commit('updateEthers', {
      coinbase: coinbase,
      providerName: 'Metamask',
      provider: provider,
      signer: signer,
      network: StaticMap.networkHexToInt[window.ethereum.chainId],
      unc_balance: unc_balance,
    })
    this.removeMetamaskListeners()
    this.addMetamaskListeners()
  },
  removeMetamaskListeners() {
    window.ethereum.removeAllListeners('accountsChanged')
    window.ethereum.removeAllListeners('chainChanged')
  },
  async accountsChanged(accounts) {
    var coinbase = accounts[0]
    var unc_balance = await this.getUNCbalance(coinbase)
    store.commit('updateEthers', {
      coinbase: coinbase,
      unc_balance: unc_balance,
    })
  },
  addMetamaskListeners() {
    window.ethereum.on('accountsChanged', accounts => {
      this.accountsChanged(accounts)
    })
    window.ethereum.on('chainChanged', () => {
      this.connectToMetamask()
    })
  },
  disconnect() {
    store.commit('updateEthers', {
      coinbase: null,
      providerName: null,
      provider: null,
      signer: null,
      unc_balance: '0',
    })
    // this.close()
  },
}

export default Self
