<template>
  <div class="pa-4 r-outlined">
    <v-row class="ma-0">
      <div style="flex: 1;">
        <v-row class="ma-0 pt-2 pb-2 align-center">
          <img
            :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${pair.token0.address}/logo.png`"
            height="30px"
            @error="setAltImg"
            style="z-index: 1;"
          />
          <img
            :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${pair.token1.address}/logo.png`"
            style="margin-left: -10px; margin-right: 15px;"
            @error="setAltImg"
            height="30px"
          />

          {{ pair.token0.symbol }}
          -
          {{ pair.token1.symbol }}

          <!--
          <img 
          src="@/assets/img/uniswap-logo.svg" 
          alt="UCR" 
          width="25px">
          -->

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn small icon color="text" class="ml-2" v-on="on">
                <v-icon small>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item :href="`https://uniswap.info/pair/${pair.address}`" target="_blank">
                <v-list-item-title>View on uniswap</v-list-item-title>
              </v-list-item>
              <v-list-item :to="`/pol-dapp/${pair.address}`">
                <v-list-item-title>Lock liquidity</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <template v-if="loading">
          <v-progress-circular :size="25" :width="3" color="text" class="slow-progress-anim mr-2" indeterminate></v-progress-circular>
        </template>
        <template v-else>
          <div outlined :color="trustScoreColor" :class="['d-flex mt-2 align-center']">
            Trust score:
            <div class="font-weight-bold ml-1 mr-1" :style="`color: ${trustScoreColor}`">{{ ethersTrustHuman }}%</div>
            <v-icon v-if="ethersTrust > 0" small :color="trustScoreColor">mdi-star</v-icon>
            <v-icon v-if="ethersTrust > 20" small :color="trustScoreColor">mdi-star</v-icon>
            <v-icon v-if="ethersTrust > 50" small :color="trustScoreColor">mdi-star</v-icon>
          </div>
          <v-row class="ma-0 align-center">
            <div v-if="ethersTrust > 0" class="caption mr-2">
              Proof of liquidity:
              <span :style="`color: ${trustScoreColor}`"> {{ ethersTrustHuman }}% </span>
            </div>
          </v-row>
          <!-- WARNINGS -->
          <div v-if="ethersTrust === 0" class="textMid--text caption">
            This is a risky pair. 100% of the liquidity can be pulled at any moment.
          </div>
        </template>
      </div>
      <div>
        <div class="mx-auto" style="max-width: 80px; max-height: 80px">
          <donut-chart
            v-if="!loading"
            :holdings="0"
            :totalSupply="totalSupply"
            :lockedLiquidity="combinedLockedLiquidity"
            :key="pair.address"
            ref="donutChart"
          >
          </donut-chart>
        </div>
      </div>
    </v-row>

    <liquidity-release-chart v-if="lockedLiquidity > 0" :address="pair.address" :totalSupply="totalSupply"> </liquidity-release-chart>
  </div>
</template>

<script>
import SmartContract from './smart-contract'
import Erc20Contracts from '@/smart-contracts/erc20'
import DonutChart from './donut'
import { ethers } from 'ethers'
import LiquidityReleaseChart from './liquidity-release-chart'
import moment from 'moment'

