<template>
  <v-card class="pa-3 r-border-23 d-flex align-center mb-2">
    <img :src="imageSrc" height="40px" width="40px" @error="setAltImg" />

    <div class="ml-3">
      <div>
        {{ token.name }}
      </div>
      <div class="caption textMid--text">
        {{ token.symbol }}
      </div>
    </div>

    <v-spacer></v-spacer>

    <div>
      {{ balanceHuman }}
    </div>
  </v-card>
</template>

<script>
import ERC20Contracts from '@/smart-contracts/erc20'
import { ethers } from 'ethers'

export default {
  props: {
    address: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    balance: '0',
    token: {},
  }),
  computed: {
    imageSrc() {
      if (this.address === 'ethereum') {
        return require(`@/assets/img/eth.png`)
      }
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${this.address}/logo.png`
    },
    sEthers() {
      return this.$store.state.ethers
    },
    balanceHuman() {
      var nocomma = ethers.utils.formatUnits(this.balance, this.token.decimals)
      // return ethers.utils.commify(nocomma)
      return Number(nocomma).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })
    },
  },
  methods: {
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
    async getBalance() {
      if (this.address === 'ethereum') {
        var balance = await this.sEthers.provider.getBalance(this.sEthers.coinbase)
        this.balance = balance.toString()
      } else {
        this.balance = await ERC20Contracts.getBalance(this.$store.state.ethers.coinbase, this.address)
      }
    },
    async getToken() {
      if (this.address === 'ethereum') {
        this.token = {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
        }
      } else {
        this.token = await ERC20Contracts.getERC20(this.address)
      }
    },
  },
  created() {
    this.getToken()
    this.getBalance()
  },
}
</script>
