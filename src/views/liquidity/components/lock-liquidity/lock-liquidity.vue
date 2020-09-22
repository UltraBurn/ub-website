<template>
  <div>
    <div v-if="false" class="textMid--text caption font-italic">
      View your rating dynamically change as you add more tokens to the locker
    </div>

    <responsive-rating-card :pair_address="pair" :extraEpochs="[extraEpoch]"></responsive-rating-card>
    <!--
    <rating-card :pair="pair" :commitToLock="amount"></rating-card>
    -->

    <div v-if="!sEthers.coinbase" class="pa-4 mt-2 text-center">
      <v-btn color="primary" @click="$root.$dialog.connectModal.open()">
        Connect Your wallet
      </v-btn>
    </div>
    <div v-else-if="!userHoldsV2Tokens" class="r-outlined pa-4 mt-2 text-center">
      Your connected wallet holds no liquidity in this pool. If you hold liquidity, please switch accounts in your wallet.
    </div>

    <div v-else>
      <input-balance class="mt-2" :amount.sync="amount" :balance.sync="holdings">
        <template v-slot:title>
          Lock
        </template>
      </input-balance>

      <div class="r-outlined pa-4 mt-2">
        <v-row class="ma-0 mb-6">
          <div class="">
            Set unlock date
          </div>
          <v-spacer></v-spacer>
          <date-picker @onDateChanged="onDatePickerChanged"></date-picker>
        </v-row>

        <v-slider v-model="date_slider" :thumb-size="24" thumb-label="always" @start="onFocus" @end="onBlur">
          <template v-slot:thumb-label="{ value }">
            {{ satisfactionEmojis[Math.min(Math.floor(value / 10), 9)] }}
          </template>
        </v-slider>

        <div v-if="unlockDateIsImmediate" class="pa-4 caption primary--text">
          You can withdraw your liquidity <strong>immediately</strong>. Unlock date is less than current time. Useful for testing withdrawl if you'd
          like before commiting higher quantities.
        </div>
        <div v-else class="pa-4 caption textMid--text">
          {{ humanUnlockDate }}
          <div class="font-italic">That is {{ dateFromNow }}</div>
        </div>

        <v-card class="pa-3 blue-gradient text-center mb-3 caption">
          <div class="wave3"></div>
          <div class="posrelative">
            For a maximal trust score set an unlock date of 1 year (or more) and lock as much liquidity as possible
            <div class="mt-2">
              <v-btn small rounded @click="useReccomendedSettings">use reccomended settings</v-btn>
            </div>
          </div>
        </v-card>

        <expansion-panel>
          <template v-slot:header="{ expand, toggle }">
            <v-row class="ma-0 justify-end">
              <v-btn @click="toggle" text small color="text" style="text-transform: none;">
                Advanced
                <v-icon small :class="{ 'rotate-180': expand }" color="text">mdi-chevron-down</v-icon>
              </v-btn>
            </v-row>
          </template>
          <template v-slot:body>
            <div class="pt-2 pb-4">
              <v-select :items="selectMonths" filled rounded single-line hide-details label="Time period" @change="onSelectMonth"></v-select>

              <div class="caption">
                Unix timestamp in seconds
              </div>
              <v-text-field
                autocomplete="new-password"
                :class="['title font-weight-regular']"
                v-model="lock_epoch"
                label="Unix timestamp in seconds"
                rounded
                hide-details
                filled
                single-line
              ></v-text-field>
            </div>
          </template>
        </expansion-panel>
      </div>

      <div class="mt-6">
        <template v-if="allowanceIncreaseNeeded">
          <v-btn rounded block x-large @click="setAllowance" color="blue" class="white--text">
            Approve
          </v-btn>
          <div class="textMid--text mt-2 caption text-center">
            We first need your approval to lock these tokens, once approved you can lock them in another transaction.
          </div>
        </template>
        <template v-if="!allowanceIncreaseNeeded">
          <v-btn rounded block x-large :disabled="!(amount > 0)" @click="confirmLockTokens" color="blue" class="white--text">
            Lock
          </v-btn>
        </template>
      </div>

      <div class="textMid--text mt-2 font-italic caption text-center">
        We charge a 0.3% fee (the same as uniswap) to use this service.
      </div>

      <!-- DIALOGS -->
      <lock-liquidity-confirm-dialog ref="lockConfirmDialog" @onApprove="lockTokens"></lock-liquidity-confirm-dialog>
      <!-- DIALOGS -->
    </div>
  </div>
