<template>
  <div>
    <v-row class="ma-0 mt-4 mb-2 align-center">
      <h2 class="font-weight-bold">
        Uniswap Browser
      </h2>
      <v-spacer></v-spacer>
    </v-row>

    <v-alert v-model="warning_alert" dense dark dismissible icon="mdi-alert" class="orange-gradient pa-4">
      <div class="wave6"></div>

      <div class="posrelative">
        <strong>WARNING:</strong> Use this searcher with caution. Many tokens on uniswap are <strong>SCAMS</strong>. Our Trust Score in its current
        state only tracks the percentage of the liquidity locked on a pair. It does not constitute financial advice and we do not advise investing in
        any token whatsoever. All of our metrics are automatically calculated and in future will include community voting but will never be directly
        set by the UNC team. It is also possible to lock liquidity and then dump tokens on the locked liquidity. Please read up on projects first
        before throwing money at tokens that don't even have websites. By using this browser you accept full responsibility for your choice in
        investments.
        <v-btn rounded small class="" href="https://medium.com/@hello_89425/how-the-unc-uniswap-browser-works-e209bd090e75" target="_blank">
          <v-icon small class="mr-2">mdi-open-in-new</v-icon>
          How this works
        </v-btn>
      </div>
    </v-alert>

    <recently-locked v-if="true"></recently-locked>

    <template v-if="!$vuetify.breakpoint.mobile">
      <!--
      <v-tabs
        v-model="tab"
        fixed-tabs
        color="text"
      >
        <v-tab class="caption">
          Trusted tokens
        </v-tab>
        <v-tab class="caption">
          All tokens
        </v-tab>
      </v-tabs>
      -->

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            autocomplete="new-password"
            class="mt-2"
            v-model="filters.search.name"
            label="Search uniswap pairs"
            rounded
            filled
            hide-details
            clearable
            single-line
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="ma-0 pa-0 align-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn rounded small v-on="on">
              <span class="caption">
                <template v-if="filters.sortCol === 'pair'">
                  Alphabetical
                </template>
                <template v-else-if="filters.sortCol === 'uniswap_index'">
                  Latest
                </template>
                <template v-else-if="filters.sortCol === 'trust_score'">
                  Pol score
                </template>
                <template v-else-if="filters.sortCol === 'largest_percent_on_uniswap'">
                  Supply on uniswap
                </template>
                <v-icon color="" small :class="{ 'rotate-180': filters.sortAscending }">mdi-chevron-down</v-icon>
              </span>
            </v-btn>
          </template>

          <v-list class="text">
            <v-list-item @click="clickSortHeader('trust_score')">
              <v-list-item-title class="background--text">POL score</v-list-item-title>
              <v-list-item-icon>
                <v-icon v-if="filters.sortCol === 'trust_score'" color="background" :class="{ 'rotate-180': filters.sortAscending }"
                  >mdi-chevron-down</v-icon
                >
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="clickSortHeader('pair')">
              <v-list-item-title class="background--text">Alphabetical</v-list-item-title>
              <v-list-item-icon>
                <v-icon v-if="filters.sortCol === 'pair'" color="background" :class="{ 'rotate-180': filters.sortAscending }"
                  >mdi-chevron-down</v-icon
                >
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="clickSortHeader('uniswap_index')">
              <v-list-item-title class="background--text">Latest</v-list-item-title>
              <v-list-item-icon>
                <v-icon v-if="filters.sortCol === 'uniswap_index'" color="background" :class="{ 'rotate-180': filters.sortAscending }"
                  >mdi-chevron-down</v-icon
                >
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="clickSortHeader('largest_percent_on_uniswap')">
              <v-list-item-title class="background--text">% total supply on uniswap</v-list-item-title>
              <v-list-item-icon>
                <v-icon v-if="filters.sortCol === 'largest_percent_on_uniswap'" color="background" :class="{ 'rotate-180': filters.sortAscending }"
                  >mdi-chevron-down</v-icon
                >
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>

      <table class="c-table hover pointer">
        <colgroup>
          <col width="10px" />
          <col width="10px" />
          <col width="10px" />
        </colgroup>
        <tr v-if="false">
          <c-table-header title="Pair" code="pair" :filters="filters" @onClick="clickSortHeader"> </c-table-header>

          <c-table-header title="Trust score" code="trust_score" :filters="filters" @onClick="clickSortHeader"> </c-table-header>

          <c-table-header title="% ts on uniswap" code="largest_percent_on_uniswap" :filters="filters" @onClick="clickSortHeader"> </c-table-header>
        </tr>

        <list-row
          v-for="item in items"
          :key="item.address"
          layout="rich"
          :item="item"
          :searchFilters="filters.search"
          @onLockLiquidity="onLockLiquidity"
          @click.native="clickRow(item)"
        ></list-row>
      </table>
    </template>
    <template v-else>
      <!--
      <v-tabs
        v-model="tab"
        fixed-tabs
        color="text"
      >
        <v-tab class="caption">
          Trusted tokens
        </v-tab>
        <v-tab class="caption">
          All tokens
        </v-tab>
      </v-tabs>
      -->
      <!-- tools -->
      <v-text-field
        autocomplete="new-password"
        class="mt-2 caption mb-2"
        v-model="filters.search.name"
        label="Search uniswap pairs"
        rounded
        dense
        filled
        hide-details
        clearable
        single-line
      ></v-text-field>
      <v-row class="ma-0 pa-0 align-center justify-end">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn rounded small v-on="on">
              <span class="caption">
                <template v-if="filters.sortCol === 'pair'">
                  Alphabetical
                </template>
                <template v-else-if="filters.sortCol === 'uniswap_index'">
                  Latest
                </template>
                <template v-else-if="filters.sortCol === 'trust_score'">
                  POL score
                </template>
                <template v-else-if="filters.sortCol === 'largest_percent_on_uniswap'">
                  Supply on uniswap
                </template>
                <v-icon color="" small :class="{ 'rotate-180': filters.sortAscending }">mdi-chevron-down</v-icon>
              </span>
            </v-btn>
          </template>

          <v-list class="text">
            <v-list-item @click="clickSortHeader('trust_score')">
              <v-list-item-title class="background--text">Pol score</v-list-item-title>
              <v-list-item-icon>
                <v-icon v-if="filters.sortCol === 'trust_score'" color="background" :class="{ 'rotate-180': filters.sortAscending }"
                  >mdi-chevron-down</v-icon
                >
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="clickSortHeader('pair')">
              <v-list-item-title class="background--text">Alphabetical</v-list-item-title>
              <v-list-item-icon>
                <v-icon v-if="filters.sortCol === 'pair'" color="background" :class="{ 'rotate-180': filters.sortAscending }"
                  >mdi-chevron-down</v-icon
                >
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="clickSortHeader('uniswap_index')">
              <v-list-item-title class="background--text">Latest</v-list-item-title>
              <v-list-item-icon>
                <v-icon v-if="filters.sortCol === 'uniswap_index'" color="background" :class="{ 'rotate-180': filters.sortAscending }"
                  >mdi-chevron-down</v-icon
                >
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="clickSortHeader('largest_percent_on_uniswap')">
              <v-list-item-title class="background--text">% total supply on uniswap</v-list-item-title>
              <v-list-item-icon>
                <v-icon v-if="filters.sortCol === 'largest_percent_on_uniswap'" color="background" :class="{ 'rotate-180': filters.sortAscending }"
                  >mdi-chevron-down</v-icon
                >
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <!-- tools -->

      <list-row
        v-for="item in items"
        layout="mobile"
        :key="item.address"
        :item="item"
        :searchFilters="filters.search"
        @onLockLiquidity="onLockLiquidity"
        @click.native="clickRow(item)"
      ></list-row>
    </template>

    <div v-if="items.length === 0" class="r-outlined pa-2">
      No items match your search
    </div>

    <!-- PAGINATION -->
    <c-pagination
      :page="page"
      :pagination="pagination"
      :filters="filters"
      :compact="true"
      @updatePageNumber="updatePageNumber"
      @goToFirstPage="goToFirstPage"
      @goToPreviousPage="goToPreviousPage"
      @goToNextPage="goToNextPage"
      @goToLastPage="goToLastPage"
    ></c-pagination>
    <!-- PAGINATION -->

    <!-- DIALOGS -->
    <lock-dialog ref="lockDialog"></lock-dialog>
    <!-- DIALOGS -->
  </div>
