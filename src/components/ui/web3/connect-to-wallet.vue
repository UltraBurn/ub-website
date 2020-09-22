<template>
  <v-dialog v-model="dialog" persistent max-width="450" :fullscreen="$vuetify.breakpoint.mobile">
    <v-card>
      <div>
        <v-row class="pa-4 ma-0 font-weight-medium background align-center">
          Connect to a wallet
          <v-spacer></v-spacer>

          <!--
          <v-btn @click="runFunction" icon color="text">
            <v-icon>mdi-clock</v-icon>
          </v-btn>
          -->

          <v-btn @click="close" icon color="text">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <!-- Main content -->
        <div>
          <div
            v-if="false"
            :class="[
              'pa-4 white--text posrelative',
              { 'red-gradient': sEthers.providerName === 'Metamask' },
              { 'blue-gradient': sEthers.providerName === 'Coinbase' },
            ]"
          >
            <div class="wave2"></div>
            <div class="posrelative">
              <div class="mb-2 d-flex align-center">
                <img v-if="sEthers.providerName === 'Metamask'" src="@/assets/img/metamask.svg" height="30px" class="mr-3" />
                <img v-if="sEthers.providerName === 'Coinbase'" src="@/assets/img/coinbase-wallet.svg" height="30px" class="mr-3" />
                {{ sEthers.providerName }}
                <div class="ml-2 caption d-flex align-center">
                  ({{ sEthers.coinbase_condensed }})
                  <v-tooltip bottom open-delay="50">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        color="white"
                        small
                        v-on="on"
                        class="ml-2"
                        style="cursor: pointer;"
                        v-clipboard:copy="sEthers.coinbase"
                        v-clipboard:success="onCopy"
                      >
                        mdi-content-copy
                      </v-icon>
                    </template>
                    <span>
                      {{ copyToClipboardText }}
                    </span>
                  </v-tooltip>
                </div>

                <v-spacer></v-spacer>
                <v-btn @click="disconnect" small text color="white">
                  <v-icon small class="mr-1">mdi-logout-variant</v-icon>
                  LOG OUT
                </v-btn>
              </div>

              <rank-card :balance="uncBalance"></rank-card>

              <div class="d-flex align-center">
                <div class="d-flex align-center">
                  <img src="@/assets/img/UB_icon_white.jpg" alt="UNC logo" height="30px" class="mr-2" />
                  <div class="d-flex">
                    <div class="">
                      {{ uncBalanceHuman }}
                    </div>
                    <div class="ml-2">
                      UNC
                    </div>
                  </div>
                </div>

                <v-spacer></v-spacer>

                <div class="d-flex align-center justify-end">
                  {{ ethBalanceHuman }}
                  ETH
                  <img src="@/assets/img/eth.png" alt="ETH logo" height="30px" class="ml-2" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="false" class="text-end pa-2">
            <eth-network></eth-network>
          </div>

          <div class="pa-4">
            <div @click="connectToMetamask()" class="c-list r-outlined pa-4 d-flex align-center">
              <img src="@/assets/img/metamask.svg" height="30px" class="mr-3" />
              Metamask
            </div>
            <div @click="connectToWalletLink" class="c-list r-outlined pa-4 mt-2 d-flex align-center">
              <img src="@/assets/img/coinbase-wallet.svg" height="30px" class="mr-3" />
              Coinbase Wallet
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import EthNetwork from '@/components/ui/dropdowns/eth-network'
import { ethers } from 'ethers'
import Erc20Contracts from '@/smart-contracts/erc20'
// import SmartContract from '@/views/liquidity/components/lock-liquidity/smart-contract'
import RankCard from './rank-card'
import ConnectWeb3js from './connect-web3'
//https://getwaves.io/

