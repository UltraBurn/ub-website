import { store } from '@/store/index.js'
import moment from 'moment'

export default class WebSocketClient {
  constructor() {
    this.connect()
  }

  connect() {
    this.KEEP_ALIVE = true
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('Socket is already open! Cancelling reconnect')
      return
    }

    var url = this.getDefaultUri()
    this.socket = new WebSocket(url)

    let C = this

    this.socket.onopen = e => {
      C.onOpen(e)
    }
    this.socket.onclose = e => {
      C.onClose(e)
    }
    this.socket.onerror = e => {
      // do nothing
      console.log(e)
    }
    this.socket.onmessage = msg => {
      var jsonObj = JSON.parse(msg.data)

      if (jsonObj.channel === 'store') {
        // Store methods
        if (jsonObj.msg.model === 'update_coin_metrics') {
          store.commit('coin_metrics', jsonObj.msg.data)
        } else if (jsonObj.msg.model === 'something-else') {
          store.dispatch('something else')
        }
      }
    }
  }

  send(channel, data) {
    this.socket.send(JSON.stringify({ channel: channel, data: data }))
  }

  getDefaultUri() {
    if (process.env.NODE_ENV === 'production') {
      var socketUri
      var loc = window.location
      if (loc.protocol === 'https:') {
        socketUri = 'wss:'
      } else {
        socketUri = 'ws:'
      }
      socketUri += '//' + loc.host + '/socket'
      // socketUri += loc.pathname + 'socket'
      console.log('connecting to: ' + socketUri)
      return socketUri
    }
    return 'ws://unicrypt.network:8301'
  }

  onClose(e) {
    console.log('-----Websocket disconnected')
    console.log(e)
    console.log(moment().format())
    store.commit('SOCKET_DISCONNECT', true)

    if (this.KEEP_ALIVE) {
      setTimeout(this.connect.bind(this), 4000)
    }
  }

  onOpen() {
    console.log('-----WEBSOCKET CONNECTED, attempting handshake')
    this.send('public', localStorage.getItem('token'))
    store.commit('SOCKET_CONNECT')
    store.dispatch('syncAllData')
    // refetch all data if last sync occured more than
    // 5 seconds ago
    // This prevents doulbe sync after loading screen
    // and socket connection happen sequentially
    /* var now = moment()
    var then = moment(store.state.db.lastSync)
    var diff = now.diff(then, 'seconds')
    if (diff > 5) {
      store.dispatch('syncAllData')
    } */
  }

  dropConnection() {
    this.KEEP_ALIVE = false
    this.socket.close()
  }
}
