// Pagination, checkbox controllers, sorting.
import Vue from 'vue'
export default {
  data() {
    return {
      items: [],
      pagination: {
        rowCount: 0,
        pages: 0,
      },
      selected: {},
    }
  },
  computed: {
    selectedCount() {
      return Object.values(this.selected).reduce((a, i) => a + (i === true), 0)
    },
  },
  methods: {
    goToFirstPage() {
      this.page = 0
      this.loadAPI()
    },
    goToLastPage() {
      this.page = this.pagination.pages - 1
      this.loadAPI()
    },
    goToNextPage() {
      this.page++
      this.loadAPI()
    },
    goToPreviousPage() {
      this.page--
      this.loadAPI()
    },
    updatePageNumber(newPageNumber) {
      var newPage = newPageNumber
      if (!Number.isInteger(newPage)) {
        newPage = 0
      } else if (newPage < 0) {
        newPage = 0
      } else if (newPage > this.pagination.pages - 1) {
        newPage = this.pagination.pages - 1
      }

      this.page = parseInt(newPage)
      this.loadAPI()
    },
    getSelectedRows() {
      // get
      return Object.entries(this.selected).reduce((a, i) => {
        if (i[1]) {
          a.push(parseInt(i[0]))
        }
        return a
      }, [])
    },
    selectAll() {
      for (var item of this.items) {
        Vue.set(this.selected, item.id, true)
      }
    },
    selectPage() {
      for (var item of this.items) {
        Vue.set(this.selected, item.id, true)
      }
    },
    selectNone() {
      this.selected = {}
    },
    checkRow(item) {
      Vue.set(this.selected, item.id, !this.selected[item.id])
    },
    clickSortHeader(column) {
      if (this.filters.sortCol !== column) {
        this.filters.sortAscending = false
      } else {
        this.filters.sortAscending = !this.filters.sortAscending
      }
      this.filters.sortCol = column
    },
  },
}
