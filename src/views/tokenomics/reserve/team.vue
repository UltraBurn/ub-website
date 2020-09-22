<template>
  <div>
    <img src="@/assets/img/vault.jpg" alt="Vault" width="100%" class="" />

    <!-- MAIN CONTENT -->
    <div class="pa-4">
      <v-row class="ma-0 mb-4 align-center">
        <div class="headline">
          Team Reserve
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
        <v-btn rounded x-small class="mb-2 mr-2" href="https://etherscan.io/address/0x0EEB86AA7e7B0D846ffEF65D93147f22cDe44C7C" target="_blank">
          Address
        </v-btn>
        <v-btn rounded x-small class="mb-2 mr-2" href="https://etherscan.io/address/0x029e3dd04b567e3c41b92b5456a15b9895d0a229" target="_blank">
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
      return ((this.coin_metrics || {}).reserves || {}).team_reserve || {}
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
