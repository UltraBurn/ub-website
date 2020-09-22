<template>
  <div>
    <v-container>
      <v-row v-if="false" class="ma-0 mt-8 mb-8 align-center">
        <img src="@/assets/img/UB_icon_white.jpg" alt="UB" height="50px" class="mr-2" />
        <h2 class="display-1">UltraBurn <span class=""> / UB</span></h2>
      </v-row>

      <!-- TOKEN METRICS -->
      <token-metrics></token-metrics>
      <!-- TOKEN METRICS -->

      <v-row class="mt-8">
        <v-col cols="12" lg="4">
          <v-card style="height: 100%;" class="pa-6 text-center">
            <p>
              UNC is the native token for the Unicrypt platform. It is responsive to market conditions, and for use in our ecosystem of DAPPS,
              staking, voting and decentralised trading tools.
            </p>
            <p>
              We are a community of developers here to build the tools and tokenomics our community and the crypto space desire.
            </p>
            <v-btn rounded class="mb-2 mr-2" href="https://etherscan.io/address/0xf29e46887ffae92f1ff87dfe39713875da541373" target="_blank">
              View on etherscan
            </v-btn>
            <v-btn rounded class="mb-2" href="https://uniswap.info/pair/0x5E64CD6f84D0eE2Ad2a84CadC464184e36274E0c" target="_blank">
              ETH-UNC Pool
            </v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" lg="8">
          <v-card style="height: 100%;" class="pa-6">
            <v-row class="ma-0 pa-3">
              <h2 class="headline font-weight-bold mb-3">
                Decentralised Autonomous Organisation
              </h2>
            </v-row>
            <p>
              As a stakeholder you have a say in how the UNC reserve is used to grow the project. Vote on staking rewards, trading competitions,
              burns, use the reserve to hire wechat promoters to spread knowledge in Asia. All things are possible.
            </p>
            <v-btn rounded class="mb-2 mr-2" to="/tokenomics">
              Learn about the reserve
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- EXTRA INFO -->
      <v-row class="ma-0 mt-6 pa-3 display-1 font-weight-bold">
        What is UNC / UniCrypt?
      </v-row>
      <v-card class="">
        <div class="pa-8">
          UNC is the native token for the Unicrypt platform. A 100% transparent and traceable open-source ERC20 token.

          <div class="mt-9 font-weight-bold">
            UNC ecosystem
          </div>

          <div>
            <div class="headline mt-4 font-weight-medium"></div>
            UniCrypt is working on an ecosystem of decentralised applications and tools for the cryptocurrency community. Each tool will either burn,
            require the spending of, or holding UNC - creating deflationary supply mechanics.
          </div>

          <div class="mt-9 font-weight-bold">
            UNC reserve
          </div>

          <div>
            <div class="headline mt-4 font-weight-medium"></div>
            One of our unique features is the UNC reserve. This is a reserve of coins the community can vote on via proposals to enact events such as
            rewards for trading competitions on any pair on Uniswap, to vote on staking rewards for the staking program, or even to be burnt. They can
            be used for exchange listings, events, the purchasing of decentralised assets to split amongst stakers and more.
          </div>
        </div>
      </v-card>
      <!-- EXTRA INFO -->
    </v-container>

    <!-- PROMOTION -->
    <v-container v-scrollanimation v-if="false">
      <div class="pa-4" style="border-radius: 13px;">
        <div class="display-2 font-weight-bold text-center">
          Promotion
        </div>

        <!-- <promotion></promotion> -->

        <v-row>
          <v-col cols="12" md="3">
            <div style="postion: relative; text-align: center;">
              <img src="@/assets/img/logo.jpg" alt="UCR" width="100%" class="pa-4 animate" />
            </div>
          </v-col>
          <v-col cols="12" md="9">
            <div class="headline font-weight-bold">
              Stage 1
            </div>
            <div class="pr-4 headline">
              Stage 1 of discounted liquidity pools is now live. <span class="display-1 font-weight-medium">25%</span> of the circulating supply is
              live on uniswap at a discounted rate.
            </div>
            <div class="headline font-weight-bold">
              Stage 2
            </div>
            <div class="pr-4 headline">
              25% liquidity pool at 5x the price of the tier before
            </div>
            <v-row>
              <v-btn rounded class="mb-2 mr-3 mt-4" href="https://uniswap.info/pair/0x5E64CD6f84D0eE2Ad2a84CadC464184e36274E0c" target="_blank">
                View on etherscan
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <!-- PROMOTION -->

    <!-- LIQUIDITY INJECTION -->
    <v-container v-scrollanimation v-if="false">
      <!-- upcoming-event></upcoming-event> -->
    </v-container>
    <!-- LIQUIDITY INJECTION -->

    <div class="pa-8"></div>

    <!-- COMPETITIONS -->
    <v-container v-scrollanimation v-if="false">
      <div class="pa-4 gradient-button" style="border-radius: 13px;">
        <div class="display-1 font-weight-bold">
          Competitions
        </div>

        <div class="pt-4 pb-4">
          Stay tuned for updates on our upcoming Staking and net purchasing competitions.
        </div>
      </div>
    </v-container>
    <!-- COMPETITIONS -->

    <!-- COMMUNITY -->
    <v-container v-scrollanimation>
      <div class="text-center">
        <img src="@/assets/img/Rocket.svg" alt="UCR" height="250px" class="pa-4 animate" />
      </div>
      <v-row class="ma-0 pa-3 display-1 font-weight-bold justify-center">
        Community driven development
      </v-row>
      <div class="pa-3 text-center">
        UniCrypt is a token developed by members of the Ethereum and Uniswap communities to experiment with new pooled staking systems and automated
        liquidity pool protocols. We are building a DAO where our stakeholders can have input on what DAPPS they would like to see in the crypto
        ecosystem, vote on it, and have it developed. Lets build a collaborative community where instead of watching twitter and portfolios all day we
        build products that better the cryptosphere. Welcome to the team!
      </div>

      <v-row class="justify-center mt-3">
        <v-btn
          rounded
          x-large
          color="green"
          class="mr-2 mb-2 white--text gradient-button"
          href="https://uniswap.exchange/swap?outputCurrency=0xf29e46887FFAE92f1ff87DfE39713875Da541373"
          target="_blank"
        >
          Trade on UniSwap
        </v-btn>
      </v-row>
    </v-container>
    <!-- COMMUNITY -->

    <!-- FOOTER -->
    <v-row class="align-center justify-center pb-4 pt-4 ma-0">
      <v-btn large icon color="text" href="https://twitter.com/UNC_token" target="_blank">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn large icon color="text" href="https://t.me/unc_token" target="_blank">
        <v-icon>mdi-telegram</v-icon>
      </v-btn>
      <v-btn large icon color="text" href="https://discord.gg/ZEzwNHR" target="_blank">
        <v-icon>mdi-discord</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import TokenMetrics from '@/components/token-metrics/card.vue'
