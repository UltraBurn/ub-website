<template>
  <!--
    <v-fab-transition>
      <v-btn
        fab
        dark
        fixed
        bottom
        left
        class=""
        to="/profile"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-fab-transition>
    -->

  <v-speed-dial v-model="fab" bottom left fixed direction="right">
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab>
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="green" to="/profile">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn fab dark small color="indigo" to="/uniswap-browser">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data: () => ({
    fab: false,
  }),
}
</script>
