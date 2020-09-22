<template>
  <th :class="['cursor-pointer unselectable', filters.sortCol === code ? 'text--text' : 'textMid--text']">
    <!-- padding: 8px 12px 8px 16px; -->
    <v-layout v-ripple @click="$emit('onClick', code)" :class="['sort-button']" style="">
      {{ title }}
      <v-icon
        small
        :color="filters.sortCol === code ? 'text' : 'textMid'"
        :class="['sort-arrow', { 'rotate-180': filters.sortCol === code && filters.sortAscending }, { visible: filters.sortCol === code }]"
      >
        mdi-chevron-down
      </v-icon>
    </v-layout>

    <!-- ONLY ADD THIS IF ALLOWING DRAG MODE -->
    <div v-if="showHandle" class="handle" @mousedown="$emit('startColDrag', $event)"></div>
  </th>
</template>

<script>
export default {
  props: {
    title: String,
    code: String,
    filters: Object,
    showHandle: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
