<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ on }">
      <v-chip outlined v-on="on" color="textMid">
        <v-progress-circular
          v-if="pendingTx.length > 0"
          :size="25"
          :width="3"
          color="primary"
          class="slow-progress-anim mr-2"
          indeterminate
        ></v-progress-circular>
        <span class="caption text--text"> {{ pendingTx.length }} pending tx </span>
      </v-chip>
    </template>

    <v-list>
      <template v-if="txList.length > 0">
        <tx-row v-for="item in txList" :key="item.txhash" :item="item"> </tx-row>
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
      return Object.values(this.$store.state.pendingTx.tx).filter(item => item.state === 'pending')
    },
    txList() {
      return Object.values(this.$store.state.pendingTx.tx).sort((a, b) => b.created - a.created)
    },
  },
}
</script>
