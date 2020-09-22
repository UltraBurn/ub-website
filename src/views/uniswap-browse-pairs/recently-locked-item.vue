<template>
  <div class="pa-2 cursor-pointer">
    <v-row class="ma-0 align-center">
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token0.address}/logo.png`"
        height="20px"
        width="20px"
        @error="setAltImg"
        style="z-index: 1;"
      />
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token1.address}/logo.png`"
        style="margin-left: -5px; margin-right: 15px;"
        @error="setAltImg"
        height="20px"
        width="20px"
      />

      <div>
        <div class="caption text--text">
          {{ item.token0.symbol }}
          /
          {{ item.token1.symbol }}
        </div>
        <div class="caption textMid--text">
          {{ item.token0.name }}
          /
          {{ item.token1.name }}
        </div>
        <div class="textMid--text font-italic caption">#{{ item.uniswap_index }}</div>
      </div>
    </v-row>

    <div class="text-center pa-2">
      <v-progress-circular :rotate="-90" :size="60" :width="3" :value="item.trust_score" :color="trustScoreColor">
        <div class="text-center">
          <div class="font-weight-regular text--text">
            {{ trustHuman }}
          </div>
        </div>
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      token0: {},
      token1: {},
    },
  },
  computed: {
    trustHuman() {
      var percent = this.item.trust_score
      if (isNaN(percent)) {
        return 0
      }
      return Number(percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })
    },
    trustScoreColor() {
      if (this.item.trust_score > 50) {
        return '#56BE72'
      } else if (this.item.trust_score > 0) {
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
  },
}
</script>
