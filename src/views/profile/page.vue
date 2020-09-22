<template>
  <v-container>
    <div v-if="sEthers.coinbase" class="mx-auto" style="max-width: 500px;">
      <template>
        <div class="font-weight-medium textMid--text mt-2 mb-2">
          Profile
        </div>

        <v-card
          :class="[
            'pa-2 r-border-23',
            { 'red-gradient': sEthers.providerName === 'Metamask' },
            { 'blue-gradient': sEthers.providerName === 'Coinbase' },
          ]"
        >
          <div class="wave2"></div>
          <div class="posrelative">
            <v-row class="pa-2 ma-0 align-center">
              <v-progress-circular :rotate="270" :size="100" :width="5" :value="70" color="white">
                <img
                  src="https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg"
                  height="90px"
                  width="90px"
                  style="object-fit: cover; border-radius: 300px;"
                />
              </v-progress-circular>

              <!--
                            <img 
                            src="https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg"
                            height="100px"
                            width="100px"
                            style="object-fit: cover;"
                            class="mr-3 r-border-23">
                            -->

              <div class="flex-110 ml-6">
                <div class="font-weight-bold">
                  <v-tooltip bottom open-delay="50">
                    <template v-slot:activator="{ on }">
                      <span
                        v-on="on"
                        class="font-weight-bold"
                        style="cursor: pointer;"
                        v-clipboard:copy="sEthers.coinbase"
                        v-clipboard:success="onCopy"
                      >
                        {{ sEthers.coinbase_condensed }}
                      </span>
                    </template>
                    <span>
                      {{ copyToClipboardText }}
                    </span>
                  </v-tooltip>
                </div>
                <div class="caption d-flex align-center white--text">
                  <img v-if="sEthers.providerName === 'Metamask'" src="@/assets/img/metamask.svg" height="15px" class="mr-1" />
                  <img v-if="sEthers.providerName === 'Coinbase'" src="@/assets/img/coinbase-wallet.svg" height="15px" class="mr-1" />
                  Connected to {{ sEthers.providerName }}
                </div>
              </div>

              <div class="d-flex align-center mt-3">
                <v-spacer></v-spacer>

                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon color="white" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item @click="doNothing" v-clipboard:copy="sEthers.coinbase" v-clipboard:success="onCopy">
                      <v-list-item-title>Copy address</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$root.$dialog.connectModal.open()">
                      <v-list-item-title>Switch accounts</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="disconnect">
                      <v-list-item-title>Sign out</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-row>
          </div>
        </v-card>

        <div class="mt-6"></div>

        <!-- UNC BALANCE -->
        <v-card :class="['pa-2 r-border-23 green-gradient']">
          <div class="wave2"></div>
          <div class="posrelative">
            <rank-card :balance="sEthers.unc_balance"></rank-card>
          </div>
        </v-card>

        <div class="font-weight-medium textMid--text mt-2 mb-2">
          Tokens
        </div>

        <portfolio-card :key="sEthers.coinbase"></portfolio-card>

        <div class="mt-6"></div>

        <div class="font-weight-medium textMid--text mt-2 mb-2">
          Tools
        </div>
        <v-row class="ma-0 align-center">
          <v-btn icon color="textMid" @click="openCalculator">
            <v-icon>mdi-calculator</v-icon>
          </v-btn>
        </v-row>
      </template>
    </div>

    <div v-else class="mx-auto" style="max-width: 500px;">
      <template>
        <div class="font-weight-medium textMid--text mt-2 mb-2">
          Profile
        </div>

        <v-card :class="['pa-2 r-border-23 green-gradient']">
          <div class="wave2"></div>
          <div class="posrelative">
            <v-row class="pa-2 ma-0 align-center">
              <v-progress-circular :rotate="270" :size="100" :width="5" :value="0" color="white">
                <img
                  src="https://cdn.pixabay.com/photo/2012/12/20/10/12/michelangelo-71282_1280.jpg"
                  height="90px"
                  width="90px"
                  style="object-fit: cover; border-radius: 300px;"
                />
              </v-progress-circular>

              <!--
                            <img 
                            src="https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg"
                            height="100px"
                            width="100px"
                            style="object-fit: cover;"
                            class="mr-3 r-border-23">
                            -->

              <div class="flex-110 ml-6">
                <div class="caption d-flex align-center white--text">
                  Connect your wallet to view your profile
                </div>
                <div>
                  <v-btn color="white" depressed @click="$root.$dialog.connectModal.open()">
                    Connect wallet
                  </v-btn>
                </div>
              </div>
            </v-row>
          </div>
        </v-card>

        <div class="mt-6"></div>

        <div class="font-weight-medium textMid--text mt-2 mb-2">
          Tokens
        </div>

        <v-card class="pa-3 r-border-23 textMid--text caption">
          Your ERC20 tokens will show here
        </v-card>
      </template>
    </div>

    <!-- DIALOGS -->
    <calculator-dialog ref="calcDialog"></calculator-dialog>
    <!-- DIALOGS -->
  </v-container>
</template>

<script>
import PortfolioCard from './portfolio-card'
import ConnectWeb3js from '@/components/ui/web3/connect-web3'
import CalculatorDialog from './calc-dialog'
// import { ethers } from "ethers"
import RankCard from './rank-card'

export default {
  components: {
    PortfolioCard,
    CalculatorDialog,
    RankCard,
  },
  data: () => ({
    copyToClipboardText: 'Copy to clipboard',
  }),
  computed: {
    sEthers() {
      return this.$store.state.ethers
    },
  },
  methods: {
    openCalculator() {
      this.$refs.calcDialog.open()
    },
    onCopy() {
      this.copyToClipboardText = 'Copied'
      setTimeout(() => {
        this.copyToClipboardText = 'Copy to clipboard'
      }, 1200)
    },
    disconnect() {
      ConnectWeb3js.disconnect()
    },
    doNothing() {},
  },
}
</script>
