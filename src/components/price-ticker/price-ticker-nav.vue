<template>
  <div>
    <v-row class="ma-0 text--text align-center">
      <div class="pa-1">
        <v-row class="ma-0 pa-1 align-center caption">
          <img src="@/assets/img/eth.png" alt="UCR" height="20px" class="mr-2" />
          ${{ eth_usd }}
        </v-row>
        <v-row class="ma-0 pa-1 align-center caption">
          <img src="@/assets/img/logo.jpg" alt="UCR" height="20px" class="mr-2" />
          ${{ unc_usd }}
        </v-row>
        <div class="font-italic textMid--text">
          <div class="caption">last updated: {{ last_updated }}</div>
        </div>

        <!-- LAST TRADE -->
        <div v-if="false" class="caption" style="word-break: break-word;">
          {{ coin_metrics.last_trade }}
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({}),
  computed: {
    coin_metrics() {
      return this.$store.state.coin_metrics
    },
    eth_usd() {
      var raw = this.coin_metrics.eth_price
      if (!raw) {
        return 0
      }
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    unc_usd() {
      var raw = this.coin_metrics.unc_price
      if (!raw) {
        return 0
      }
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })
    },
    last_updated() {
      return moment(this.coin_metrics.last_updated).format('HH:mm:ss')
    },
  },
}
</script>
