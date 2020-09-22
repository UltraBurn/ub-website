<template>
  <v-menu offset-y open-on-hover bottom v-if="txList.length > 0">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" fab small color="foreground">
        <v-progress-circular
          v-if="pendingTx.length > 0"
          :size="20"
          :width="3"
          color="primary"
          class="slow-progress-anim"
          indeterminate
        ></v-progress-circular>
        <template v-else>
          <v-icon v-if="lastTX.state === 'completed'" color="green">mdi-check</v-icon>
          <v-icon v-else-if="lastTX.state === 'failed'" color="red">mdi-close</v-icon>
        </template>
      </v-btn>
    </template>

    <v-list class="foreground">
      <div class="caption pa-2 textMid--text">
        Pending transactions
      </div>
      <template v-if="txListSorted.length > 0">
        <tx-row v-for="item in txListSorted" :key="item.txhash" :item="item"> </tx-row>
      </template>
      <div v-else class="pa-3 textMid--text caption">
        No recent transactions
      </div>
    </v-list>
  </v-menu>
</template>

<script>
import TxRow from './tx-row'

export default {
  components: {
    TxRow,
  },
  computed: {
    pendingTx() {
      return this.txList.filter(item => item.state === 'pending')
    },
    txList() {
      return Object.values(this.$store.state.pendingTx.tx)
    },
    txListSorted() {
      var copy = JSON.parse(JSON.stringify(this.txList))
      return copy.sort((a, b) => b.created - a.created)
    },
    lastTX() {
      return this.txList[this.txList.length - 1] || {}
    },
  },
}
</script>
