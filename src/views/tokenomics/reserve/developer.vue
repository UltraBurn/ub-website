<template>
  <div>
    <img src="@/assets/img/vault.jpg" alt="Vault" width="100%" class="" />

    <!-- MAIN CONTENT -->
    <div class="pa-4">
      <v-row class="ma-0 mb-4 align-center">
        <div class="headline">
          Developer Reserve
        </div>
      </v-row>

      <div class="mb-2">
        Available: <span class="font-weight-medium light-blue--text">{{ available_balance }}</span>
      </div>
      <div>
        Locked balance: <span class="font-weight-medium" style="color: #7A74D6;">{{ locked_balance }}</span>
      </div>
      <div class="caption font-italic textMid--text">Unlock date: {{ unlock_date }}</div>

      <v-row class="ma-0 mt-4 pa-2">
        <v-btn rounded x-small class="mb-2 mr-2" href="https://etherscan.io/address/0xC95c5EDda5c2b1D415E77d05e71f3132FE19DA1A" target="_blank">
          Address
        </v-btn>
        <v-btn rounded x-small class="mb-2 mr-2" href="https://etherscan.io/address/0x582869e276d50bb0afe5ba39ab041f5da22ec722" target="_blank">
          Vault Contract
        </v-btn>
      </v-row>
    </div>
    <!-- MAIN CONTENT -->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  computed: {
    coin_metrics() {
      return this.$store.state.coin_metrics
    },
    reserve() {
      return ((this.coin_metrics || {}).reserves || {}).developer_reserve || {}
    },
    locked_balance() {
      var raw = this.reserve.locked_balance / Math.pow(10, 18)
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
    available_balance() {
      var raw = this.reserve.available_balance / Math.pow(10, 18)
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
    unlock_date() {
      return moment.unix(this.reserve.unlock_date) // .format("DD/MM/YYYY")
    },
  },
}
</script>
