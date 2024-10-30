import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SensorsWsService } from './sensors-ws.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class SensorsWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SensorsWsGateway.name);

  constructor(private readonly sensorsWsService: SensorsWsService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  // Metodo para enviar datos al frontend
  sendSensorData(data: any) {
    this.server.emit('sensorData', data);
    // this.logger.log(`Enviando datos al frontend: ${JSON.stringify(data)}`);
  }

  @SubscribeMessage('ledControl')
  handleLedControl(@MessageBody() { state }: { state: string }) {
    this.logger.log(`Recibiendo mensaje del frontend: ${state}`);
    return this.sensorsWsService.controlledLed(state);
  }
}
