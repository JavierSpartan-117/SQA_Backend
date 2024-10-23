import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SensorsWsService {
  private readonly logger = new Logger(SensorsWsService.name);

  // Logica para controlar el LED
  controlledLed(state: string): string {
    if (state === 'on' || state === 'off') {
      this.logger.log(`Encendiendo el LED`);
      return 'Encendiendo el LED';
    } else {
      this.logger.log(`Apagando el LED`);
      return 'Apagando el LED';
    }
  }

  // Lógica para procesar los datos del sensor (opcional)
  processSensorData(data: any) {
    this.logger.log(
      `Procesando datos de sensores: Humedad: ${data.humedad}, Temperatura: ${data.temperatura}`,
    );
    // Guardar datos en la base de datos o realizar otras acciones
  }
}
