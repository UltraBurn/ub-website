<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <v-card>
      <div>
        <v-row class="pa-4 ma-0 font-weight-medium background align-center">
          Use the metamask extension
          <v-spacer></v-spacer>
          <v-btn @click="close" icon color="text">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <!-- Main content -->
        <div class="pa-4">
          <div class="pa-6 r-outlined">
            You are currently connected to Metamask. Please change networks in the metamask extension.
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  computed: {
    sEthers() {
      return this.$store.state.ethers
    },
  },
  methods: {
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
  },
}
</script>
