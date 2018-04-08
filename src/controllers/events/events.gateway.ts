import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException
} from '@nestjs/websockets'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/map'

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer() server

  @SubscribeMessage('order ready')
  onEvent(client, data) {
    const event = 'order ready'
    const response = true

    // emit message to everybody
    this.server.emit('order ready', { event: 'order ready', data: true })
  }

  @SubscribeMessage('echo')
  onEventEcho(client, data) {
    const event = 'echo'
    const response = true

    // emit message to everybody
    this.server.emit('echo', { event: 'echo', data: 'Hello from websocket' })
  }
}
