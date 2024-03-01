import socketClient from 'socket.io-client'
import { ISocketIOInterface } from '../../domain/services/Isocket.io'

export class SocketIO implements ISocketIOInterface {
  private socket: any

  constructor() {
    this.socket = socketClient('http://34.198.106.93:3005')
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data)
  }
}