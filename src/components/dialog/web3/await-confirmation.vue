<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <v-card>
      <v-row class="ma-0 pa-4 headline font-weight-medium">
        Awaiting confirmation
        <v-spacer></v-spacer>
        <v-btn color="text" icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-card-text>
        <div class="text-center mt-2 mb-2">
          <v-progress-circular :size="140" :width="7" color="primary" class="slow-progress-anim" indeterminate></v-progress-circular>
        </div>
        <div class="text-center">
          Please confirm this transaction in your wallet
        </div>
      </v-card-text>
      <v-card-actions v-if="false">
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
        <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
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
