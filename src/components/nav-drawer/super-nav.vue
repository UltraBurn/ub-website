<template>
  <v-navigation-drawer v-model="navDrawer" fixed width="700px" class="background" style="z-index: 10;" stateless temporary>
    <div style="display: flex; flex-direction: column; overflow-y: hidden;height: 100%;">
      <v-row class="ma-0 pa-2 justify-end align-center" style="flex: 0 0 auto;">
        <v-btn color="text" icon @click="toggle">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>

      <div style="flex: 1; overflow: auto;">
        <div style="height: 100px;"></div>

        <v-text-field autocomplete="new-password" class="mt-2 pa-2" v-model="apiKey" label="API KEY" rounded filled single-line></v-text-field>

        <v-row class="ma-0 justify-end">
          <v-btn v-if="!superSocketConnected" x-small @click="connectSocket">
            Connect
          </v-btn>
          <v-btn v-if="superSocketConnected" x-small @click="disconnectSocket">
            Disconnect
          </v-btn>
          <v-btn x-small @click="clearLog">
            Clear
          </v-btn>
        </v-row>

        <template v-if="superSocketConnected">
          <div>
            <!--
            <v-btn @click="syncERC20">
              Sync ERC20
            </v-btn>
            -->

            <v-tabs v-model="tab" fixed-tabs color="text">
              <v-tab class="caption">
                uniswap
              </v-tab>
              <v-tab class="caption">
                erc20
              </v-tab>
              <v-tab class="caption">
                cron_jobs
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="background">
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div>
                      <v-btn @click="syncUniPairs">
                        Sync Uni Pairs
                      </v-btn>
                      <v-btn @click="getLastUniswapIndex">
                        Get latest uniswap index
                      </v-btn>
                      <v-btn @click="updateAllPOLTokens">
                        Update all POL tokens
                      </v-btn>
                    </div>

                    <v-card class="ma-2 pa-4">
                      <div>
                        insert uniswap pairs
                      </div>
                      <v-row dense>
                        <v-col cols="6">
                          <div class="caption textMid--text">
                            index
                          </div>
                          <v-text-field
                            autocomplete="new-password"
                            class="mt-2"
                            v-model="uniswapStartIndex"
                            label="Start at index"
                            rounded
                            filled
                            single-line
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption textMid--text">
                            count
                          </div>
                          <v-text-field
                            autocomplete="new-password"
                            class="mt-2"
                            v-model="uniswapIterationCount"
                            label="iteration count"
                            rounded
                            filled
                            single-line
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-btn @click="insertUniswapPairs">
                        Insert
                      </v-btn>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <erc-20-card :apiKey="apiKey"></erc-20-card>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <cron-card :apiKey="apiKey"></cron-card>

                    <server-statistics></server-statistics>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </div>

          <!-- LOGGER -->
          <v-card class="ma-2 pa-2">
            <div v-for="(log, i) of superLog" :key="i" class="caption r-border-b pa-2">
              {{ log }}
            </div>
          </v-card>
          <!-- LOGGER -->
        </template>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import _ from 'lodash'
import UniswapContracts from '@/smart-contracts/uniswap'
import Erc20Card from './erc20card'
import CronCard from './cron-card'
import ServerStatistics from './server-statistics'

export default {
  components: {
    Erc20Card,
    CronCard,
    ServerStatistics,
  },
  data: () => ({
    tab: 0,
    apiKey: '',
    navDrawer: false,
    uniswapStartIndex: 0,
    uniswapIterationCount: 0,
  }),
  computed: {
    superLog() {
      return this.$store.state.superSocket.log
    },
    superSocketConnected() {
      return this.$store.state.superSocket.connected
    },
  },
  methods: {
    toggle() {
      this.navDrawer = !this.navDrawer
    },
    connectSocket() {
      this.$socket_super.connect(this.apiKey)
    },
    disconnectSocket() {
      this.$socket_super.disconnect()
    },
    clearLog() {
      this.$store.commit('clearSuperLog')
    },
    getLastUniswapIndex() {
      UniswapContracts.getPairsLength().then(allPairsLength => {
        alert(allPairsLength)
      })
    },
    syncERC20: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          this.$axios
            .post(`/erc20/sync`, { apiKey: this.apiKey })
            .then(response => {
              console.log(response)
            })
            .then(() => resolve())
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      },
      150,
      { leading: true },
    ),
    syncUniPairs: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          this.$axios
            .post(`/uniswap/sync`, { apiKey: this.apiKey })
            .then(response => {
              console.log(response)
            })
            .then(() => resolve())
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      },
      150,
      { leading: true },
    ),
    insertUniswapPairs: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          var data = {
            index: this.uniswapStartIndex,
            count: this.uniswapIterationCount,
            apiKey: this.apiKey,
          }
          this.$axios
            .post(`/uniswap/insert-n-pairs`, data)
            .then(response => {
              console.log(response)
            })
            .then(() => resolve())
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      },
      150,
      { leading: true },
    ),
    updateAllPOLTokens: _.debounce(
      function() {
        return new Promise((resolve, reject) => {
          this.$axios
            .post(`/pol/update-all-pol-tokens`, { apiKey: this.apiKey })
            .then(response => {
              console.log(response)
            })
            .then(() => resolve())
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      },
      150,
      { leading: true },
    ),
  },
}
</script>
