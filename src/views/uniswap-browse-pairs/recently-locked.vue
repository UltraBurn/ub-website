<template>
  <!--
    <v-carousel
    :cycle="false"
    height="400"
    style="max-width: 500px;" 
    hide-delimiter-background
    hide-delimiters
    >
        <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        >
        <div
          height="100%"
        >
            <v-row
            class="fill-height"
            align="center"
            justify="center"
            >
            <recently-locked-item :item="item"></recently-locked-item>
            </v-row>
        </div>
        </v-carousel-item>
    </v-carousel>
    -->
  <div>
    <div class="textMid--text caption">
      Recently locked liquidity
    </div>

    <v-slide-group class="pa-4" :prev-icon="'mdi-minus'" :next-icon="'mdi-plus'" :show-arrows="true" :center-active="false">
      <v-slide-item v-for="(item, i) in items" :key="i">
        <div class="ml-2 mr-2 r-outlined" height="200" width="300">
          <recently-locked-item :item="item" @click.native="clickRow(item)"></recently-locked-item>
        </div>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import _ from 'lodash'
import RecentlyLockedItem from './recently-locked-item'

export default {
  components: {
    RecentlyLockedItem,
  },
  data: () => ({
    items: [],
    page: 0,
    filters: {
      rowsPerPage: 10,
      sortCol: 'pol_dapp_id',
      sortAscending: false,
      search: {
        name: '',
      },
    },
  }),
  methods: {
    clickRow(item) {
      this.$router.push({ name: 'Uniswap pair', params: { pair_address: item.address } })
    },
    loadAPI: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          this.loading = true
          var trust_only = this.tab === 0 ? `&trust_only=true` : ''
          this.$axios
            .post(`/uniswap/search?network=${this.$store.state.ethers.network}${trust_only}`, { filters: this.filters, page: this.page })
            .then(response => {
              var rows = response.data.rows
              this.items = rows
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
  created() {
    this.loadAPI()
  },
}
</script>
