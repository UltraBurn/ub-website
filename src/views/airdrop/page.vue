<template>
  <v-container>
    <v-row class="ma-0 mt-8 mb-8 justify-center">
      <h2 class="display-1 font-weight-bold mb-3">
        Airdrop
      </h2>
    </v-row>

    <v-card max-width="500px" class="mx-auto pa-6">
      <p>
        To qualify for the AGA airdrop simply insert your UNC wallet address or the wallet address that holds liquidity tokens in a UNC pool on
        uniswap. e.g. the ETH-UNC pool.
      </p>

      <v-text-field
        autocomplete="new-password"
        class="mt-2"
        v-model="address"
        label="Your address"
        rounded
        filled
        hide-details
        clearable
        single-line
      ></v-text-field>

      <template v-if="!address"> </template>
      <div v-else-if="!validAddress" class="pink--text">
        Address not valid
      </div>

      <div v-if="loading_balances" class="text-center mt-2 mb-2">
        <v-progress-circular :size="80" :width="4" color="primary" class="slow-progress-anim" indeterminate></v-progress-circular>
      </div>
      <template v-if="validAddress && !loading_balances">
        <div class="pt-4 pb-2 r-border-b">
          <div class="d-flex align-center">
            <div class="textMid--text caption">
              UNC Balance
            </div>

            <v-spacer></v-spacer>
            {{ uncBalanceHuman }} UNC
            <img
              :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${unc_address}/logo.png`"
              height="30px"
              width="30px"
              @error="setAltImg"
              class="ml-2"
            />
          </div>
        </div>
        <div v-if="user_held_uni_pairs.length > 0">
          <div class="textMid--text caption">
            Your approximate UNC holdings in liquidity pools
          </div>
          <list-row v-for="item in user_held_uni_pairs" :key="item.address" :user_address="address" :item="item"></list-row>
        </div>

        <div class="r-border-b pb-2 pt-2">
          <div class="d-flex align-center">
            <div class="textMid--text caption">
              Total balance
            </div>
            <v-spacer></v-spacer>
            <div class="uncgreen--text font-weight-bold mr-1">
              {{ totalUncBalanceHuman }}
            </div>
            UNC
            <img
              :src="`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${unc_address}/logo.png`"
              height="30px"
              width="30px"
              @error="setAltImg"
              class="ml-2"
            />
          </div>
        </div>
      </template>

      <div v-if="has_registered" class="pa-2 uncgreen--text r-outlined pa-4 mt-6">
        <div class="text-center">
          <v-icon size="50" color="uncgreen">mdi-check</v-icon>
        </div>
        This address is registered for the upcoming airdrop.
      </div>
      <template v-else-if="!loading_balances && validAddress && airdrop.is_active">
        <v-row v-if="Number(total_unc_balance) > 0" class="ma-0 mt-4 justify-end">
          <v-btn @click="submitAddress">
            Submit your address
          </v-btn>
        </v-row>
        <div v-else-if="validAddress" class="r-outlined pa-4 mt-2 uncgreen--text">
          To participate in this airdrop you need to be holding UNC.
        </div>
      </template>

      <div v-if="!airdrop.is_active" class="pa-2 pink--text r-outlined pa-4 mt-6">
        <div class="text-center">
          <v-icon size="50" color="pink">mdi-close-circle-outline</v-icon>
        </div>
        This airdrop is no longer accepting address submissions
      </div>

      <div></div>
      <!-- this gets its bottom border radius set to zero -->
    </v-card>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { ethers } from 'ethers'
import ERC20Contracts from '@/smart-contracts/erc20'
import UniswapContracts from '@/smart-contracts/uniswap'
import ListRow from './uni-pair'

export default {
  components: {
    ListRow,
  },
  data: () => ({
    airdrop: {
      is_active: 1,
    },
    unc_address: '0xf29e46887FFAE92f1ff87DfE39713875Da541373',
    address: '',
    unc_balance: '0',
    accepted_uni_pairs: [],
    user_held_uni_pairs: [],
    loading_balances: false,
    has_registered: false,
  }),
  watch: {
    address() {
      this.user_held_uni_pairs = []
      this.has_registered = false

      if (this.validAddress) {
        this.checkBalance()
        this.checkIfAddressHasRegisitered()
      }
    },
  },
  computed: {
    validAddress() {
      return ethers.utils.isAddress(this.address)
    },
    uncBalanceHuman() {
      var nocomma = ethers.utils.formatUnits(this.unc_balance, 18)
      return Number(nocomma).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
    total_unc_balance() {
      var balance = ethers.BigNumber.from(this.unc_balance)
      for (var item of this.user_held_uni_pairs) {
        balance = balance.add(ethers.BigNumber.from(item.approx_unc))
      }
      return balance.toString()
    },
    totalUncBalanceHuman() {
      var nocomma = ethers.utils.formatUnits(this.total_unc_balance, 18)
      return Number(nocomma).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    },
  },
  methods: {
    setAltImg(event) {
      event.target.src = require('@/assets/img/no-icon.png')
    },
    async checkBalance() {
      this.loading_balances = true
      this.unc_balance = await ERC20Contracts.getBalance(this.address, this.unc_address)
      for (var pair of this.accepted_uni_pairs) {
        pair.univ2_balance = await ERC20Contracts.getBalance(this.address, pair.address)
        if (pair.univ2_balance !== '0') {
          var univ2pair = await UniswapContracts.getPairTokens(pair.address)
          // pair.percent_of_total_supply = pair.univ2_balance / univ2pair.total_supply
          pair.percent_of_total_supply = ethers.utils.formatUnits(pair.univ2_balance, 18) / ethers.utils.formatUnits(univ2pair.total_supply, 18)
          // var one = new ethers.BigNumber.from(pair.univ2_balance).mul(new ethers.BigNumber.from(univ2pair.total_supply).sub(pair.univ2_balance))
          // pair.percent_of_total_supply = new ethers.BigNumber.from(pair.univ2_balance).div(univ2pair.total_supply).toString()
          pair.reserves = univ2pair.token0 === this.unc_address ? univ2pair.reserves[0] : univ2pair.reserves[1]
          // pair.approx_unc = new ethers.BigNumber.from(String(pair.percent_of_total_supply)).mul(pair.reserves).toString()
          var final_amount = pair.percent_of_total_supply * ethers.utils.formatUnits(pair.reserves, 18)
          pair.approx_unc = ethers.utils.parseUnits(String(Math.floor(final_amount)), 18)
        }
      }
      this.user_held_uni_pairs = this.accepted_uni_pairs.filter(item => item.univ2_balance !== '0')
      this.loading_balances = false
    },
    loadAcceptedUniPairs: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          this.loading = true

          var lockToken = `&lock_token=${this.unc_address}`
          var filters = {
            rowsPerPage: 1000,
            sortCol: 'pair',
            sortAscending: true,
            search: {
              name: '',
            },
          }

          this.$axios
            .post(`/uniswap/search?network=1${lockToken}`, { filters: filters, page: 0 })
            .then(response => {
              var rows = response.data.rows
              rows.map(item => {
                item.univ2_balance = '0'
              })
              this.accepted_uni_pairs = rows
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
    submitAddress() {
      this.$axios
        .get(`/airdrop/submit-address/${this.address}`)
        .then(response => {
          console.log(response)
          this.checkIfAddressHasRegisitered()
        })
        .catch(error => {
          console.log(error)
          this.$root.$dialog.error.open(error.response.data.errors[0])
        })
    },
    checkIfAddressHasRegisitered() {
      this.$axios
        .get(`/airdrop/has-registered/${1}/${this.address}`)
        .then(response => {
          this.has_registered = response.data
        })
        .catch(error => {
          console.log(error)
          this.$root.$dialog.error.open(error.response.data.errors[0])
        })
    },
    getAidropInfo() {
      this.$axios
        .get(`/airdrop/${1}/info`)
        .then(response => {
          this.airdrop = response.data
        })
        .catch(error => {
          console.log(error)
          this.$root.$dialog.error.open(error.response.data.errors[0])
        })
    },
  },
  created() {
    this.getAidropInfo()
    this.loadAcceptedUniPairs()
    this.address = this.$store.state.ethers.coinbase
  },
}
</script>
