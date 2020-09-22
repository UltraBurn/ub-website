<template>
  <div>
    <!--
    <div v-if="web3.network != pair.network">
      <div class="pa-8 r-outlined">
        Switch metamask ethereum network to <strong>{{ networkName }}</strong>
      </div>
    </div-->

    <template>
      <template v-if="screen === 0">
        <final-overview :pair="pair" @onProceed="onProceedClicked"></final-overview>
      </template>

      <!-- FINAL SCREEN -->
      <template v-else>
        <withdraw-or-lock :pair="pair"></withdraw-or-lock>
        <!--
        <template v-if="holdings">
          <withdraw-or-lock :pair="pair"></withdraw-or-lock>
        </template>
        <template v-else>
          <div class="text-center">
            Your account 
            <v-chip outlined color='text'>
              {{ web3.coinbase_condensed }}
            </v-chip>
            holds no liquidity in this pool.
            <div class="textMid--text caption">
              If you'd like to lock liquidity, please switch metamask to the account that sent
              liquidity to uniswap.
            </div>
          </div>
        </template>
        -->
      </template>
    </template>
  </div>
</template>

<script>
import FinalOverview from './final-overview'
import WithdrawOrLock from './withdraw-or-lock'

export default {
  props: {
    pair: {},
  },
  components: {
    FinalOverview,
    WithdrawOrLock,
  },
  data: () => ({
    screen: 0,
  }),
  watch: {},
  methods: {
    onProceedClicked() {
      this.screen = 1
    },
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
  },
}
</script>
