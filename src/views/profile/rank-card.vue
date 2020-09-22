<template>
  <div class="pa-2">
    <!--
    <v-btn @click="rank++">
      u
    </v-btn>
    <v-btn @click="rank--">
      d
    </v-btn>
    -->
    <div style="postion: relative;">
      <!--
      <div v-if="!nextRank" class="font-italic caption">
        maximum rank achieved
      </div>
      -->
      <v-row class="ma-0 align-center" dense>
        <v-col cols="4">
          <img :src="ranks[rank].src" alt="UCR" width="100%" style="max-height: 100px;" class="" />
        </v-col>
        <v-col cols="8" class="pl-4">
          <div class="caption">Rank: {{ rank + 1 }}</div>

          <div class="font-weight-medium mb-2">
            {{ ranks[rank].name }}
          </div>

          <div class="title font-weight-bold">
            {{ uncBalanceHuman }}
          </div>

          <v-progress-linear rounded color="white" class="mb-1" height="8" :value="nextRankPercent || 0" striped></v-progress-linear>
          <div v-if="nextRank" class="caption">Next rank: {{ formattedNextRankBalance }} UNC</div>
          <div v-else class="caption">
            Your at maximum rank!
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { ethers } from 'ethers'

export default {
  props: {
    balance: {
      type: String,
      default: '0',
    },
  },
  data: () => ({
    // rank: 0,
    ranks: [
      {
        name: 'Sea Cucumber',
        src: require('@/assets/img/rank-icons/cucumber.svg'),
        balance: 0,
      },
      {
        name: 'Frog',
        src: require('@/assets/img/rank-icons/frog.svg'),
        balance: 10000,
      },
      {
        name: 'Crab',
        src: require('@/assets/img/rank-icons/crab.svg'),
        balance: 30000,
      },
      {
        name: 'Yellow Fish',
        src: require('@/assets/img/rank-icons/yellow_fish.svg'),
        balance: 80000,
      },
      {
        name: 'Gold Fish',
        src: require('@/assets/img/rank-icons/fish.svg'),
        balance: 150000,
      },
      {
        name: 'Dolphin',
        src: require('@/assets/img/rank-icons/dolphin.svg'),
        balance: 250000,
      },
      {
        name: 'HammerHead',
        src: require('@/assets/img/rank-icons/hammerhead.png'),
        balance: 500000,
      },
      {
        name: 'Legend',
        src: require('@/assets/img/rank-icons/legend.jpg'),
        balance: 1000000,
      },
    ],
  }),
  computed: {
    formattedNextRankBalance() {
      if (this.nextRank) {
        return Number(this.nextRank.balance).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      }
      return null
    },
    rank() {
      var balance = Number(this.balance) / Math.pow(10, 18)
      for (var i = 0; i < this.ranks.length - 1; i++) {
        if (i + 1 < this.ranks.length) {
          // next level
          if (balance >= this.ranks[i].balance && balance < this.ranks[i + 1].balance) {
            return i
          }
        }
      }
      return this.ranks.length - 1
    },
    nextRank() {
      if (this.ranks.length - 1 > this.rank) {
        return this.ranks[this.rank + 1]
      }
      return null
    },
    nextRankPercent() {
      var balance = Number(this.balance) / Math.pow(10, 18)
      if (balance === 0) {
        return 0
      }
      if (this.nextRank) {
        return (balance / this.nextRank.balance) * 100
      }
      return 100
    },
    uncBalanceHuman() {
      var nocomma = ethers.utils.formatUnits(this.balance, 18)
      return Number(nocomma).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    },
  },
  methods: {},
  created() {},
}
</script>
