<template>
  <div>
    <v-row class="ma-0 align-center">
      <div class="pa-1">
        <div class="caption uncgreen--text">Mcap: ${{ marketcap }}</div>
        <div class="textMid--text">
          <div class="caption">Price: ${{ price_usd }}</div>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    coin_metrics() {
      return this.$store.state.coin_metrics
    },
    price_usd() {
      var raw = this.coin_metrics.unc_price
      if (!raw) {
        return 0
      }
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
    },
    marketcap() {
      var raw = this.coin_metrics.unc_price * (this.coin_metrics.circulating_supply / Math.pow(10, 18))
      if (!raw) {
        return 0
      }
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
  },
}
</script>
