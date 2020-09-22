<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <v-card>
      <v-row class="ma-0 pa-4 headline font-weight-medium">
        Error
        <v-spacer></v-spacer>
        <v-btn color="text" icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-card-text>
        <div class="text-center r-outlined pa-4">
          {{ error_message }}
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    error_message: '',
  }),
  methods: {
    open(error_message) {
      this.error_message = error_message
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
  },
}
</script>
