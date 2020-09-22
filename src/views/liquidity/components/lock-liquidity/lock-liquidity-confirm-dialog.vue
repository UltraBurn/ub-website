<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <v-card>
      <v-row class="ma-0 pa-4 headline font-weight-medium">
        Attention
        <v-spacer></v-spacer>
        <v-btn color="text" icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-card-text>
        <div>
          This action will lock your right to redeem your liquidity on uniswap untill
        </div>
        <div class="text-center mt-2 mb-2">
          <div class="pa-4 caption textMid--text">
            {{ humanUnlockDate }}
            <div class="font-italic">That is {{ dateFromNow }}</div>
          </div>
        </div>

        <div>
          Once locked, you cannot undo this transaction or withdraw your balance untill the above time has elapsed.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="onApprove">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    dialog: false,
    unlock_date: 0,
  }),
  computed: {
    humanUnlockDate() {
      return moment.unix(this.unlock_date)
    },
    dateFromNow() {
      if (moment.unix(this.unlock_date).isValid()) {
        return moment.unix(this.unlock_date).fromNow()
      }
      return ''
    },
  },
  methods: {
    open(unlock_date) {
      this.unlock_date = unlock_date
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    onApprove() {
      this.dialog = false
      this.$emit('onApprove')
    },
  },
}
</script>
