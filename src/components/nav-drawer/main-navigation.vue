<template>
  <v-navigation-drawer v-model="drawer" app clipped class="background">
    <v-list dense>
      <v-row class="justify-end ma-0 pr-2">
        <v-btn icon color="text" v-if="$vuetify.breakpoint.mobile" @click="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-row>

      <price-ticker-nav class="ml-4"></price-ticker-nav>

      <div v-if="$vuetify.breakpoint.mobile" class="text-center">
        <connect-wallet-button></connect-wallet-button>
      </div>

      <v-list-item to="/profile">
        <v-list-item-action>
          <v-icon>mdi-chart-donut</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/litepaper">
        <v-list-item-action>
          <v-icon>mdi-text-box-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Litepaper</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/web3">
        <v-list-item-action>
          <v-icon>mdi-semantic-web</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Web3</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item to="/airdrop">
        <v-list-item-action>
          <v-icon>mdi-airplane</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Airdrop</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/uniswap-browser" class="align-center">
        <v-list-item-action>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Uniswap browser</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon color="uncgreen">mdi-new-box</v-icon>
        </v-list-item-icon>
      </v-list-item> -->

      <v-list-item to="/tokenomics">
        <v-list-item-action>
          <v-icon>mdi-finance</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Tokenomics</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/token-utility" v-if="false">
        <v-list-item-action>
          <v-icon>mdi-apps</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Token utility</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- USEFUL LINKS -->
      <v-divider class="mt-4"></v-divider>

      <div class="text--text caption text-center mt-4 mb-4">
        Useful links
      </div>

      <v-list-item href="https://uniswap.exchange/swap?outputCurrency=0xf29e46887ffae92f1ff87dfe39713875da541373" target="_blank">
        <v-list-item-action>
          <v-icon>mdi-open-in-new</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Trade on Uniswap</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item href="https://etherscan.io/address/0xf29e46887ffae92f1ff87dfe39713875da541373" target="_blank">
        <v-list-item-action>
          <v-icon>mdi-open-in-new</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>View on etherscan</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item href="https://uniswap.info/pair/0x5E64CD6f84D0eE2Ad2a84CadC464184e36274E0c" target="_blank">
        <v-list-item-action>
          <v-icon>mdi-open-in-new</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>ETH-UNC Pool</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- THEME -->
      <v-divider class="mt-4"></v-divider>
      <div class="text--text caption text-center mt-4 mb-4">
        Theme
      </div>
      <v-list-item @click="changeTheme">
        <v-list-item-action>
          <v-icon>mdi-white-balance-sunny</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Change Theme</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- THEME -->

      <!-- USEFUL LINKS -->

      <!-- SOCIAL LINKS -->
      <v-divider class="mt-4"></v-divider>

      <div class="text--text caption text-center mt-4 mb-4">
        Join the community
      </div>
      <v-row class="align-center justify-center">
        <v-btn large icon color="text" href="https://twitter.com/UNC_token" target="_blank">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn large icon color="text" href="https://t.me/unc_token" target="_blank">
          <v-icon>mdi-telegram</v-icon>
        </v-btn>
        <v-btn large icon color="text" href="https://discord.gg/ZEzwNHR" target="_blank">
          <v-icon>mdi-discord</v-icon>
        </v-btn>
      </v-row>
      <!-- SOCIAL LINKS -->

      <v-divider class="mt-4"></v-divider>

      <div class="text--text caption text-center mt-3 mb-3">
        Socket:
        <span v-if="$store.state.socketConnection" class="uncgreen--text">Connected</span>
        <span v-else class="text--text">disconnected</span>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import PriceTickerNav from '@/components/price-ticker/price-ticker-nav'
import ConnectWalletButton from '@/components/ui/web3/connect-wallet-button'

export default {
  components: {
    PriceTickerNav,
    ConnectWalletButton,
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.sidebar
      },
      set(val) {
        this.$store.commit('sidebar', val)
      },
    },
    coin_metrics() {
      return this.$store.state.coin_metrics
    },
  },
  methods: {
    changeTheme() {
      var themeName = 'theme1'
      if (localStorage.getItem('theme') === 'theme1') {
        themeName = 'theme2'
      }
      this.$store.commit('setTheme', {
        themeName: themeName,
        vuetify: this.$vuetify,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-icon {
  color: var(--v-text-base);
}
.v-list .v-list-item--active,
.v-list .v-list-item--active .v-icon {
  color: var(--v-primary-base);
}
</style>
