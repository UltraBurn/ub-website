<template>
  <div>
    <v-menu :close-on-content-click="false" v-model="bestBeforeMenu" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
      <template v-slot:activator="{ on }">
        <v-btn icon color="text" v-on="on">
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>

      <v-date-picker v-model="pickerDate" dark @input="$emit('onDateChanged', $event)" no-title color=""></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['date'],
  data() {
    return {
      focussed: false,
      textDate: null,
      pickerDate: null,
      bestBeforeMenu: false,
      showBorder: true,
    }
  },
  computed: {
    dateValid() {
      return moment(this.textDate, 'DD/MM/YYYY', true).isValid()
    },
  },
  watch: {
    date: {
      immediate: true,
      handler(nv) {
        // this is exactly as your db will give it to you
        if (moment(nv, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', true).isValid()) {
          this.textDate = moment(nv, 'YYYY-MM-DD').format('DD/MM/YYYY')
        }
        if (!this.focussed) {
          // triggered when using picker
          if (moment(nv, 'YYYY-MM-DD', true).isValid()) {
            this.textDate = moment(nv, 'YYYY-MM-DD').format('DD/MM/YYYY')
          }
        }

        var minDate = moment('1000-01-01', 'YYYY-MM-DD')
        if (moment(nv, 'YYYY-MM-DD', true).isValid() && moment(nv, 'YYYY-MM-DD', true).isAfter(minDate)) {
          this.pickerDate = nv
        }
      },
    },
    textDate: {
      handler(nv) {
        if (moment(nv, 'DD/MM/YYYY', true).isValid()) {
          this.$emit('update:date', moment(nv, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
        } else {
          this.$emit('update:date', null)
        }
      },
    },
    pickerDate: {
      handler(nv) {
        this.$emit('update:date', nv)
      },
    },
  },
  methods: {
    onBlur() {
      this.focussed = false
      // this will clear whats left in the text field when blurring if invalid e.g. "5/"
      if (!moment(this.textDate, 'DD/MM/YYYY', true).isValid()) {
        this.textDate = null
      }
    },
    showMenu() {
      this.bestBeforeMenu = true
    },
  },
}
</script>

<style scoped>
.mod-parent {
  flex-direction: row;
  align-items: center;
}
</style>
