import {EventEmitter} from 'events';

/**
 * Clase encargada de emitir un evento tipo **request** por cada recepción
 * completa de una petición por parte del cliente
 */
export class MessageEventEmitterServer extends EventEmitter {
  /**
   * Constructor recibe como parámetro un objeto tipo EventEmitter
   * @param {EventEmitter} connection
   */
  constructor(connection: EventEmitter) {
    super();

    let wholeData = '';
    /**
     * Con cada evento de tipo **data** se registra un manejador encargado de
     * ir almacenando cada trocito que llega y emitir un evento de tipo **request**
     * cuando encuentre el delimitador \n
     */
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('request', JSON.parse(message));
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }
}
