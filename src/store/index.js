import Vue from 'vue'
import Vuex from 'vuex'
// import getWeb3 from '../plugins/getWeb3';
// import pollWeb3 from '../plugins/pollWeb3';
import themes from '@/plugins/themes.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebar: true,
    socketConnection: false,
    user_wallet: localStorage.getItem('user_wallet') || '',
    coin_metrics: {
      last_trade: {
        price: 0,
      },
    },
    pendingTx: {
      pending: [], //[txhash, txhash]
      tx: {},
    },
    web3: {
      network: 1, // default to mainnet
      connectionName: null,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      coinbase_condensed: null, //e.g. 0x1234...1234
      balance: null,
      error: null,
      watcher: null, // watch this for changes to network or coinbase
    },
    ethers: {
      coinbase: null,
      coinbase_condensed: null,
      providerName: null, // Metamask, Coinbase
      provider: null,
      signer: null,
      network: 1,
      watcher: null, // watch this for changes to network or coinbase
      unc_balance: '0',
    },
    superSocket: {
      connected: false,
      log: [],
    },
  },
  mutations: {
    setTheme(state, { themeName, vuetify }) {
      state.theme = themeName
      vuetify.theme.setTheme('light', themes[themeName].light)
      // vuetify.theme.setTheme('dark', themes[themeName].themes.dark)
      // vuetify.theme.light = themeDark
      localStorage.setItem('theme', themeName)
      // localStorage.setItem('themeDark', themeDark)
      // vuetify.framework.theme.themes = themes[themeName].vuetifyTheme
    },
    sidebar(state, val) {
      state.sidebar = val
    },
    user_wallet(state, val) {
      state.user_wallet = val
      localStorage.setItem('user_wallet', val)
    },
    coin_metrics(state, val) {
      state.coin_metrics = val
    },
    SOCKET_CONNECT: state => {
      state.socketConnection = true
    },
    SOCKET_DISCONNECT: state => {
      state.socketConnection = false
    },
    updateWeb3(state, payload) {
      state.web3 = Object.assign(state.web3, payload)
      state.web3.watcher = state.web3.coinbase + state.web3.network
      if ((state.web3.coinbase || '').length === 42) {
        state.web3.coinbase_condensed = state.web3.coinbase.slice(0, 6) + '...' + state.web3.coinbase.slice(state.web3.coinbase.length - 4)
      }
      // pollWeb3()
    },
    updateEthers(state, payload) {
      state.ethers = Object.assign(state.ethers, payload)
      state.ethers.watcher = state.ethers.coinbase + state.ethers.network
      if ((state.ethers.coinbase || '').length === 42) {
        state.ethers.coinbase_condensed = state.ethers.coinbase.slice(0, 6) + '...' + state.ethers.coinbase.slice(state.ethers.coinbase.length - 4)
      } else {
        state.ethers.coinbase_condensed = null
      }
    },
    addPendingTx(state, txhash) {
      state.pendingTx.pending.push(txhash)

      var item = {
        created: Date.now(),
        txhash: txhash,
        state: 'pending',
      }
      Vue.set(state.pendingTx.tx, txhash, item)
    },
    completePendingTx(state, txhash) {
      state.pendingTx.pending = state.pendingTx.pending.filter(item => item !== txhash)
      state.pendingTx.tx[txhash].state = 'completed'
    },
    failPendingTx(state, txhash) {
      state.pendingTx.pending = state.pendingTx.pending.filter(item => item !== txhash)
      if (state.pendingTx.tx[txhash]) {
        state.pendingTx.tx[txhash].state = 'failed'
      }
    },
    addSuperSocketLogEntry(state, msg) {
      state.superSocket.log.push(msg)
    },
    clearSuperLog(state) {
      state.superSocket.log = []
    },
    setSuperSocketConnectionStatus(state, isConnected) {
      state.superSocket.connected = isConnected
    },
  },
  modules: {},
  actions: {
    fetchCoinMetrics: ({ commit }) => {
      return Vue.prototype.$axios.get('/unc').then(response => {
        commit('coin_metrics', response.data)
      })
    },
    syncAllData: ({ dispatch }) => {
      return Promise.all([
        dispatch('fetchCoinMetrics'),
        // dispatch('db/currencyRates/fetchAll'),
      ])
    },
  },
})
