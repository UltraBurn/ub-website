<template>
  <div>
    <v-row class="align-center ma-0" style="min-height: 50px;">
      Add uniswap pool

      <v-spacer></v-spacer>
      <v-progress-circular v-show="loading" indeterminate color=""></v-progress-circular>
    </v-row>

    <eth-network :network.sync="network"></eth-network>

    <div class="font-italic caption textMid--text mt-2">
      e.g. 0x5e64cd6f84d0ee2ad2a84cadc464184e36274e0c
    </div>

    <v-text-field
      autocomplete="new-password"
      class="mt-2"
      v-model="contract_address"
      label="Uniswap pool address"
      rounded
      filled
      single-line
    ></v-text-field>

    <v-row v-if="response" class="ma-0 pa-2 align-center">
      <div class="">
        Valid pair found
      </div>
    </v-row>

    <div v-if="error" class="red--text">
      {{ error }}
    </div>

    <v-row class="justify-end pa-2">
      <v-btn @click="$emit('onCancel')" text color="text" class="mr-2">
        Cancel
      </v-btn>
      <v-btn v-if="response" @click="addPair" rounded>
        Add pair
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
        .get(`/pol/pair-info/${this.contract_address}?network=${this.network}`)
        .then(response => {
          this.error = null
          this.response = response.data
        })
        .catch(error => {
          this.error = error.response.data.errors[0]
          console.log(error)
        })
        .then(() => {
          this.loading = false
        })
    },
    addPair() {
      this.loading = true
      this.$axios
        .get(`/pol/add-pair/${this.contract_address}?network=${this.network}`)
        .then(response => {
          this.error = null
          this.response = response.data
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
