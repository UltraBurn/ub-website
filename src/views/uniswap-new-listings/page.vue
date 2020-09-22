<template>
  <div>
    <template v-if="!providerConnected">
      <div class="r-outlined pa-4">
        <div>
          This section connects directly to the ethereum explorer. For this you will need to connect to a wallet.
        </div>
      </div>
    </template>
    <template v-else-if="uncBalanceMet || sEthersNetwork == 3">
      <new-listings :key="sEthersNetwork"></new-listings>
    </template>
    <template v-else>
      <div class="r-outlined pa-4">
        To use the ethereum mainnet explorer section you need to be holding at least 10,000 UNC
        <div>Your current UNC balance: {{ humanBalance }}</div>
        <div class="textMid--text caption font-italic mt-2">
          Switch your connected wallet to one holding at least 10k UNC
        </div>

        <div class="textMid--text caption font-italic mt-2">
          Switch to ropsten network to demo the explorer on the ropsten test net
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import SmartContract from './smart-contract'
import NewListings from './new-listings'

export default {
  components: {
    NewListings,
  },
  data: () => ({
    uncBalance: 0,
  }),
  computed: {
    sEthersNetwork() {
      return this.sEthers.network
    },
    coinbaseWatcher() {
      return this.sEthers.coinbase
    },
    sEthers() {
      return this.$store.state.ethers
    },
    providerConnected() {
      return this.sEthers.provider ? true : false
    },
    uncBalanceMet() {
      return this.uncBalance >= 10000 * Math.pow(10, 18)
    },
    humanBalance() {
      var balance = this.uncBalance / Math.pow(10, 18)
      if (balance < 1) {
        return Number(balance).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })
      } else {
        return Number(balance).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      }
    },
  },
  watch: {
    coinbaseWatcher() {
      this.getUncBalance()
    },
  },
  methods: {
    async connectToMetamask() {
      await window.ethereum.enable()
    },
    getUncBalance() {
      this.uncBalance = 0
      SmartContract.getUNCBalance(this.sEthers.coinbase)
        .then(balance => {
          this.uncBalance = balance
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  created() {
    this.getUncBalance()
  },
}
</script>
