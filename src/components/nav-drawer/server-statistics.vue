<template>
  <div>
    <!-- MAIN CONTENT -->
    <div>
      <v-card class="ma-4 pa-2">
        <div class="title">
          MYSQL
        </div>
        <v-btn icon color="text" @click="getMysqlStats">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <div v-for="statistic of Object.keys(json)" :key="statistic">
          <span>{{ statistic }}</span
          >: <span>{{ json[statistic] }}</span>
        </div>
        <v-layout>
          Load:&nbsp;
          <span class="font-weight-bold green--text"> {{ healthPercent }}% </span>
        </v-layout>
      </v-card>

      <v-card class="ma-4 pa-2">
        <div class="title">
          Lets encrypt -- certbot
        </div>
        {{ letsEncrypt }}
      </v-card>
    </div>
    <!-- END MAIN CONTENT -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      json: {},
      letsEncrypt: '',
    }
  },
  computed: {
    healthPercent() {
      return ((this.json.allConnections - this.json.freeConnections) / this.json.connectionLimit) * 100
    },
  },
  methods: {
    getLetsEncrypt() {
      this.$axios
        .get('/server-stats/lets-encrypt')
        .then(response => {
          console.log('---------------')
          console.log(response)
          console.log(response.data)
          this.letsEncrypt = response.data
        })
        .catch(error => this.$root.$errorSnackbar(error))
    },
    getMysqlStats() {
      this.$axios
        .get('/server-stats/pool')
        .then(response => {
          this.json = response.data
        })
        .catch(error => this.$root.$errorSnackbar(error))
    },
  },
  created() {
    this.getLetsEncrypt()
    this.getMysqlStats()
  },
}
</script>
