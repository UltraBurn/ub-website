<template>
  <div>
    <simple-rating-card :pair_address="pair"></simple-rating-card>
    <!--
    <rating-card :pair="pair"></rating-card>
    -->

    <div class="r-outlined mt-2 mb-2 pa-4">
      <div class="title mb-2">
        Are you this tokens developer? Do you hold tokens in this pool?
      </div>
      <div class="textMid--text caption">
        Attention: This section is meant for token developers to boost their tokens trust score. If you are not a token developer you most likely
        should not use this feature.
      </div>
      <div class="textMid--text caption mt-2">
        Boost your tokens trust score by locking your liquidity. This will give your token a favourable rating on our explorer and give investors
        confidence in your project. Investors can easily find coins that use this service proving your token has locked its liquidity and cannot rug
        pull that percentage of liquidity. Our locker is highly flexible allowing any tokenomic release schedule you desire.
      </div>
      <v-row class="ma-0 mt-4 justify-end">
        <v-btn @click="$emit('onProceed')" outlined color="blue" small>
          Withdraw
        </v-btn>
        <v-btn @click="$emit('onProceed')" outlined color="blue" small>
          Lock your liquidity
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script>
// import RatingCard from './rating-card'
import SimpleRatingCard from './rating-card-simple'

export default {
  props: {
    token: {},
    pair: {},
  },
  components: {
    // RatingCard,
    SimpleRatingCard,
  },
  data: () => ({}),
  methods: {},
  created() {},
}
</script>
