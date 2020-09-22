import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/page'
import Profile from '@/views/profile/page'
import Tokenomics from '@/views/tokenomics/page'
import Litepaper from '@/views/litepaper/page'
import Web3 from '@/views/web3/page'
// import Airdrop from '@/views/airdrop/page'
// import Liquidity from '@/views/liquidity/page'
// import UniswapBrowserPairPage from '@/views/uniswap-browse-pairs/pair-page/page'
// import LockDapp from '@/views/liquidity/pol-dapp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index.html',
    alias: '/',
    component: Home,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/tokenomics',
    name: 'Tokenomics',
    component: Tokenomics,
  },
  {
    path: '/litepaper',
    name: 'Litepaper',
    component: Litepaper,
  },
  {
    path: '/web3',
    name: 'Web3',
    component: Web3,
  },
  // {
  //   path: '/airdrop',
  //   name: 'Airdrop',
  //   component: Airdrop,
  // },
  // {
  //   path: '/uniswap-browser',
  //   name: 'UniswapBrowser',
  //   component: Liquidity,
  // },
  // {
  //   path: '/uniswap-browser/pair/:pair_address',
  //   name: 'Uniswap pair',
  //   props: true,
  //   component: UniswapBrowserPairPage,
  // },
  // {
  //   path: '/pol-dapp/:pair',
  //   name: 'POL DAPP',
  //   props: true,
  //   component: LockDapp,
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    // automatically scroll to top on route change
    return { x: 0, y: 0 }
  },
})

export default router
