<template>
  <div class="r-outlined pa-4">
    <v-row class="ma-0 pb-2">
      <div>
        <slot name="title">
          Deposit
        </slot>
      </div>
      <v-spacer></v-spacer>
      <div class="font-weight-medium textMid--text caption">Balance: {{ totalBalanceHuman }}</div>
    </v-row>
    <v-row class="ma-0 align-center">
      <c-input :value.sync="readableAmount" class="title" placeholder="0.0"></c-input>
      <v-btn @click="useMax" outlined color="blue" small>
        Max
      </v-btn>
      <div class="text--text title ml-2">
        UNI-V2
      </div>
    </v-row>
    <div v-if="amountError" class="red--text caption">
      Enter a number with a single decimal '.' only
    </div>
    <v-row class="ma-0 mt-2">
      <v-btn @click="setPercentage(25)" outlined color="textMid" x-small class="ml-1 mr-1">
        25%
      </v-btn>
      <v-btn @click="setPercentage(50)" outlined color="textMid" x-small class="ml-1 mr-1">
        50%
      </v-btn>
      <v-btn @click="setPercentage(75)" outlined color="textMid" x-small class="ml-1 mr-1">
        75%
      </v-btn>
      <v-btn @click="useMax" outlined color="textMid" x-small class="ml-1 mr-1">
        100%
      </v-btn>
    </v-row>

    <div v-if="false" class="caption textMid--text">
      {{ amount }}
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import CInput from '@/components/ui/input/input'

export default {
  props: {
    balance: {
      type: String,
      default: '',
    },
    amount: {
      type: String,
      default: '',
    },
  },
  components: {
    CInput,
  },
  data: () => ({
    readableAmount: '0',
    amountError: false,
  }),
  computed: {
    totalBalanceHuman() {
      var balance = this.balance / Math.pow(10, 18)
      return balance
    },
  },
  watch: {
    amount(nv) {
      var smaller = Web3.utils.fromWei(nv, 'ether')
      this.readableAmount = smaller
    },
    readableAmount(nv) {
      try {
        this.amountError = false
        var trueAmount = Web3.utils.toWei(String(nv || 0), 'ether')
        this.$emit('update:amount', trueAmount)
      } catch (e) {
        this.amountError = true
      }
    },
  },
  methods: {
    useMax() {
      this.$emit('update:amount', this.balance)
    },
    setPercentage(percentage) {
      var amount = new Web3.utils.toBN(this.balance).mul(new Web3.utils.toBN(percentage)).div(new Web3.utils.toBN(100))
      this.$emit('update:amount', amount.toString())
    },
  },
}
</script>
