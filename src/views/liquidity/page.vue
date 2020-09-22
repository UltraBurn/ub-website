<template>
  <v-container>
    <v-tabs v-if="false" v-model="tab" class="mb-6">
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        Pairs
      </v-tab>

      <!--
      <v-tab>
        Tokens
      </v-tab>
      -->

      <v-tab>
        New listings
      </v-tab>
      <!--
      <v-tab>
        Add ERC20 token
      </v-tab>

      <v-tab>
        Add uniswap pair
      </v-tab>
      -->

      <!--
      <v-tab>
        Lock liquidity
      </v-tab>
      -->
    </v-tabs>

    <uniswap-browse-pairs v-if="tab === 0"></uniswap-browse-pairs>

    <!-- <token-list v-if="tab === 1"></token-list> -->

    <new-uniswap-listings v-if="tab === 1"></new-uniswap-listings>

    <v-row v-if="tab === 2">
      <v-card class="pa-4 mx-auto" style="max-width: 500px; width: 100%;">
        <add-custom-token></add-custom-token>
      </v-card>
    </v-row>

    <v-row v-if="tab === 3">
      <v-card class="pa-4 mx-auto" style="max-width: 500px; width: 100%;">
        <add-uniswap-pair></add-uniswap-pair>
      </v-card>
    </v-row>

    <!--
    <v-row v-if="tab === 5">
      <v-card class="pa-4 mx-auto" style="max-width: 500px; width: 100%;">
        <lock-liquidity></lock-liquidity>
      </v-card>
    </v-row>
    -->
  </v-container>
</template>

<script>
import NewUniswapListings from '@/views/uniswap-new-listings/page'
import UniswapBrowsePairs from '@/views/uniswap-browse-pairs/page'
import AddCustomToken from '@/components/search/erc20/add-custom-token'
import AddUniswapPair from '@/components/search/uniswap-pairs/add-custom-pool'
// import TokenList from './components/token-list'
// import LockLiquidity from './components/lock-liquidity/main'

export default {
  name: 'UniswapBrowser',
  components: {
    AddCustomToken,
    NewUniswapListings,
    AddUniswapPair,
    // TokenList,
    // LockLiquidity,
    UniswapBrowsePairs,
  },
  data: () => ({
    tab: 0,
  }),
}
</script>
