<template>
  <div>
    <v-row class="ma-0" style="min-height: 50px;">
      Add custom token

      <v-spacer></v-spacer>
      <v-progress-circular v-show="loading" indeterminate color=""></v-progress-circular>
    </v-row>

    <eth-network :network.sync="network"></eth-network>

    <div class="font-italic caption textMid--text mt-8">
      e.g. 0xf29e46887FFAE92f1ff87DfE39713875Da541373
    </div>

    <v-text-field
      autocomplete="new-password"
      class="mt-2"
      v-model="contract_address"
      label="Token contract address"
      rounded
      filled
      single-line
    ></v-text-field>

    <v-row v-if="response" class="ma-0 pa-2 align-center">
      <img
        :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${response.address}/logo.png`"
        height="30px"
        @error="setAltImg"
        style="z-index: 1;"
        class="mr-4"
      />
      <div class="font-weight-bold mr-2">
        {{ response.symbol }}
      </div>
      <div class="caption">
        {{ response.name }}
      </div>
      <div class="caption textMid--text ml-2">(Decimals: {{ response.decimals }})</div>
    </v-row>

    <div v-if="error" class="red--text">
      {{ error }}
    </div>

    <v-row class="justify-end">
      <v-btn @click="$emit('onCancel')" class="mr-2">
        Cancel
      </v-btn>
      <v-btn @click="addToken">
        Accept
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import EthNetwork from '@/components/ui/dropdowns/eth-network'
export default {
  components: {
    EthNetwork,
  },
  data: () => ({
    contract_address: null,
    response: null,
    loading: false,
    error: null,
    network: 1,
  }),
  computed: {
    address_length() {
      return String(this.contract_address).length
    },
    address_valid() {
      return this.address_length === 42
    },
  },
  watch: {
    contract_address() {
      if (this.address_valid) {
        this.checkAddress()
      } else {
        this.response = null
      }
    },
    network() {
      this.checkAddress()
    },
  },
  methods: {
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
    checkAddress() {
      this.loading = true
      this.$axios
        .get(`/pol/token-info/${this.contract_address}?network=${this.network}`)
        .then(response => {
          this.error = null
          this.response = response.data
        })
        .catch(error => {
          this.error = error.response.data.errors[0]
          this.response = null
          console.log(error)
        })
        .then(() => {
          this.loading = false
        })
    },
    addToken() {
      this.loading = true
      this.$axios
        .get(`/pol/add-token/${this.contract_address}?network=${this.network}`)
        .then(response => {
          this.error = null
          this.response = response.data
          this.$emit('onTokenAdded')
        })
        .catch(error => {
          this.error = error.response.data.errors[0]
          console.log(error)
        })
        .then(() => {
          this.loading = false
        })
    },
  },
}
</script>
