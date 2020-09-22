<template>
  <div>
    <portfolio-row v-for="token in tokens" :key="token" :address="token"> </portfolio-row>
  </div>
</template>

<script>
import PortfolioRow from './portfolio-row'

export default {
  components: {
    PortfolioRow,
  },
  data: () => ({
    tokens: [
      'ethereum',
      '0xf29e46887FFAE92f1ff87DfE39713875Da541373', // unc
    ],
  }),
  computed: {
    sEthers() {
      return this.$store.state.ethers
    },
  },
  methods: {
    async getEthBalance() {
      var balance = await this.sEthers.provider.getBalance(this.sEthers.coinbase)
      this.ethBalance = balance.toString()
    },
  },
}
</script>
