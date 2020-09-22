<template>
  <v-container>
    <v-btn text @click="$router.back()" color="textMid">
      <v-icon>mdi-chevron-left</v-icon>
      back
    </v-btn>

    <v-row class="ma-0 mt-8 mb-2 justify-center">
      <h2 class="font-weight-bold mb-3">
        POL (Proof of liquidity)
      </h2>
    </v-row>

    <v-row class="ma-0 justify-center mt-4">
      <v-btn rounded x-small class="mb-2 mr-2" href="https://etherscan.io/address/0x17e00383A843A9922bCA3B280C0ADE9f8BA48449" target="_blank">
        View contract
      </v-btn>
      <v-btn
        rounded
        x-small
        class="mb-2 mr-2"
        href="https://medium.com/@hello_89425/how-to-lock-your-tokens-liquidity-for-token-developers-6dc66cfb494e"
        target="_blank"
      >
        How to lock
      </v-btn>
    </v-row>

    <v-card v-if="pair" style="max-width: 500px;" class="mx-auto pa-4">
      <final-metamask :pair="pair"></final-metamask>
    </v-card>
  </v-container>
</template>

<script>
import FinalMetamask from './components/lock-liquidity/final-metamask'

export default {
  props: {
    pair: null, // string address
  },
  data: () => ({
    loading: true,
    hydrated_pair: null,
  }),
  components: {
    FinalMetamask,
  },
  methods: {},
  created() {},
}
</script>
