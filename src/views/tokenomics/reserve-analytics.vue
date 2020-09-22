<template>
  <v-container>
    <v-row v-scrollanimation class="ma-0 pa-3">
      <h2 class="display-1 font-weight-bold mb-3">
        UNC Reserve analytics
      </h2>
    </v-row>

    <v-row>
      <v-col v-scrollanimation cols="12" md="3" lg="3">
        <v-card class="" style="height: 100%;">
          <community-vault></community-vault>
        </v-card>
      </v-col>
      <v-col v-scrollanimation cols="12" md="3" lg="3">
        <v-card class="" style="height: 100%;">
          <developer-vault></developer-vault>
        </v-card>
      </v-col>
      <v-col v-scrollanimation cols="12" md="3" lg="3">
        <v-card class="" style="height: 100%;">
          <team-vault></team-vault>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommunityVault from './reserve/community'
import DeveloperVault from './reserve/developer'
import TeamVault from './reserve/team'

export default {
  components: {
    CommunityVault,
    DeveloperVault,
    TeamVault,
  },
}
</script>
