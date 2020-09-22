<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartData', 'options'],
  methods: {
    update() {
      this.$data._chart.update()
    },
  },
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 250)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 800)
    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 250)

    this.gradient.addColorStop(0, 'rgba(217, 0, 126, 0.7)')
    this.gradient.addColorStop(0.5, 'rgba(217, 0, 126, 0.7)')

    this.gradient2.addColorStop(0, 'rgba(82, 151, 248, 0.7)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 210, 189, 0)')

    this.gradient3.addColorStop(0, 'rgba(33, 150, 243, 0.7)')
    this.gradient3.addColorStop(0.5, 'rgba(33, 150, 243, 0.7)')

    this.chartData.datasets[0].backgroundColor = this.gradient2
    // this.chartData.datasets[0].backgroundColor[1] = this.gradient2
    // this.chartData.datasets[0].backgroundColor[2] = this.gradient
    this.renderChart(this.chartData, this.options)
  },
}
</script>
