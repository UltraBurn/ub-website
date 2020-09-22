<template>
  <tr v-if="layout === 'pc'">
    <!--
    <td>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            icon
            color="textMid"
            v-on="on"
          >
            <v-icon small>mdi-settings</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :href="`https://etherscan.io/address/${item.address}`" target="_blank">
            <v-list-item-title>View on etherscan</v-list-item-title>
          </v-list-item>
          <v-list-item :href="`https://uniswap.info/pair/${item.address}`" target="_blank">
            <v-list-item-title>View on uniswap</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </td>
    -->
    <td>
      <v-row class="ma-0 align-center">
        <img
          :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token0.address}/logo.png`"
          height="30px"
          width="30px"
          @error="setAltImg"
          style="z-index: 1;"
        />
        <img
          :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token1.address}/logo.png`"
          style="margin-left: -10px; margin-right: 15px;"
          @error="setAltImg"
          height="30px"
          width="30px"
        />

        {{ item.token0.symbol }}
        /
        {{ item.token1.symbol }}
      </v-row>
    </td>
    <td class="textMid--text">
      {{ item.uniswap_index }}
    </td>
    <td>
      <div :style="`color: ${trustScoreColor}`">
        <template v-if="item.trust_score > 0">
          {{ trustHuman }}%
          <v-icon v-if="item.trust_score > 0" small :color="trustScoreColor">mdi-star</v-icon>
          <v-icon v-if="item.trust_score > 20" small :color="trustScoreColor">mdi-star</v-icon>
          <v-icon v-if="item.trust_score > 50" small :color="trustScoreColor">mdi-star</v-icon>
        </template>
        <template v-else>
          <v-chip outlined x-small color="textMid">
            high risk
          </v-chip>
        </template>
      </div>
    </td>
    <td>
      <v-row dense class="ma-0">
        <v-col cols="6">
          <div class="pa-2 r-outlined">
            <!--
            <v-btn x-small @click="checkPair">
              check
            </v-btn>
            -->
            <div class="d-flex align-center">
              <img
                :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token0.address}/logo.png`"
                height="20px"
                @error="setAltImg"
              />
              <div :class="['caption ml-1', { 'textMid--text': percent0OnUniswap < 0.5 }]">{{ percent0OnUniswapHuman }}%</div>
            </div>
            <!--
            <div>
              {{ token0ReserveHuman }}
            </div>
            <div class="caption textMid--text">
              {{ token0SupplyHuman }}
            </div>
            -->
          </div>
        </v-col>
        <v-col cols="6">
          <div class="pa-2 r-outlined">
            <div class="d-flex align-center">
              <img
                :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token1.address}/logo.png`"
                @error="setAltImg"
                height="20px"
              />
              <div :class="['caption ml-1', { 'textMid--text': percent1OnUniswap < 0.5 }]">{{ percent1OnUniswapHuman }}%</div>
            </div>
            <!--
            <div>
              {{ token1ReserveHuman }}
            </div>
            <div class="caption textMid--text">
              {{ token1SupplyHuman }}
            </div>
            -->
          </div>
        </v-col>
      </v-row>

      <!--
      <div class="caption textMid--text">
        {{ item }}
      </div>
      -->
    </td>
  </tr>

  <tr v-else-if="layout === 'rich'">
    <td>
      <v-row class="ma-0 align-center">
        <img
          :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token0.address}/logo.png`"
          height="40px"
          width="40px"
          @error="setAltImg"
          style="z-index: 1;"
        />
        <img
          :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token1.address}/logo.png`"
          style="margin-left: -10px; margin-right: 15px;"
          @error="setAltImg"
          height="40px"
          width="40px"
        />

        <div>
          <div>
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
    </td>

    <td>
      <v-progress-circular :rotate="-90" :size="100" :width="5" :value="item.trust_score" :color="trustScoreColor">
        <div class="text-center">
          <div class="textMid--text caption">
            POL score
          </div>
          <div class="font-weight-bold title text--text">
            {{ trustHuman }}
          </div>
        </div>
      </v-progress-circular>
    </td>

    <td>
      <div class="caption textMid--text font-italic">
        Total supply in this pool
      </div>
      <v-row dense class="ma-0">
        <v-col cols="6">
          <div class="pa-2 r-outlined">
            <!--
            <v-btn x-small @click="checkPair">
              check
            </v-btn>
            -->
            <div class="d-flex align-center">
              <img
                :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token0.address}/logo.png`"
                height="20px"
                @error="setAltImg"
              />
              <div :class="['caption ml-1', { 'textMid--text': percent0OnUniswap < 0.5 }]">{{ percent0OnUniswapHuman }}%</div>
            </div>
            <!--
            <div>
              {{ token0ReserveHuman }}
            </div>
            <div class="caption textMid--text">
              {{ token0SupplyHuman }}
            </div>
            -->
          </div>
        </v-col>
        <v-col cols="6">
          <div class="pa-2 r-outlined">
            <div class="d-flex align-center">
              <img
                :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token1.address}/logo.png`"
                @error="setAltImg"
                height="20px"
              />
              <div :class="['caption ml-1', { 'textMid--text': percent1OnUniswap < 0.5 }]">{{ percent1OnUniswapHuman }}%</div>
            </div>
            <!--
            <div>
              {{ token1ReserveHuman }}
            </div>
            <div class="caption textMid--text">
              {{ token1SupplyHuman }}
            </div>
            -->
          </div>
        </v-col>
      </v-row>
    </td>
  </tr>

  <div v-else class="pl-2 pr-2 pt-2 pb-2 r-border-b">
    <v-row class="ma-0 align-center caption">
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token0.address}/logo.png`"
        height="30px"
        width="30px"
        @error="setAltImg"
        style="z-index: 1;"
      />
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${item.token1.address}/logo.png`"
        style="margin-left: -10px; margin-right: 15px;"
        @error="setAltImg"
        height="30px"
        width="30px"
      />

      <div>
        <div>
          {{ item.token0.symbol }}
          <span class="textMid--text">
            /
          </span>
          {{ item.token1.symbol }}
        </div>
        <div class="textMid--text">
          {{ item.uniswap_index }}
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="text-end">
        <div :style="`color: ${trustScoreColor}`">
          <template v-if="item.trust_score > 0">
            <v-icon small :color="trustScoreColor">mdi-star-circle</v-icon>
            {{ trustHuman }}
          </template>
          <template v-else>
            <v-chip outlined x-small color="textMid">
              high risk
            </v-chip>
          </template>
          <!--
          <v-progress-circular
          :rotate="-90"
          :size="50"
          :width="2"
          :value="item.trust_score"
          :color="trustScoreColor"
          >
            <div class="text-center">
              <div class="font-weight-bold text--text">
                {{ trustHuman }}
              </div>
            </div>
          </v-progress-circular>
          -->
        </div>
        <div class="font-italic textMid--text">{{ percent0OnUniswap > percent1OnUniswap ? percent0OnUniswapHuman : percent1OnUniswapHuman }}%</div>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      token0: {},
      token1: {},
    },
    layout: {
      type: String,
      default: 'pc', // options pc, rich
    },
  },
  components: {
    // RatingCard
  },
  data: () => ({
    token0Supply: '0',
    token1Supply: '0',
  }),

  computed: {
    trustScoreColor() {
      if (this.item.trust_score > 50) {
        return '#56BE72'
      } else if (this.item.trust_score > 0) {
        return 'orange'
      }
      // return 'var(--v-textMid-base)'
      return null
    },
    trustHuman() {
      var percent = this.item.trust_score
      return Number(percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })
    },
    token0SupplyHuman() {
      var tsupply = this.item.token0.total_supply / Math.pow(10, this.item.token0.decimals)
      return Number(tsupply).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    },
    token0ReserveHuman() {
      var reserve = this.item.reserve0 / Math.pow(10, this.item.token0.decimals)
      return Number(reserve).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    },
    percent0OnUniswap() {
      var percent = Number(this.item.reserve0) / Number(this.item.token0.total_supply)
      return percent * 100
    },
    percent0OnUniswapHuman() {
      var percent = this.percent0OnUniswap
      if (percent < 0.001) {
        return '< 0.001'
      }
      return Number(percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })
    },
    token1SupplyHuman() {
      var tsupply = this.item.token1.total_supply / Math.pow(10, this.item.token1.decimals)
      return Number(tsupply).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    },
    token1ReserveHuman() {
      var reserve = this.item.reserve1 / Math.pow(10, this.item.token1.decimals)
      return Number(reserve).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    },
    percent1OnUniswap() {
      var percent = Number(this.item.reserve1) / Number(this.item.token1.total_supply)
      return percent * 100
    },
    percent1OnUniswapHuman() {
      var percent = this.percent1OnUniswap
      if (percent < 0.001) {
        return '< 0.001'
      }
      return Number(percent).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })
    },
  },
  methods: {
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
    checkPair() {
      this.$axios
        .post(`/uniswap/check/${this.item.address}`)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
.c-list {
  cursor: pointer;
  &:hover {
    background: var(--v-background-base);
  }
}
</style>
