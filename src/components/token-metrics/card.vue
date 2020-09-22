<template>
  <!-- TOKEN METRICS -->
  <v-container>
    <div>
      <v-row class="ma-0 pa-3 pl-0">
        <h2 class="display-1 mb-3">
          Live Token metrics
        </h2>
      </v-row>
      <div class="caption font-italic textMid--text">
        updated every 30 seconds
      </div>

      <v-row>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6 green-gradient" style="height: 100%;">
            <div class="wave1"></div>
            <div class="posrelative">
              <div style="postion: relative; text-align: center;">
                <img src="@/assets/img/UB_icon_white.jpg" alt="UCR" height="50px" class="coinspin" />
              </div>
              <div class="text-center white--text">
                Market cap
              </div>
              <div class="text-center white--text font-weight-bold">${{ marketcap }}</div>
              <div class="text-center">
                <div class="caption white--text font-italic">Price: ${{ price_usd }}</div>
                <div class="caption"></div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6 blue-gradient" style="height: 100%;">
            <div class="wave2"></div>
            <div class="posrelative">
              <div style="postion: relative; text-align: center;">
                <img src="@/assets/img/UB_icon_white.jpg" alt="UCR" height="50px" class="coinspin" />
              </div>
              <div class="text-center white--text">
                Circulating Supply
              </div>
              <div class="text-center white--text font-weight-bold">
                {{ circulating_supply }}
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6 red-gradient" style="height: 100%;">
            <div class="wave3"></div>
            <div class="posrelative">
              <div style="postion: relative; text-align: center;">
                <img src="@/assets/img/UB_icon_white.jpg" alt="UCR" height="50px" class="coinspin" />
              </div>
              <div class="text-center white--text">
                Burnt
              </div>
              <div class="text-center white--text font-weight-bold">
                {{ coin_metrics.burnt }}
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6 purple-gradient" style="height: 100%;">
            <div class="wave4"></div>
            <div class="posrelative">
              <div style="postion: relative; text-align: center;">
                <img src="@/assets/img/UB_icon_white.jpg" alt="UCR" height="50px" class="coinspin" />
              </div>
              <div class="text-center white--text">
                Locked
              </div>
              <div class="display-1 text-center white--text font-weight-bold">
                70%
              </div>
              <div class="text-center white--text font-weight-bold">
                {{ total_locked }}
              </div>
              <div class="caption text-center font-italic white--text">Unlock date: {{ unlock_date }}</div>
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6 orange-gradient" style="height: 100%;">
            <div class="wave5"></div>
            <div class="posrelative">
              <div style="postion: relative; text-align: center;">
                <img src="@/assets/img/UB_icon_white.jpg" alt="UCR" height="50px" class="coinspin" />
              </div>
              <div class="text-center white--text">
                Total Supply
              </div>
              <div class="text-center white--text font-weight-bold">
                1,000,000,000
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="2">
          <v-card class="pt-6 pb-6 green-gradient" style="height: 100%;">
            <div class="wave6"></div>
            <div class="posrelative">
              <div class="text-center">
                <v-btn to="/tokenomics" class="mb-3">
                  Tokenomics
                </v-btn>
              </div>
              <div class="text-center white--text">
                Learn about our dynamic tokenomics here
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <!-- TOKEN METRICS -->
</template>

<script>
import moment from 'moment'

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
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })
    },
    marketcap() {
      var raw = this.coin_metrics.unc_price * (this.coin_metrics.circulating_supply / Math.pow(10, 18))
      if (!raw) {
        return 0
      }
      return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
    circulating_supply() {
      var circulating_supply = this.coin_metrics.circulating_supply / Math.pow(10, 18)
      return Number(circulating_supply).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
    total_locked() {
      if (!this.coin_metrics.reserves) {
        return null
      }
      var locked =
        Number(this.coin_metrics.reserves.team_reserve.locked_balance) +
        Number(this.coin_metrics.reserves.developer_reserve.locked_balance) +
        Number(this.coin_metrics.reserves.community_reserve.locked_balance)
      locked = locked / Math.pow(10, 18)
      return Number(locked).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
    unlock_date() {
      if (!this.coin_metrics.reserves) {
        return null
      }
      return moment.unix(this.coin_metrics.reserves.team_reserve.unlock_date).format('DD/MM/YYYY')
    },
  },
}
</script>

<style lang="scss" scoped></style>
