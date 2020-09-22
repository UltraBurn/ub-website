import { store } from '@/store/index'

const Self = {
  doTransaction: async (contractCall, dialog) => {
    var txHash
    try {
      dialog.open()
      var response = await contractCall
      txHash = response.hash
      store.commit('addPendingTx', response.hash)
      dialog.close()
      var confirmation = await response.wait(2)
      store.commit('completePendingTx', confirmation.transactionHash)
    } catch (error) {
      console.log(error)
      store.commit('failPendingTx', txHash)
      try {
        dialog.close()
      } catch (e) {
        console.log(e)
      }
      throw error
    }
  },
}

export default Self
