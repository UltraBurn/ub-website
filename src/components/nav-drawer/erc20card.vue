<template>
  <div>
    ERC20 tools

    <div>
      <v-text-field autocomplete="new-password" class="mt-2" v-model="filters.search.name" label="Search" rounded filled single-line></v-text-field>

      <row v-for="item in items" :key="item.address" :item="item" :apiKey="apiKey"> </row>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import ServerListController from '@/mixins/ServerListController'
import ServerListBindings from '@/mixins/ServerListBindings'
import Row from './erc20row'

export default {
  props: {
    apiKey: {
      type: String,
      default: '',
    },
  },
  components: {
    Row,
  },
  mixins: [ServerListController, ServerListBindings],
  data: () => ({
    loading: false,
    page: 0,
    filters: {
      rowsPerPage: 20,
      sortCol: 'name',
      sortAscending: false,
      search: {
        name: '',
      },
    },
  }),
  methods: {
    loadAPI: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          this.loading = true
          this.$axios
            .post(`/erc20/search?network=${this.$store.state.ethers.network}`, { filters: this.filters, page: this.page })
            .then(response => {
              var rows = response.data.rows
              this.pagination.rowCount = response.data.count
              this.pagination.pages = Math.ceil(this.pagination.rowCount / this.filters.rowsPerPage)
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
