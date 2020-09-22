<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['chartData', 'options'],
  methods: {
    update() {
      this.$data._chart.update()
    },
  },
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 250)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 250)
    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 250)

    this.gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
    this.gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)')

    this.gradient2.addColorStop(0, 'rgba(199, 255, 210, 0.7)')
    this.gradient2.addColorStop(0.5, 'rgba(48, 255, 89, 0.7)')

    this.gradient3.addColorStop(0, 'rgba(33, 150, 243, 0.7)')
    this.gradient3.addColorStop(0.5, 'rgba(33, 150, 243, 0.7)')

    this.chartData.datasets[0].backgroundColor[0] = this.gradient3
    this.chartData.datasets[0].backgroundColor[1] = this.gradient2
    this.chartData.datasets[0].backgroundColor[2] = this.gradient
    this.renderChart(this.chartData, this.options)
  },
}
</script>
