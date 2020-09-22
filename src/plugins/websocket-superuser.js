import { store } from '@/store/index.js'

export default class WebSocketClient {
  constructor() {
    this.token = ''
  }
  connect(token) {
    this.token = token
    this.KEEP_ALIVE = true
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('Super Socket is already open! Cancelling reconnect')
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
    this.socket.onmessage = response => {
      var jsonObj = JSON.parse(response.data)
      store.commit('addSuperSocketLogEntry', jsonObj.msg.data)
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
      console.log('connecting to supersocket: ' + socketUri)
      return socketUri
    }
    return 'ws://localhost:8301'
  }

  onClose() {
    store.commit('setSuperSocketConnectionStatus', false)
    /* if (this.KEEP_ALIVE) {
      setTimeout(this.connect.bind(this), 4000)
    } */
  }

  onOpen() {
    store.commit('setSuperSocketConnectionStatus', true)
    this.send('super-user', this.token)
  }

  disconnect() {
    this.KEEP_ALIVE = false
    this.socket.close()
  }
}
