// filter clearing, filter watcher to reload api, filter active status feedback like activeFilterCount and searchIsActive
// used when ServerListRouteBindings is NOT used
export default {
  data() {
    return {
      pauseWatcher: false,
    }
  },
  computed: {
    activeFilterCount() {
      return Object.values(this.filters.active).reduce((a, value) => {
        if (value) {
          a++
        }
        return a
      }, 0)
    },
    searchIsActive() {
      for (var item of Object.values(this.filters.search)) {
        if (typeof item === 'string' && item.length > 0) {
          return true
        }
      }
      return false
    },
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (this.pauseWatcher) {
          return
        }
        this.page = 0
        this.loadAPI()
      },
    },
  },
  methods: {
    clearFilters() {
      Object.keys(this.filters.active).forEach(key => {
        this.filters.active[key] = false
      })
    },
  },
}
