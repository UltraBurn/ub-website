<template>
  <v-list-item>
    <v-list-item-title>
      <v-progress-circular
        v-if="item.state === 'pending'"
        :size="25"
        :width="3"
        color="primary"
        class="slow-progress-anim mr-2"
        indeterminate
      ></v-progress-circular>
      <v-icon v-else-if="item.state === 'completed'" color="green">mdi-check</v-icon>
      <v-icon v-else-if="item.state === 'failed'" color="red">mdi-close</v-icon>

      <span class="caption">
        {{ condensed_tx }}
      </span>

      <v-tooltip bottom open-delay="200">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon small color="textMid" :href="`${StaticMap.etherscan[$store.state.web3.network]}/tx/${item.txhash}`" target="_blank">
            <v-icon small>mdi-open-in-new</v-icon>
          </v-btn>
        </template>
        <span>View on etherscan</span>
      </v-tooltip>
    </v-list-item-title>
  </v-list-item>
</template>

<script>
import StaticMap from '@/static/maps'

export default {
  props: {
    item: null,
  },
  data: () => ({
    StaticMap: StaticMap,
  }),
  computed: {
    condensed_tx() {
      if ((this.item.txhash || '').length > 20) {
        return this.item.txhash.slice(0, 6) + '...' + this.item.txhash.slice(this.item.txhash.length - 4)
      }
      return this.item.txhash
    },
  },
}
</script>
