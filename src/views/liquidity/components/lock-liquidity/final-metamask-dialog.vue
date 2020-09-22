<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="500">
    <v-card>
      <v-row class="ma-0 pa-2 justify-end">
        <v-btn icon @click="close" color="text">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-card-text>
        <div class="pa-4">
          <final-metamask :pair="hydrated_pair" :key="nonce"></final-metamask>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import FinalMetamask from './final-metamask'
export default {
  components: {
    FinalMetamask,
  },
  data: () => ({
    dialog: false,
    hydrated_pair: {},
    nonce: 0,
  }),
  methods: {
    open(hydrated_pair) {
      this.nonce++
      this.hydrated_pair = hydrated_pair
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
  },
}
</script>
