<template>
  <div>
    <line-chart ref="line_chart" :chartData="chartData" :options="options"> </line-chart>
  </div>
</template>

<script>
import LineChart from './line-wrapper'
export default {
  components: {
    LineChart,
  },
  props: {
    yData: null,
  },
  data: () => ({
    chartData: {
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          borderWidth: [0, 0, 0],
          data: [0, 0, 1],
          steppedLine: true,
        },
      ],
    },
    options: {
      tooltips: {
        enabled: true,
      },
      responsive: true,
      maintainAspectRatio: false, // obey specified height
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                month: 'MMM YYYY',
                day: 'MMM D',
              },
            },
          },
        ],
      },
      legend: false,
    },
  }),
  computed: {
    combinedWatcher() {
      return false
    },
  },
  watch: {
    yData() {
      this.updateChart()
    },
  },
  methods: {
    updateChart() {
      var alteredArr = JSON.parse(JSON.stringify(this.yData))
      var lastItemAmount = '0'
      for (var item of alteredArr) {
        var newitem = Number(item.y) + Number(lastItemAmount)
        item.y = newitem
        lastItemAmount = item.y
      }
      this.chartData.datasets[0].data = alteredArr
      this.options.scales.xAxes[0].time.unit = 'month'
      this.$refs.line_chart.update()
    },
  },
  mounted() {
    this.updateChart()
  },
}
</script>
