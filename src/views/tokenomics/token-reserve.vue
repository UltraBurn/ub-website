<template>
  <!-- TOKEN METRICS -->
  <v-container>
    <div>
      <v-row class="justify-center">
        <v-col v-scrollanimation cols="12" md="9" lg="9">
          <v-card class="pa-6">
            <v-row class="ma-0 pa-3">
              <h2 class="display-1 font-weight-bold mb-3">
                UNC Token Reserves
              </h2>
            </v-row>
            <v-row class="ma-0 pa-3">
              <h2 class="font-weight-bold mb-3">
                Community Reserve
              </h2>
            </v-row>

            <v-card class="pa-4 text mb-8 background--text">
              <div class="headline mb-2">
                What is the community reserve?
              </div>
              <div class="">
                The UNC community reserve is a pool of tokens minted for use by the community. The idea is to allow the community to vote on proposals
                that will be beneficial to stakeholders of UNC. As you will see, this gives us a lot of options to stimulate and grow this community.
              </div>
            </v-card>

            <v-row class="ma-0 pa-3">
              <h2 class="font-weight-bold mb-3">
                Developer Reserve
              </h2>
            </v-row>

            <v-card class="pa-4 text mb-8 background--text">
              <div class="headline mb-2">
                What is the developer reserve?
              </div>
              <div class="">
                The UNC developer reserve is used for creating products and purchasing assets that will benefit the UNC community and stakeholders.
                This is seperate from the community reserve to prevent a situation where the community does not come to consensus on a proposal the
                developers deem critical to making UNC succeed.
              </div>
            </v-card>

            <div>
              This will be used to stimulate community growth and portions will be locked in smart contracts to gain trust. Having liquidity on hand
              allows us to run events, run trading competitions, implement liquidity pool staking, and have a supply to burn from. In order for supply
              to be released from the community reserve it must be voted on by the staking community. In other words, consider the reserve locked
              until the community has approved which proposal we shall be running next.
            </div>
            <div class="mt-4">
              Portions of the reserve will be locked via smart contract in the near future to build trust, and a small portion kept on hand for use in
              community voted proposals.
            </div>
            <div class="mt-4">
              We will be adding a proposal section where users can add their own proposals and vote on them.
            </div>
            <div class="mt-4">
              The reserve is made to serve the community by allowing trading events, and the purchasing of assets to decentrally distribute. By
              holding UNC you have a right to say what the reserves are used for.
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="ma-0 pa-3 justify-center">
        <h2 class="font-weight-bold mb-3">
          Reserve proposals
        </h2>
      </v-row>

      <v-row>
        <v-col v-scrollanimation cols="12" md="3" lg="4">
          <v-card class="pa-6" style="height: 100%;">
            <div style="postion: relative; text-align: center;">
              <img src="@/assets/img/logo.jpg" alt="UCR" height="50px" class="" />
            </div>
            <div class="text-center headline font-weight-medium pb-4 pt-4">
              Trading competitions
            </div>
            <div class="text-center">
              We are not talking about buy and sell competitions, we are talking about the much more successful trade purchases competitions. Users
              who purchase the highest quantity of UNC on uniswap will be rewarded from the reserve (that is net purchases minus sells). If the
              community votes for it, we can even run competitions on other coins. Any pairing on UniSwap is our domain.
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="4">
          <v-card class="pa-6" style="height: 100%;">
            <div style="postion: relative; text-align: center;">
              <img src="@/assets/img/logo.jpg" alt="UCR" height="50px" class="" />
            </div>
            <div class="text-center headline font-weight-medium pb-4 pt-4">
              Decentralised asset purchase
            </div>
            <div class="text-center">
              Reserves can be used to purchase decentralised assets to reward UNC stakeholders in tokens that are not UNC. To participate in more
              expensive node aquisition on behalf of the community. Interest accruing from decentralised assets will be given to users at proportional
              percentages to their UNC holdings.
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="4">
          <v-card class="pa-6" style="height: 100%;">
            <div style="postion: relative; text-align: center;">
              <img src="@/assets/img/logo.jpg" alt="UCR" height="50px" class="" />
            </div>
            <div class="text-center headline font-weight-medium pb-4 pt-4">
              Liquidity stimulus
            </div>
            <div class="text-center">
              When adding liquidity to Uniswap we need to add both ETH and accompanying amounts of UNC. This will come from the reserve.
            </div>
          </v-card>
        </v-col>
        <v-col v-scrollanimation cols="12" md="3" lg="4">
          <v-card class="pa-6" style="height: 100%;">
            <div style="postion: relative; text-align: center;">
              <img src="@/assets/img/logo.jpg" alt="UCR" height="50px" class="" />
            </div>
            <div class="text-center headline font-weight-medium pb-4 pt-4">
              Liquidity pool staking
            </div>
            <div class="text-center">
              Stakers who provide liquidity to uniswap (on any pairing) can be rewarded with UNC from the reserve. For example we can track if you are
              providing liquidity to the ETH-UNC pair for above x amount of time and reward you with UNC from the reserve. Amounts can be voted on in
              the upcoming proposals section.
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-card v-scrollanimation class="pa-4 mt-8 text mb-8 background--text">
        <div class="headline mb-2">
          Dynamic tokenomics
        </div>
        <div class="">
          The reserve pool allows us to have a more dynamic tokenomics stream. Stakeholders can vote to increase or decrease staking rewards,
          collectively use the reserve to purchase income generating decentralised assets and much more. The first stage is to implement the proposal
          system. From then on we look forward to seeing what you come up with! From now on you are a part of the team and our decentralised
          organisation. Welcome!
        </div>
      </v-card>
    </div>
  </v-container>
  <!-- TOKEN METRICS -->
</template>

<script>
export default {
  data: () => ({}),
  computed: {},
}
</script>
