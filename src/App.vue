<template>
  <v-app>
    <main-navigation></main-navigation>
    <v-app-bar app clipped-left color="background" dark>
      <v-btn icon @click="drawer = !drawer" color="text">
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>

      <div class="d-flex align-center">
        <!--
        <v-img
          :src="require('@/assets/img/logo.svg')"
          class="my-3"
          contain
          height="50"
        />
        -->

        <img @click="clickTitle" src="@/assets/img/logo.jpg" alt="UCR logo" height="30px" class="mr-2" />

        <span class="font-weight-bold headline text--text">
          {{ $vuetify.breakpoint.mobile ? 'UB' : 'UltraBurn' }}
        </span>
      </div>

      <v-btn v-if="showSuperUserButton" icon @click="toggleSuperNav" color="text">
        <v-icon>
          mdi-power
        </v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <template v-if="!$vuetify.breakpoint.mobile">
        <connect-wallet-button></connect-wallet-button>
        <pending-tx class="mr-2"></pending-tx>
      </template>

      <price-ticker-mini></price-ticker-mini>
      <pending-tx-mobile v-if="$vuetify.breakpoint.mobile"></pending-tx-mobile>

      <v-btn
        v-if="false"
        rounded
        color="green"
        class="mr-2 white--text gradient-button"
        href="https://uniswap.exchange/swap?outputCurrency=0xf29e46887FFAE92f1ff87DfE39713875Da541373"
        target="_blank"
      >
        UniSwap
      </v-btn>

      <span class="mr-2"></span>
    </v-app-bar>

    <v-fab-transition>
      <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom small right class="uncgreen" @click="toTop">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>

    <mobile-profile-fab v-if="$vuetify.breakpoint.mobile"></mobile-profile-fab>

    <!-- Sizes your content based upon application components -->
    <v-main class="background">
      <!-- Provides the application the proper gutter -->
      <div class="gradientt-background" style="height: 100%;">
        <keep-alive include="UniswapBrowser">
          <router-view></router-view>
        </keep-alive>
        <div style="padding-top: 100px;"></div>
      </div>
    </v-main>

    <v-footer v-if="false" color="midground" absolute>
      <v-row class="ma-0 pa-0 text--text justify-center">
        <v-icon small color="white">mdi-copyright</v-icon>
        <div class="ml-1 mr-1">Copyright.</div>
        <!-- <img src="@/assets/img/unicorn-green.svg" alt="UCR logo" width="22px" class="ml-2 mr-2"> -->
        <span class="font-weight-bold">UltraBurn</span>.it | hello@ultraburn.it
      </v-row>
    </v-footer>

    <v-snackbar v-model="snackWithButtons" :timeout="timeout" bottom left class="snack">
      {{ snackWithBtnText }}
      <v-spacer />
      <v-btn text color="white" @click="snackWithButtons = false">
        Dismiss
      </v-btn>
      <v-btn dark class="gradient-button" @click.native="refreshApp">
        {{ snackBtnText }}
      </v-btn>
    </v-snackbar>

    <!-- DIALOGS -->
    <connect-modal ref="connectModal"></connect-modal>
    <confirm-transaction ref="confirmTransaction"></confirm-transaction>
    <web-3-error ref="web3Error"></web-3-error>
    <global-error-dialog ref="globalErrorDialog"></global-error-dialog>
    <!-- DIALOGS -->

    <!-- SUPER NAV -->
    <super-nav ref="superNav"></super-nav>
    <!-- SUPER NAV -->
  </v-app>
</template>

