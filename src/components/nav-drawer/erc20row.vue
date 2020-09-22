<template>
  <div>
    {{ item }}

    <div>
      <v-btn @click="syncToken">
        Sync
      </v-btn>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      },
    },
    apiKey: {
      type: String,
      default: '',
    },
  },
  methods: {
    syncToken: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          this.loading = true
          this.$axios
            .post(`/erc20/sync-single?network=${this.$store.state.ethers.network}`, { apiKey: this.apiKey, address: this.item.address })
            .then(response => {
              console.log(response)
            })
            .then(() => resolve())
            .catch(error => {
              console.log(error)
              reject(error)
            })
            .then(() => {
              this.loading = false
            })
        })
      },
      150,
      { leading: true },
    ),
  },
}
</script>