//import Promotion from './promotion'
//import UpcomingEvent from './upcoming-event'

export default {
  components: {
    // Promotion,
    // UpcomingEvent,
    TokenMetrics,
  },
  data: () => ({}),
  mounted() {},
}
</script>

<style lang="scss">
.animate {
  animation: updown 2s ease-in-out infinite alternate-reverse both;
}
.newanimation {
  animation: slide-up 2s ease-in-out alternate-reverse both;
}
.coinspin {
  animation: coinspin-a 4s ease-out normal;
}
.coinspin-fast {
  animation: coinspin-a 2s ease-out normal;
}
.coinspin-medium {
  animation: coinspin-a 3s ease-out normal;
}
.coinspin-infinite {
  animation: coinspin-a 4s ease-out infinite normal;
}

@keyframes coinspin-a {
  0% {
    transform: rotateY(0deg);
    moz-transform: rotateY(0deg); //Firefox
    ms-transform: rotateY(0deg); //Microsoft Browsers
  }
  100% {
    transform: rotateY(360deg);
    moz-transform: rotateY(360deg); //Firefox
    ms-transform: rotateY(360deg); //Microsoft Browsers
  }
}
@-webkit-keyframes coinspin-a {
  from {
    -webkit-transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(360deg);
  }
}

@keyframes updown {
  from {
    opacity: 0.8;
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}

@keyframes slide-up {
  from {
    transform-origin: 200px 0px;
  }
  to {
    transform-origin: 0px 0px;
  }
}

/* other options */
@keyframes tween {
  from {
    bottom: 0px;
    opacity: 1;
  }
  to {
    bottom: 20px;
    opacity: 0.5;
  }
}

.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-leave-active {
  transition: all 8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.before-enter {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease-out;
}
.enter {
  opacity: 1;
  transform: translateY(0px);
}
</style>
