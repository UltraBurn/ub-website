<template>
  <div class="pa-4">
    <div class="pb-4 headline">
      Calculator
    </div>
    <v-text-field v-model="amount_unc" label="UNC" outlined @focus="amountFocussed = true" @blur="amountFocussed = false"></v-text-field>
    <v-text-field v-model="price_usd" label="USD" outlined></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    amount_unc: 0,
    price_usd: 0,
    amountFocussed: false,
  }),
  computed: {
    coin_metrics() {
      return this.$store.state.coin_metrics
    },
  },
  watch: {
    amount_unc(nv) {
      if (this.amountFocussed) {
        this.price_usd = nv * this.coin_metrics.unc_price
      }
    },
    price_usd(nv) {
      if (!this.amountFocussed) {
        this.amount_unc = nv / this.coin_metrics.unc_price
      }
    },
  },
}
</script>
