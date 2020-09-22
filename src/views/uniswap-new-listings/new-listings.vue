<template>
  <div>
    <div class="mb-2">
      New uniswap listings ({{ allPairsLength }})
      <span class="textMid--text">({{ networkName }})</span>
    </div>

    <v-alert v-model="warning_alert" dense dark dismissible icon="mdi-alert" class="orange-gradient pa-4">
      <div class="wave6"></div>

      <div class="posrelative">
        <strong>WARNING:</strong> Use this searcher with caution. The majority of these tokens are <strong>SCAMS</strong>. They
        <strong>WILL</strong> rug pull once receiving as little as 2 ETH. We have been watching this closely for days, and this happens multiple times
        a day. Do NOT give scammers your money.
      </div>
    </v-alert>

    <v-alert v-model="info_alert" dense dark dismissible icon="mdi-alert" color="light-blue" class="caption blue-gradient pa-4">
      <div class="wave1"></div>

      <div class="posrelative">
        We were hesitant to release this part of the app as we know some of you are going to gamble on these tokens. Trust us, you will lose more
        often than you win. Crypto twitter is aware of less than 10% of these new listings. We think what is happening is people have made bots to
        instantly buy new listings on uniswap as it can be profitable. On the flip side, scammers who realise this have made random tokens, listed
        them on uniswap, and rug pulled after as little as 2 ETH making quick profit off these bot buyers. Its that easy. Be EXTREMELY cautious. Do
        not buy tokens without a website, twitter, telegram etc.

        <div class="mt-3">
          If 1000 people gamble $20 on a scam, the scammers make 20k usd. Please dont do this. Rant and warning over :)
        </div>
      </div>
    </v-alert>

    <div class="text-center">
      <v-pagination v-model="vPagination" :length="Math.round(allPairsLength / 10)" :total-visible="10"></v-pagination>
    </div>

    <div class="text-center pa-8">
      <v-progress-circular size="100" v-show="loading" indeterminate color="primary"></v-progress-circular>
    </div>

    <template v-if="!loading">
      <row v-for="item of rows" :key="item.pair_address" :item="item"></row>
    </template>

    <div class="text-center">
      <v-pagination v-model="vPagination" :length="Math.round(allPairsLength / 10)" :total-visible="10"></v-pagination>
    </div>
  </div>
</template>

<script>
import StaticMap from '@/static/maps'
import SmartContract from './smart-contract'
import Row from './row'

export default {
  components: {
    Row,
  },
  data: () => ({
    allPairsLength: 0,
    rows: [],
    page: 0,
    info_alert: true,
    warning_alert: true,
    loading: false,
  }),
  watch: {
    page(nv) {
      if (nv < 0) {
        this.page = 0
      }
      this.reload()
    },
  },
  computed: {
    vPagination: {
      get() {
        return this.page + 1
      },
      set(nv) {
        this.page = nv - 1
      },
    },
    web3() {
      return this.$store.state.web3
    },
    networkName() {
      return StaticMap.networks[this.$store.state.ethers.network]
    },
  },
  methods: {
    reload() {
      this.loading = true
      SmartContract.getLastNListings(this.page, 10)
        .then(rows => {
          this.rows = rows
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.loading = false
        })
    },
  },
  created() {
    SmartContract.getPairsLength().then(allPairsLength => {
      this.allPairsLength = allPairsLength
    })
    this.reload()
  },
}
</script>
