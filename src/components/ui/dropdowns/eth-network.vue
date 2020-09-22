<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn outlined rounded small :color="color" class="font-weight-regular" style="text-transform: none;" v-bind="attrs" v-on="on">
          {{ networkName }}
          <v-icon small class="ml-3">mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="onClickNetwork(1)">
          <v-list-item-title>Mainnet</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onClickNetwork(3)">
          <v-list-item-title>Ropsten Testnet</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- DIALOGS -->
    <eth-network-dialog ref="metamaskDialog"></eth-network-dialog>
    <!-- DIALOGS -->
  </div>
</template>

<script>
import StaticMap from '@/static/maps'
import { ethers } from 'ethers'
import EthNetworkDialog from './eth-network-dialog'

export default {
  props: {
    color: {
      type: String,
      default: 'textMid',
    },
  },
  components: {
    EthNetworkDialog,
  },
  computed: {
    networkName() {
      return StaticMap.networks[this.$store.state.ethers.network]
    },
    sEthers() {
      return this.$store.state.ethers
    },
    providerIsMetamask() {
      return this.sEthers.providerName === 'Metamask'
    },
  },
  methods: {
    onClickNetwork(network_id) {
      if (this.providerIsMetamask) {
        this.$refs.metamaskDialog.open()
      } else {
        this.setEthNetwork(network_id)
      }
    },
    setEthNetwork(netowork_id) {
      console.log(netowork_id)
      if (netowork_id === 3) {
        var ropstenProvider = ethers.getDefaultProvider('ropsten')
        // var ropstenProvider = new ethers.providers.JsonRpcProvider() // connect to ganache
        this.$store.commit('updateEthers', {
          provider: ropstenProvider,
          network: 3,
        })
      } else if (netowork_id === 1) {
        var homesteadProvider = ethers.getDefaultProvider('homestead')
        this.$store.commit('updateEthers', {
          provider: homesteadProvider,
          network: 1,
        })
      }
    },
  },
}
</script>