export default {
  props: {
    pair: null,
    commitToLock: {
      type: String,
      default: '0',
    }, // optional, use this to see the change to your rating as you commit to lock more liquidity
    modifySubtract: {
      type: Boolean,
      default: false,
    }, // optional, use this to see the change to your rating as you commit to lock more liquidity
  },
  components: {
    DonutChart,
    LiquidityReleaseChart,
  },
  data: () => ({
    totalSupply: '1', // keep this at 1 to prevent the chart from animating twice
    holdings: 0,
    lockedLiquidity: 0,
    loading: false,
    chartLoaded: false,
    epochData: [],
  }),
  watch: {
    pair() {
      this.updateCard()
    },
    sEthersWatcher() {
      this.updateCard()
    },
  },
  computed: {
    sEthersWatcher() {
      return this.$store.state.ethers.watcher
    },
    trustScoreColor() {
      return 'text'
      /* if (this.ethersTrust > 50) {
        return '#56BE72'
      } else if (this.ethersTrust > 0) {
        return 'orange'
      }
      return '#E91E63' */
    },
    combinedLockedLiquidity() {
      var lockedLiquidity = ethers.BigNumber.from(this.lockedLiquidity || 0)
      if (this.modifySubtract) {
        return lockedLiquidity.sub(ethers.BigNumber.from(this.commitToLock)).toString()
      }
      return lockedLiquidity.add(ethers.BigNumber.from(this.commitToLock)).toString()
    },
    ethersTrust() {
      var map = this.epochData
      var totalSupply = this.totalSupply

      // continue below || same as server
      var futureUnlocks = map.filter(item => item.epoch > moment().unix())

      var weightedAmount = ethers.BigNumber.from('0')
      var weighted
      for (var unlock of futureUnlocks) {
        console.log(unlock)
        console.log(unlock.epoch)
        var amount = unlock.amount
        console.log(
          moment()
            .add(3, 'weeks')
            .unix(),
        )
        if (
          moment()
            .add(3, 'weeks')
            .unix() > unlock.epoch
        ) {
          weighted = ethers.BigNumber.from(amount)
            .mul('20')
            .div('100')
          weightedAmount = weightedAmount.add(weighted)
          console.log('within 3 weeks')
          console.log('weighted: ' + weighted.toString())
        } else if (
          moment()
            .add(3, 'months')
            .unix() > unlock.epoch
        ) {
          weighted = ethers.BigNumber.from(amount)
            .mul('50')
            .div('100')
          weightedAmount = weightedAmount.add(weighted)
          console.log('within 3 months')
          console.log('weighted: ' + weighted.toString())
        } else if (
          moment()
            .add(6, 'months')
            .unix() > unlock.epoch
        ) {
          weighted = ethers.BigNumber.from(amount)
            .mul('80')
            .div('100')
          weightedAmount = weightedAmount.add(weighted)
          console.log('within 6 months')
          console.log('weighted: ' + weighted.toString())
        } else {
          weightedAmount = weightedAmount.add(ethers.BigNumber.from(amount))
        }
      }
      var trustScore = (Number(weightedAmount.toString()) / Number(totalSupply)) * 100
      return trustScore > 100 ? 100 : trustScore
    },
    ethersTrustHuman() {
      var percent = this.ethersTrust
      return Number(percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    },
  },
  methods: {
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
    async updateCard() {
      // this.loading = true
      // this.chartLoaded = false
      this.fetchTrustScore()
        .then(response => {
          this.lockedLiquidity = response.locked
          this.totalSupply = response.totalSupply
          // this.chartLoaded = true
        })
        .catch(error => {
          console.log(error)
          // this.chartLoaded = false
        })
        .then(() => {
          this.loading = false
        })
      var epochData = await this.fetchChart()
      this.epochData = epochData
    },
    async fetchChart() {
      var len = await SmartContract.getTokenReleaseLength(this.pair.address)
      var arr = []
      for (var i = 0; i < len; i++) {
        var struct = await SmartContract.getTokenReleaseAtIndex(this.pair.address, i)
        arr.push(struct)
      }
      arr = arr.sort((a, b) => a.epoch - b.epoch)
      return arr
    },
    async fetchTrustScore() {
      if (!this.pair.address) {
        console.log('SKIPPING')
        return
      }

      // this is the total amount in the locker
      var locked = await SmartContract.getLockedLiquidity(this.pair.address)

      var token = await Erc20Contracts.getERC20(this.pair.address)
      var totalSupply = token.totalSupply

      return {
        locked: locked,
        totalSupply: totalSupply,
      }
    },
  },
  created() {
    this.updateCard()
  },
}
</script>
