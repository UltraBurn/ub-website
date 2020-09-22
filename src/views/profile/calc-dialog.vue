<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <v-card>
      <div>
        <v-row class="pa-4 ma-0 font-weight-medium background align-center">
          <v-spacer></v-spacer>

          <v-btn @click="close" icon color="text">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <!-- Main content -->
        <div>
          <calculator></calculator>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Calculator from './calculator'

export default {
  components: {
    Calculator,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {},
  watch: {},
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
