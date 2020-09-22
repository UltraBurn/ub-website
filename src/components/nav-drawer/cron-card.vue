<template>
  <div>
    Cron jobs

    <div>
      {{ cron_row }}
    </div>
    <div>
      <v-switch v-model="cron_jobs_active" @change="setCronStatus"></v-switch>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apiKey: {
      type: String,
      default: '',
    },
  },
  components: {},
  data: () => ({
    cron_jobs_active: true,
    cron_row: {},
  }),
  methods: {
    loadAPI() {
      this.$axios
        .get(`/cron/status`)
        .then(response => {
          this.cron_row = response.data
          this.cron_jobs_active = Number(this.cron_row._value)
        })
        .catch(error => {
          console.log(error)
        })
    },

    setCronStatus() {
      console.log(this.cron_jobs_active)
      this.$axios
        .post(`/cron/status`, { apiKey: this.apiKey, run_cronjobs: this.cron_jobs_active })
        .then(response => {
          // this.cron_row = reponse.data
          console.log(response)
          this.loadAPI()
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  created() {
    this.loadAPI()
  },
}
</script>