</template>

<script>
import InputBalance from '@/components/ui/web3/input-balance'
import ResponsiveRatingCard from './rating-card-responsive'
import moment from 'moment'
import SmartContract from './smart-contract'
import ExpansionPanel from '@/components/ui/expansion-panel/expansion-panel'
import Erc20Contracts from '@/smart-contracts/erc20'
import TxWrapper from '@/smart-contracts/tx-wrapper'
import { ethers } from 'ethers'
import DatePicker from '@/components/select/date-picker'
import LockLiquidityConfirmDialog from './lock-liquidity-confirm-dialog'

export default {
  props: {
    pair: {
      type: String,
      default: '',
    },
  },
  components: {
    DatePicker,
    InputBalance,
    ExpansionPanel,
    ResponsiveRatingCard,
    LockLiquidityConfirmDialog,
  },
  data: () => ({
    sliderFocussed: false,
    date_slider: 50,
    two_years: moment().add(1.5, 'years'),
    allowance: 0,
    holdings: '0',
    amount: '0',
    lock_epoch: 0,
    selectMonths: ['40 secs', '1 min', '3 mins', '1 hour', '1 month', '2 months', '3 months', '6 months', '1 year', '2 years'],
    satisfactionEmojis: ['😭', '☹️', '😐', '🙂', '🙂', '😊', '😊', '😁', '😄', '😍'],
    amountError: false,
  }),
  watch: {
    sEthersWatcher() {
      this.checkBalanceAndAllowance()
    },
    date_slider(nv) {
      if (this.sliderFocussed) {
        var now = moment().unix()
        var two_years = this.two_years.unix()
        var add_epoch = (two_years - now) * (nv / 100)
        this.lock_epoch = now + Math.round(add_epoch)
      }
    },
    lock_epoch(nv) {
      var now = moment().unix()
      var two_years = this.two_years.unix()
      var max_slider_epoch = two_years - now
      var new_addition = nv - now
      var new_percent = (new_addition / max_slider_epoch) * 100
      this.date_slider = new_percent
    },
  },
  computed: {
    extraEpoch() {
      return {
        epoch: String(this.lock_epoch),
        amount: String(this.amount),
      }
    },
    userHoldsV2Tokens() {
      return Number(this.holdings) > 0
    },
    sEthers() {
      return this.$store.state.ethers
    },
    sEthersWatcher() {
      return this.sEthers.watcher
    },
    allowanceIncreaseNeeded() {
      var allowance = ethers.BigNumber.from(this.allowance || 0)
      var amount = ethers.BigNumber.from(this.amount || 0)
      return amount.gt(allowance)
      // return true
    },
    allowance18() {
      return this.allowance / Math.pow(10, 18)
    },
    balanceHuman() {
      // var tsi = this.$store.state.web3.web3Instance.utils.toWei(String(this.holdings || 0), 'ether')
      var tsi = this.holdings / Math.pow(10, 18)
      // return tsi
      if (tsi <= 1) {
        return Number(tsi).toLocaleString(undefined, { minimumFractionDigits: 18, maximumFractionDigits: 18 })
      } else {
        return Number(tsi).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })
      }
    },
    unlockDateIsImmediate() {
      if (this.lock_epoch <= moment().unix()) {
        return true
      }
      return false
    },
    humanUnlockDate() {
      return moment.unix(this.lock_epoch)
    },
    dateFromNow() {
      if (moment.unix(this.lock_epoch).isValid()) {
        return moment.unix(this.lock_epoch).fromNow()
      }
      return ''
    },
  },
  methods: {
    onFocus() {
      this.sliderFocussed = true
    },
    onBlur() {
      this.sliderFocussed = false
    },
    onDatePickerChanged(date) {
      this.lock_epoch = moment(date).unix()
    },
    onSelectMonth(time_string) {
      if (time_string === '40 secs') {
        this.lock_epoch = moment()
          .add(40, 'seconds')
          .unix()
      } else if (time_string === '1 min') {
        this.lock_epoch = moment()
          .add(1, 'minutes')
          .unix()
      } else if (time_string === '3 mins') {
        this.lock_epoch = moment()
          .add(3, 'minutes')
          .unix()
      } else if (time_string === '1 hour') {
        this.lock_epoch = moment()
          .add(1, 'hours')
          .unix()
      } else if (time_string === '1 month') {
        this.lock_epoch = moment()
          .add(1, 'months')
          .unix()
      } else if (time_string === '2 months') {
        this.lock_epoch = moment()
          .add(2, 'months')
          .unix()
      } else if (time_string === '3 months') {
        this.lock_epoch = moment()
          .add(3, 'months')
          .unix()
      } else if (time_string === '6 months') {
        this.lock_epoch = moment()
          .add(6, 'months')
          .unix()
      } else if (time_string === '1 year') {
        this.lock_epoch = moment()
          .add(1, 'years')
          .unix()
      } else if (time_string === '2 years') {
        this.lock_epoch = moment()
          .add(2, 'years')
          .unix()
      }
    },
    useReccomendedSettings() {
      this.onSelectMonth('1 year')
      this.amount = this.holdings
    },
    async setAllowance() {
      TxWrapper.doTransaction(SmartContract.setAllowance(this.pair, this.amount), this.$root.$dialog.confirmTransaction)
        .then(() => {
          this.checkBalanceAndAllowance()
        })
        .catch(e => {
          this.$root.$dialog.web3Error.open(e)
        })
    },
    confirmLockTokens() {
      this.$refs.lockConfirmDialog.open(this.lock_epoch)
    },
    async lockTokens() {
      TxWrapper.doTransaction(SmartContract.lockLiquidity(this.pair, this.amount, this.lock_epoch), this.$root.$dialog.confirmTransaction)
        .then(() => {
          this.checkBalanceAndAllowance()
        })
        .catch(e => {
          this.$root.$dialog.web3Error.open(e)
        })
    },
    getBalance() {
      Erc20Contracts.getBalance(this.sEthers.coinbase, this.pair)
        .then(balance => {
          this.holdings = balance
        })
        .catch(error => {
          console.log(error)
          this.holdings = '0'
        })
    },
    getAllowance() {
      SmartContract.getAllowance(this.$store.state.ethers.coinbase, this.pair).then(allowance => {
        this.allowance = allowance
      })
    },
    checkBalanceAndAllowance() {
      this.getAllowance()
      this.getBalance()
    },
  },
  created() {
    this.lock_epoch = moment()
      .add(1, 'years')
      .unix()
    this.checkBalanceAndAllowance()
    /* 
    const locker_address = '0x3E6EcdBbF9939C0Aa1ea6A2DDf9014b25d7dc830'
    const locker_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"Received","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"onDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"onWithdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calculateFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlock_date","type":"uint256"}],"name":"depositToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256[]","name":"dates","type":"uint256[]"}],"name":"depositTokenMultipleEpochs","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"feeDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeNumerator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeReserveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getTokenReleaseAtIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getTokenReleaseLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"getUserTokenInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getUserVestingAtIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"getWithdrawableBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lockedTokenLookup","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockedTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockedTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numerator","type":"uint256"},{"internalType":"uint256","name":"denominator","type":"uint256"}],"name":"updateFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
    const contract = new ethers.Contract(locker_address, locker_abi, this.sEthers.provider)
    contract.on("onDeposit", (token, amount, date) => {
      console.log('New deposit!!')
      console.log(token)
      console.log(amount)
      console.log(date)
    }); */
  },
}
</script>
