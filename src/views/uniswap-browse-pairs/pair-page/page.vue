<template>
  <v-container class="pa-6">
    <div class="mb-4">
      <v-btn @click="returnToBrowser" text color="textMid" class="pa-0">
        <v-icon>mdi-chevron-left</v-icon>
        back
      </v-btn>
    </div>

    <div v-if="pair.address === '0x855A505c2AeBdb2B1C0FC85fB10ED3Bd0357dB08'" class="pa-3 mb-4 r-outlined pink--text">
      This is a test token used by token developers to test our POL dapp. Please do not invest in this token.
    </div>

    <v-row class="ma-0 align-center">
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${pair.token0.address}/logo.png`"
        height="40px"
        width="40px"
        @error="setAltImg"
        style="z-index: 1;"
      />
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${pair.token1.address}/logo.png`"
        style="margin-left: -10px; margin-right: 15px;"
        @error="setAltImg"
        height="40px"
        width="40px"
      />

      <div>
        <div>
          {{ pair.token0.symbol }}
          /
          {{ pair.token1.symbol }}
        </div>
        <div class="caption textMid--text">
          {{ pair.token0.name }}
          /
          {{ pair.token1.name }}
        </div>
        <div class="textMid--text font-italic caption">#{{ pair.uniswap_index }}</div>
      </div>
    </v-row>

    <v-row>
      <v-col cols="12" lg="5">
        <div class="pa-4 mt-6 text-center">
          <v-progress-circular :rotate="-90" :size="200" :width="8" :value="pair.trust_score" :color="trustScoreColor">
            <div class="text-center">
              <div class="textMid--text caption">
                POL score
              </div>
              <div class="font-weight-bold display-1 text--text">
                {{ trustHuman }}
              </div>
            </div>
          </v-progress-circular>

          <template v-if="pair.trust_score > 0">
            <div class="caption mt-6 textMid--text font-italic">
              This tokens developer has locked some of their liquidity.<br />This means they cannot remove it from uniswap, creating a safe trading
              pool and resulting in a favourable trust score.
            </div>
          </template>
        </div>
      </v-col>

      <v-col cols="12" lg="7">
        <div :class="['mt-6', { 'text-center': $vuetify.breakpoint.mobile }]">
          <v-btn small outlined class="mr-2" color="textMid" target="_blank" :href="`https://uniswap.info/pair/${pair.address}`">
            <v-icon small class="mr-1">mdi-open-in-new</v-icon>
            uniswap
          </v-btn>
          <v-btn
            v-if="!ignoreAddress.includes(pair.token0.address)"
            small
            outlined
            class="mr-2"
            color="textMid"
            target="_blank"
            :href="`https://twitter.com/search?q=%24${pair.token0.symbol}`"
          >
            <v-icon small class="mr-1">mdi-twitter</v-icon>
            {{ pair.token0.symbol }}
          </v-btn>
          <v-btn
            v-if="!ignoreAddress.includes(pair.token1.address)"
            small
            outlined
            class="mr-2"
            color="textMid"
            target="_blank"
            :href="`https://twitter.com/search?q=%24${pair.token1.symbol}`"
          >
            <v-icon small class="mr-1">mdi-twitter</v-icon>
            {{ pair.token1.symbol }}
          </v-btn>
          <v-btn small outlined color="textMid" :to="`/pol-dapp/${pair.address}`">
            Lock / Withdraw
          </v-btn>
        </div>

        <template v-if="pair.trust_score > 0">
          <liquidity-release-chart class="mt-4" :address="pair.address" :totalSupply="String(pair.total_supply)"> </liquidity-release-chart>
        </template>
        <template v-else>
          <div class="caption textMid--text mt-6">
            Are you this tokens developer? Boost your trust score and get instant and lasting exposure to the uniswap community through a favourable
            rating on our browser by locking your liquidity. Prove to investors you are here for the long-term.
          </div>
        </template>
      </v-col>
    </v-row>

    <!--
    <v-row class="ma-0 align-center">
      <img 
      :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${pair.token0.address}/logo.png`" 
      height="30px"
      @error="setAltImg"
      style="z-index: 1;">
      <img 
      :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${pair.token1.address}/logo.png`" 
      style="margin-left: -10px; margin-right: 15px;"
      @error="setAltImg"
      height="30px">

      {{ pair.token0.symbol }}
      -
      {{ pair.token1.symbol }}
    </v-row>
    -->
  </v-container>
</template>

<script>
import _ from 'lodash'
import LiquidityReleaseChart from '@/views/liquidity/components/lock-liquidity/liquidity-release-chart'

export default {
  props: {
    pair_address: null,
  },
  components: {
    LiquidityReleaseChart,
  },
  data: () => ({
    pair: {
      token0: {},
      token1: {},
    },
    ignoreAddress: [
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    ],
  }),
  computed: {
    mainToken() {
      return this.pair.reserve0 > this.pair.reserve1 ? this.pair.token0 : this.pair.token1
    },
    trustHuman() {
      var percent = this.pair.trust_score
      if (isNaN(percent)) {
        return 0
      }
      return Number(percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })
    },
    trustScoreColor() {
      if (this.pair.trust_score > 50) {
        return '#56BE72'
      } else if (this.pair.trust_score > 0) {
        return 'orange'
      }
      // return 'var(--v-textMid-base)'
      return null
    },
  },
  methods: {
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
    returnToBrowser() {
      this.$router.back()
    },
    loadAPI: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          this.$axios
            .get(`/uniswap/pair/${this.pair_address}?network=${this.$store.state.ethers.network}`)
            .then(response => {
              this.pair = response.data
            })
            .then(() => resolve())
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      },
      150,
      { leading: true },
    ),
  },
  created() {
    this.loadAPI()
  },
}
</script>