<script>
import Vue from 'vue'
import WebSocketClient from '@/plugins/websocket.js'
import SuperWebSocket from '@/plugins/websocket-superuser.js'
import MainNavigation from '@/components/nav-drawer/main-navigation.vue'
import PriceTickerMini from '@/components/price-ticker/price-ticker-mini.vue'
import PendingTx from '@/components/ui/web3/tx/pending-tx.vue'
import PendingTxMobile from '@/components/ui/web3/tx/pending-tx-mobile.vue'
import ConnectModal from './components/ui/web3/connect-to-wallet'
import { ethers } from 'ethers'
import ConfirmTransaction from '@/components/dialog/web3/await-confirmation'
import Web3Error from '@/components/dialog/web3/error-message'
import GlobalErrorDialog from '@/components/dialog/global/error'
import ConnectWalletButton from '@/components/ui/web3/connect-wallet-button'
import moment from 'moment'
import SuperNav from '@/components/nav-drawer/super-nav'
import ConnectWeb3 from '@/components/ui/web3/connect-web3'
import MobileProfileFab from '@/views/profile/profile-fab'
import ERC20Contracts from '@/smart-contracts/erc20'

export default {
  name: 'App',

  components: {
    MainNavigation,
    PriceTickerMini,
    PendingTx,
    PendingTxMobile,
    ConnectModal,
    ConfirmTransaction,
    Web3Error,
    ConnectWalletButton,
    SuperNav,
    GlobalErrorDialog,
    MobileProfileFab,
  },

  data: () => ({
    fab: false,
    // PWA settings
    refreshing: false,
    registration: null,
    snackBtnText: '',
    snackWithBtnText: '',
    snackWithButtons: false,
    timeout: 0,
    titleClicks: [],
    showSuperUserButton: false,
    // end PWA settings
  }),

  computed: {
    sEthers() {
      return this.$store.state.ethers
    },
    drawer: {
      get() {
        return this.$store.state.sidebar
      },
      set(val) {
        this.$store.commit('sidebar', val)
      },
    },
  },

  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop() {
      this.$vuetify.goTo(0)
    },
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail
      this.snackBtnText = 'Refresh'
      this.snackWithBtnText = 'New version available!'
      this.snackWithButtons = true
    },
    refreshApp() {
      this.snackWithButtons = false
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return
      }
      this.registration.waiting.postMessage('skipWaiting')
    },
    clickTitle() {
      if (this.titleClicks.length == 8) {
        this.titleClicks.shift()
      }
      this.titleClicks.push(moment().unix())
      this.toggleSuperUser()
    },
    toggleSuperUser() {
      if (this.titleClicks.length !== 8) {
        return
      }
      /* if (this.showSuperUserButton) {
        this.showSuperUserButton = false
        return
      } */
      var moment1 = this.titleClicks[0]
      if (
        moment1 >
        moment()
          .subtract(2, 'seconds')
          .unix()
      ) {
        this.showSuperUserButton = true
      }
    },
    toggleSuperNav() {
      this.$refs.superNav.toggle()
    },
    attemptAutoConnect() {
      /* window.web3.eth.getAccounts((error, accounts) => {
        alert(accounts)
      }) */

      ConnectWeb3.connectToMobileWallet()
    },
    async getUNCbalance() {
      console.log('Running')
      var tokenAddress = '0xf29e46887FFAE92f1ff87DfE39713875Da541373' //UNC
      var coinbase = this.sEthers.coinbase

      if (coinbase) {
        var balance = await ERC20Contracts.getBalance(coinbase, tokenAddress)
        this.$store.commit('updateEthers', {
          unc_balance: balance,
        })
      }
    },
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.refreshApp, { once: true })
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })

    if (this.$vuetify.breakpoint.mobile) {
      this.attemptAutoConnect()
    }

    var homesteadProvider = ethers.getDefaultProvider('homestead')
    this.$store.commit('updateEthers', {
      provider: homesteadProvider,
      network: 1,
    })
  },
  mounted() {
    this.$root.$dialog = {}
    this.$root.$dialog.confirmTransaction = this.$refs.confirmTransaction
    this.$root.$dialog.web3Error = this.$refs.web3Error
    this.$root.$dialog.error = this.$refs.globalErrorDialog
    this.$root.$dialog.connectModal = this.$refs.connectModal

    Vue.prototype.$socket = new WebSocketClient()
    Vue.prototype.$socket_super = new SuperWebSocket()
  },
}
</script>
