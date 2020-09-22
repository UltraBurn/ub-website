<template>
  <!-- TOKEN METRICS -->
  <v-container>
    <div>
      <v-row class="ma-0 pa-3">
        <h2 class="display-1 font-weight-bold mb-3">
          Decentralised Tokenomics
        </h2>
      </v-row>

      <v-row>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6" style="height: 100%;">
            <div style="postion: relative; text-align: center;">
              <img src="@/assets/img/logo.jpg" alt="UCR" height="50px" class="" />
            </div>
            <div class="text-center">
              Initial distribution
            </div>
            <div class="text-center headline uncgreen--text font-weight-bold">
              10%
            </div>
            <div class="text-center">
              <div class="overline"></div>
              <div class="caption"></div>
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6" style="height: 100%;">
            <div style="postion: relative; text-align: center;">
              <img src="@/assets/img/logo.jpg" alt="UCR" height="50px" class="" />
            </div>
            <div class="text-center">
              Team allocation
            </div>
            <div class="text-center headline uncgreen--text font-weight-bold">
              10%
            </div>
            <div class="text-center">
              <div class=""></div>
              <div class="caption"></div>
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6" style="height: 100%;">
            <div style="postion: relative; text-align: center;">
              <img src="@/assets/img/logo.jpg" alt="UCR" height="50px" class="" />
            </div>
            <div class="text-center">
              Community Reserve
            </div>
            <div class="text-center headline uncgreen--text font-weight-bold">
              65%
            </div>
            <div class="text-center">
              <div class="caption">&nbsp;</div>
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6" style="height: 100%;">
            <div style="postion: relative; text-align: center;">
              <img src="@/assets/img/logo.jpg" alt="UCR" height="50px" class="" />
            </div>
            <div class="text-center">
              Developer Reserve
            </div>
            <div class="text-center headline uncgreen--text font-weight-bold">
              15%
            </div>
            <div class="text-center">
              <div class="caption">&nbsp;</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <!-- TOKEN METRICS -->
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    coin_metrics() {
      return this.$store.state.coin_metrics
    },
    price_usd() {
      var raw = this.coin_metrics.eth_price / this.coin_metrics.last_trade.price
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })
    },
    marketcap() {
      var raw = this.price_usd * this.coin_metrics.circulating_supply
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    circulating_supply() {
      return Number(this.coin_metrics.circulating_supply).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
  },
}
</script>
