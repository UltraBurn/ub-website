<template>
  <div>
    <donut-chart ref="donut_chart" :chartData="chartData" :options="options"> </donut-chart>
  </div>
</template>

<script>
import DonutChart from './donut-wrapper'
export default {
  components: {
    DonutChart,
  },
  props: {
    totalSupply: null,
    holdings: null,
    lockedLiquidity: null,
  },
  data: () => ({
    chartData: {
      labels: [],
      datasets: [
        {
          backgroundColor: ['rgba(255,255,255,0.2)', '#9CED44'],
          borderWidth: [0, 0, 0],
          data: [0, 0, 1],
        },
      ],
    },
    options: {
      tooltips: {
        enabled: false,
      },
      cutoutPercentage: 75,
      responsive: true,
      maintainAspectRatio: true, // obey specified height
      legend: {
        labels: {
          fontColor: 'white',
        },
      },
      animation: {
        animateRotate: false,
        // render: false,
      },
    },
  }),
  computed: {
    combinedWatcher() {
      return this.holdings + '|' + this.totalSupply + '|' + this.lockedLiquidity
    },
  },
  watch: {
    combinedWatcher() {
      this.updateChart()
    },
  },
  methods: {
    updateChart() {
      var totalSupply = this.totalSupply / Math.pow(10, 18)
      var holdings = this.holdings / Math.pow(10, 18)
      var lockedLiquidity = this.lockedLiquidity / Math.pow(10, 18)
      var remaining = totalSupply - (holdings + lockedLiquidity)
      /* if (holdings * totalSupply == 0) {
        remaining = 1
      } */
      this.chartData.datasets[0].data[0] = holdings
      this.chartData.datasets[0].data[1] = lockedLiquidity
      this.chartData.datasets[0].data[2] = remaining
      this.$refs.donut_chart.update()
    },
  },
  mounted() {
    this.updateChart()
  },
}
</script>