</template>

<script>
import _ from 'lodash'
import CPagination from '@/components/ui/pagination/pagination'
import ServerListController from '@/mixins/ServerListController'
import ServerListBindings from '@/mixins/ServerListBindings'
import ListRow from './row'
import LockDialog from '@/views/liquidity/components/lock-liquidity/final-metamask-dialog'
import CTableHeader from '@/components/list/th'
import RecentlyLocked from './recently-locked'

export default {
  components: {
    CPagination,
    ListRow,
    LockDialog,
    CTableHeader,
    RecentlyLocked,
  },
  mixins: [ServerListController, ServerListBindings],
  data: () => ({
    items: [],
    loading: false,
    warning_alert: true,
    tab: 1,
    page: 0,
    filters: {
      rowsPerPage: 20,
      sortCol: 'trust_score',
      sortAscending: false,
      search: {
        name: '',
      },
    },
  }),
  computed: {
    network() {
      return this.$store.state.ethers.network
    },
  },
  watch: {
    'filters.search.name'() {
      this.filters.rowsPerPage = 20
    },
    'filters.sortCol'() {
      this.filters.rowsPerPage = 20
    },
    network() {
      this.loadAPI()
    },
    tab() {
      this.filters.sortCol = 'trust_score'
      this.filters.sortAscending = false
      this.loadAPI()
    },
  },
  methods: {
    onLockLiquidity(hydrated_pair) {
      // this.$refs.lockDialog.open(hydrated_pair)
      this.$router.push({ name: 'POL DAPP', params: { pair: hydrated_pair.address } })
    },
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
