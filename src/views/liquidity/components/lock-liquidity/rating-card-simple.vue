<template>
  <div>
    <v-row class="ma-0 align-center">
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${trust_pair.token0.address}/logo.png`"
        height="40px"
        width="40px"
        @error="setAltImg"
        style="z-index: 1;"
      />
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${trust_pair.token1.address}/logo.png`"
        style="margin-left: -10px; margin-right: 15px;"
        @error="setAltImg"
        height="40px"
        width="40px"
      />

      <div>
        <div>
          {{ trust_pair.token0.symbol }}
          /
          {{ trust_pair.token1.symbol }}
        </div>
        <div class="caption textMid--text">
          {{ trust_pair.token0.name }}
          /
          {{ trust_pair.token1.name }}
        </div>
      </div>
    </v-row>

    <div class="pa-4 mt-6 text-center">
      <v-progress-circular :rotate="-90" :size="200" :width="8" :value="trust_pair.trust_score" :color="trustScoreColor">
        <div class="text-center">
          <div class="textMid--text caption">
            Trust
          </div>
          <div class="font-weight-bold display-1 text--text">
            {{ trustHuman }}
          </div>
        </div>
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    pair_address: null,
  },
  data: () => ({
    trust_pair: {
      token0: {},
      token1: {},
    },
  }),
  computed: {
    trustHuman() {
      var percent = this.trust_pair.trust_score
      if (isNaN(percent)) {
        return 0
      }
      return Number(percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })
    },
    trustScoreColor() {
      if (this.trust_pair.trust_score > 50) {
        return '#56BE72'
      } else if (this.trust_pair.trust_score > 0) {
        return 'orange'
      }
      // return 'var(--v-textMid-base)'
      return null
    },
  },
  methods: {
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
    loadAPI: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          this.$axios
            .get(`/uniswap/pair/${this.pair_address}?network=${this.$store.state.ethers.network}`)
            .then(response => {
              this.trust_pair = response.data
            })
            .then(() => resolve())
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      },
      150,
      { leading: true },
    ),
  },
  created() {
    this.loadAPI()
  },
}
</script>
