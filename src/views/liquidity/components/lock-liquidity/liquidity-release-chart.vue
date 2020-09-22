<template>
  <div>
    <div class="pt-2 pb-4">
      <div class="font-weight-bold">
        POL (proof of liquidity) stats
      </div>

      <liquidity-chart v-if="false" :yData="chartData"></liquidity-chart>

      <v-row class="ma-0" dense>
        <v-col cols="12" md="4">
          <div class="text-center mt-3 r-outlined">
            <div class="title">{{ unlockedBalancePercentOfTotal }}%</div>
            <!--
            <div class="caption">
              {{ unlockedBalanceHuman }}
            </div>
            -->
            <div class="caption font-italic textMid--text">
              Unlocked / Withdrawable
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-center mt-3 r-outlined">
            <div class="title">{{ lockedBalancePercentOfTotal }}%</div>
            <!--
            <div class="caption">
              {{ lockedBalanceHuman }}
            </div>
            -->
            <div class="caption textMid--text font-italic">
              Locked
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-center mt-3 r-outlined">
            <div class="title">
              {{ totalSupplyHuman }}
            </div>
            <div class="caption textMid--text">
              Liquidity tokens
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="mt-6 font-weight-bold">
        Upcoming unlocks
      </div>

      <template>
        <v-row dense class="ma-0 pa-0 textMid--text caption">
          <v-col cols="6">
            Amount
          </v-col>
          <v-col cols="6">
            Unlock date
          </v-col>
        </v-row>
        <deposit-row v-for="(deposit, i) of upcomingUnlocks" :key="i" :item="deposit" :totalSupply="totalSupply"></deposit-row>
      </template>
    </div>
  </div>
</template>

<script>
import SmartContract from './smart-contract'
import { ethers } from 'ethers'
import DepositRow from './withdraw-liquidity-deposit-row'
import LiquidityChart from './line-chart'
import moment from 'moment'

export default {
  props: {
    address: null,
    totalSupply: null,
  },
  components: {
    DepositRow,
    LiquidityChart,
  },
  data: () => ({
    items: [],
    totalInLocker: 0,
  }),
  watch: {
    address() {
      this.reload()
    },
  },
  computed: {
    upcomingUnlocks() {
      return this.items.filter(item => item.epoch > moment().unix())
    },
    // for more than right now
    totalLocked() {
      var totalLocked = this.upcomingUnlocks.reduce((a, i) => {
        return a.add(ethers.BigNumber.from(i.amount))
      }, ethers.BigNumber.from(0))
      return totalLocked.toString()
    },
    currentlyInLockerButWithdrawable() {
      var unlockedBalance = this.unlockedBalance / Math.pow(10, 18)
      var firstItem = { x: moment(), y: unlockedBalance }
      return firstItem
    },
    unlockedBalance() {
      // var totalBalance = this.totalBalance / Math.pow(10, 18)
      var bn = ethers.BigNumber.from(this.totalInLocker).sub(ethers.BigNumber.from(this.totalLocked))
      return bn.toString()
      // return 0
    },
    lockedBalanceHuman() {
      var amount = ethers.utils.formatUnits(this.totalLocked, 18)
      return Number(amount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })
    },
    unlockedBalanceHuman() {
      var amount = ethers.utils.formatUnits(this.unlockedBalance, 18)
      return Number(amount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })
    },
    unlockedBalancePercentOfTotal() {
      var unlocked = Number(this.unlockedBalance) / Math.pow(10, 18)
      var total = Number(this.totalSupply) / Math.pow(10, 18)
      var division = (unlocked / total) * 100
      var maxDecimals = division > 1 ? 1 : 2
      return Number(division).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: maxDecimals })
    },
    lockedBalancePercentOfTotal() {
      var locked = Number(this.totalLocked) / Math.pow(10, 18)
      var total = Number(this.totalSupply) / Math.pow(10, 18)
      var division = (locked / total) * 100
      var maxDecimals = division > 1 ? 1 : 2
      return Number(division).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: maxDecimals })
    },
    totalSupplyHuman() {
      var total = Number(this.totalSupply) / Math.pow(10, 18)
      return Number(total).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })
    },
    chartData() {
      // var before = 0
      var data = this.upcomingUnlocks.map(item => {
        // var amount = Number(item.amount) / Math.pow(10, 18)
        // amount += before
        // before = amount
        return {
          x: moment.unix(item.epoch),
          y: Number(item.amount) / Math.pow(10, 18),
        }
      })

      // insert withdrawable balance at start
      var firstItem = Object.assign({}, this.currentlyInLockerButWithdrawable)
      data.unshift(firstItem)

      var lastItem = data[data.length - 1]
      if (lastItem) {
        lastItem = JSON.parse(JSON.stringify(lastItem))
        var timediff = moment(lastItem.x).unix() - moment().unix()
        timediff /= 10
        lastItem.x = moment(lastItem.x).add(timediff, 'seconds')
        lastItem.y = 0
        data.push(lastItem)
      }

      return data
    },
  },
  methods: {
    async fetchChart() {
      var totalInLocker = await SmartContract.getLockedLiquidity(this.address)

      var len = await SmartContract.getTokenReleaseLength(this.address)
      var arr = []
      for (var i = 0; i < len; i++) {
        var struct = await SmartContract.getTokenReleaseAtIndex(this.address, i)
        arr.push(struct)
      }
      arr = arr.sort((a, b) => a.epoch - b.epoch)
      this.items = arr
      this.totalInLocker = totalInLocker
    },
    async reload() {
      await this.fetchChart()
    },
  },
  created() {
    this.reload()
  },
}
</script>
