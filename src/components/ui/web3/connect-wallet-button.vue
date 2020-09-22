<template>
  <v-btn :color="sEthers.coinbase ? 'textMid' : 'primary'" rounded outlined class="mr-2" small @click="connectWallet">
    <template v-if="!sEthers.coinbase">
      Connect wallet
    </template>
    <template v-else>
      <img v-if="sEthers.providerName === 'Metamask'" src="@/assets/img/metamask.svg" height="20px" class="mr-3" />
      <img v-if="sEthers.providerName === 'Coinbase'" src="@/assets/img/coinbase-wallet.svg" height="20px" class="mr-3" />
      {{ sEthers.coinbase_condensed }}
    </template>
  </v-btn>
</template>

<script>
export default {
  computed: {
    sEthers() {
      return this.$store.state.ethers
    },
  },
  methods: {
    connectWallet() {
      this.$root.$dialog.connectModal.open()
    },
  },
}
</script>
