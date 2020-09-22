<template>
  <div class="pl-0 pr-0 pt-2 pb-2 r-border-b">
    <v-row class="ma-0 align-center">
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token0.address}/logo.png`"
        height="20px"
        width="20px"
        @error="setAltImg"
        style="z-index: 1;"
      />
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token1.address}/logo.png`"
        style="margin-left: -10px; margin-right: 15px;"
        @error="setAltImg"
        height="20px"
        width="20px"
      />

      <div class="caption">
        <span class="blue--text caption">{{ univ2_balance_human }} UNIV2</span>
        <div>
          {{ item.token0.symbol }}
          <span class="textMid--text">
            /
          </span>
          {{ item.token1.symbol }}
        </div>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <div>{{ approx_unc_balance_human }} UNC</div>
        <img
          :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${unc_address}/logo.png`"
          height="30px"
          width="30px"
          @error="setAltImg"
          class="ml-2"
        />
      </div>
    </v-row>
  </div>
</template>

<script>
import { ethers } from 'ethers'

export default {
  props: {
    item: {
      token0: {},
      token1: {},
    },
    user_address: {
      type: String,
      default: '',
    },
  },
  components: {},
  data: () => ({
    unc_address: '0xf29e46887FFAE92f1ff87DfE39713875Da541373',
  }),

  computed: {
    univ2_balance_human() {
      var nocomma = ethers.utils.formatUnits(this.item.univ2_balance, 18)
      return Number(nocomma).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
    approx_unc_balance_human() {
      var nocomma = ethers.utils.formatUnits(this.item.approx_unc, 18)
      return Number(nocomma).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      // return this.item.approx_unc
    },
  },
  watch: {},
  methods: {
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
  },
  created() {},
}
</script>
