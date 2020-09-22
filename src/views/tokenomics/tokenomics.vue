<template>
  <div>
    <token-allocations></token-allocations>

    <reserve-analytics></reserve-analytics>

    <token-reserve></token-reserve>

    <div class="pb-8"></div>
  </div>
</template>

<script>
import TokenReserve from '@/views/tokenomics/token-reserve.vue'
import TokenAllocations from '@/views/tokenomics/token-allocations.vue'
import ReserveAnalytics from '@/views/tokenomics/reserve-analytics.vue'

export default {
  components: {
    TokenAllocations,
    TokenReserve,
    ReserveAnalytics,
  },
  data: () => ({}),
}
</script>
