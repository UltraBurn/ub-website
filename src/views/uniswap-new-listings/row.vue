<template>
  <v-card class="pa-2 mt-2">
    <v-row class="ma-0 align-center">
      <div class="mr-4 title">
        {{ item.index }}
      </div>

      <v-progress-circular v-show="loading" indeterminate color=""></v-progress-circular>

      <div v-if="nonWethToken" class="headline">
        {{ nonWethToken.name }}
        ({{ nonWethToken.symbol }})
      </div>

      <v-spacer></v-spacer>
    </v-row>

    <div v-if="hydrated_pair.address">
      <rating-card :pair="hydrated_pair"></rating-card>
    </div>

    <!-- UNDER ROW -->
    <v-row class="ma-0">
      <div class="text-center">
        <div :class="['font-weight-medium', percentColor]">{{ percentHuman }}%</div>
        <div class="caption textMid--text">
          % total supply on uniswap
        </div>
      </div>
    </v-row>

    <template v-if="false">
      <div>
        <v-row class="align-center ma-0 pa-1">
          <div class="mr-4 title">
            {{ item.index }}
          </div>

          <img
            :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${nonWethToken.address}/logo.png`"
            height="60px"
            @error="setAltImg"
            class="mr-4"
            style="z-index: 1;"
          />

          <div class="pink--text headline">
            {{ nonWethToken.symbol }}
            -
            {{ nonWethToken.name }}
          </div>

          <v-tooltip bottom open-delay="200">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon small color="textMid" v-clipboard:copy="item.pair_address">
                <v-icon small>mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <span>Copy to clipboard</span>
          </v-tooltip>

          <v-tooltip bottom open-delay="200">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon small color="textMid" :href="`https://uniswap.info/pair/${item.pair_address}`" target="_blank">
                <v-icon small>mdi-open-in-new</v-icon>
              </v-btn>
            </template>
            <span>View on uniswap</span>
          </v-tooltip>
        </v-row>
        <rating-card :pair="hydrated_pair"></rating-card>

        <div>
          <div class="ml-2 green--text">({{ percent }})</div>

          <div class="caption textMid--text">
            {{ info.reserves }}
          </div>
          <div>
            <div>( {{ nonWethToken.totalSupply }} )</div>
            <div>
              {{ info.reserves._reserve0 }}
            </div>
          </div>
        </div>
      </div>

      <!-- this was the else block -->
      <div>
        <v-row class="ma-0 pa-1 align-center">
          <div class="mr-4 title">
            {{ item.index }}
          </div>

          <img
            :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token0.address}/logo.png`"
            height="30px"
            @error="setAltImg"
            style="z-index: 1;"
          />
          <img
            :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token1.address}/logo.png`"
            style="margin-left: -10px; margin-right: 10px;"
            @error="setAltImg"
            height="30px"
          />

          {{ token0.symbol }} - {{ token1.symbol }}

          <v-row class="ma-0 ml-4 pa-1 align-center">
            <div class="textMid--text caption">
              {{ condensed_address }}
            </div>

            <v-tooltip bottom open-delay="200">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon small color="textMid" v-clipboard:copy="item.pair_address">
                  <v-icon small>mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>Copy to clipboard</span>
            </v-tooltip>

            <v-tooltip bottom open-delay="200">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon small color="textMid" :href="`https://uniswap.info/pair/${item.pair_address}`" target="_blank">
                  <v-icon small>mdi-open-in-new</v-icon>
                </v-btn>
              </template>
              <span>View on uniswap</span>
            </v-tooltip>
          </v-row>
        </v-row>
        <rating-card :pair="hydrated_pair"></rating-card>
      </div>
    </template>
  </v-card>
</template>

<script>
import RatingCard from '@/views/liquidity/components/lock-liquidity/rating-card'
import SmartContract from './smart-contract'

export default {
  props: {
    item: null,
  },
  components: {
    RatingCard,
  },
  data: () => ({
    info: {
      reserves: {
        _reserve0: 0,
      },
    },
    token0: {},
    token1: {},
    hydrated_pair: {
      address: null,
      token0: {},
      token1: {},
    },
    loading: false,
  }),
  computed: {
    percent() {
      var percent = (this.info.reserves._reserve0 / this.token0.totalSupply) * 100
      return percent
    },
    percentHuman() {
      if (isNaN(this.percent)) {
        return 0
      }
      if (this.percent > 0.01) {
        return Number(this.percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
      } else if (this.percent > 0.0001) {
        return Number(this.percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })
      }
      return Number(this.percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 9 })
    },
    percentColor() {
      if (this.percent > 50) {
        return 'green--text'
      } else if (this.percent > 1) {
        return 'orange--text'
      }
      return 'pink--text'
    },
    condensed_address() {
      return this.item.pair_address.slice(0, 6) + '...' + this.item.pair_address.slice(this.item.pair_address.length - 4)
    },
    onePairIsWeth() {
      if (
        this.token0.address === '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' ||
        this.token1.address === '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
      ) {
        return true
      }
      return false
    },
    nonWethToken() {
      if (this.onePairIsWeth) {
        if (this.token0.address === '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2') {
          return this.token1
        }
        return this.token0
      }
      return null
    },
  },
  methods: {
    async getTokens() {
      this.token0 = await SmartContract.getERC20(this.info.token0)
      this.token1 = await SmartContract.getERC20(this.info.token1)
      this.hydrated_pair.address = this.item.pair_address
      this.hydrated_pair.token0 = this.token0
      this.hydrated_pair.token1 = this.token1
    },
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
  },
  created() {
    this.loading = true
    SmartContract.getPairTokens(this.item.pair_address)
      .then(info => {
        this.info = info
        this.getTokens()
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => {
        this.loading = false
      })
  },
}
</script>