export default {
  components: {
    EthNetwork,
    RankCard,
  },
  data: () => ({
    dialog: false,
    uncBalance: '0',
    ethBalance: '0',
    copyToClipboardText: 'Copy to clipboard',
  }),
  computed: {
    sEthers() {
      return this.$store.state.ethers
    },
    sEthersWatcher() {
      return this.sEthers.watcher
    },
    uncBalanceHuman() {
      var nocomma = ethers.utils.formatUnits(this.uncBalance, 18)
      // return ethers.utils.commify(nocomma)
      return Number(nocomma).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
    ethBalanceHuman() {
      var nocomma = ethers.utils.formatUnits(this.ethBalance, 18)
      return Number(nocomma).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
  },
  watch: {
    sEthersWatcher() {
      this.getUncBalance()
      this.getEthBalance()
    },
  },
  methods: {
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    onCopy() {
      this.copyToClipboardText = 'Copied'
      setTimeout(() => {
        this.copyToClipboardText = 'Copy to clipboard'
      }, 1200)
    },
    async getEthBalance() {
      var balance = await this.sEthers.provider.getBalance(this.sEthers.coinbase)
      this.ethBalance = balance.toString()
    },
    getUncBalance() {
      Erc20Contracts.getUNCBalance(this.sEthers.coinbase)
        .then(balance => {
          this.uncBalance = balance
        })
        .catch(error => {
          console.log(error)
          this.uncBalance = '0'
        })
    },
    /*
    removeMetamaskListeners () {
      window.ethereum.removeAllListeners('accountsChanged')
      window.ethereum.removeAllListeners('chainChanged')
    },
    addMetamaskListeners () {
      window.ethereum.on('accountsChanged', accounts => {
        this.$store.commit('updateEthers', {
          coinbase: accounts[0]
        })
      })
      window.ethereum.on('chainChanged', () => {
        this.connectToMetamask()
      })
    },
    */
    /*
    async getCoinbase (provider) {
      var accounts = await provider.send('eth_requestAccounts')
      return accounts[0]
    },
    /*
    async connectToWalletLink () {
      await wlprovider.enable()
      const provider = new ethers.providers.Web3Provider(wlprovider)
      const signer = provider.getSigner()
      var coinbase = await this.getCoinbase(provider)
      var homesteadProvider = ethers.getDefaultProvider('homestead')
      this.$store.commit('updateEthers', {
        coinbase: coinbase,
        providerName: 'Coinbase',
        provider: homesteadProvider,
        signer: signer,
        network: 1
      })
      this.removeMetamaskListeners()
      // this.close()
    },
    /*
    async connectToMetamask () {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      var coinbase = await this.getCoinbase(provider)
      this.$store.commit('updateEthers', {
        coinbase: coinbase,
        providerName: 'Metamask',
        provider: provider,
        signer: signer,
        network: StaticMap.networkHexToInt[window.ethereum.chainId]
      })
      this.removeMetamaskListeners()
      this.addMetamaskListeners()
    },
    */
    async connectToWalletLink() {
      await ConnectWeb3js.connectToWalletLink()
      this.close()
    },
    async connectToMetamask() {
      await ConnectWeb3js.connectToMetamask()
      this.close()
    },
    async runFunction() {
      var data = {
        query: `{
          pair(id: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11") {
            id
            token0Price
          }
        }`,
      }
      this.$axios
        .post(`https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`, data)
        .then(response => {
          var price = response.data.data.pair.token0Price
          console.log(price)
        })
        .catch(error => {
          console.log(error)
        })
    },
    disconnect() {
      ConnectWeb3js.disconnect()
    },
  },
}
</script>

<style lang="scss" scoped>
.c-list {
  cursor: pointer;
  &:hover {
    /* background: var(--v-background-base); */
    border-color: var(--v-primary-base);
  }
}
/* .orange-gradient:before {
  content: ""; 
  position: absolute; 
  bottom: 0; 
  left: 0; 
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/img/waves/wave1.svg);
  background-size: cover; 
  background-repeat: no-repeat; 
} */
</style>
