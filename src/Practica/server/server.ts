import {createServer} from 'net';
import {note, RequestType, ResponseType} from '../types';
import {NoteInstance} from './note';
import {MessageEventEmitterServer} from './eventEmitterServer';

const noteInstance1 = NoteInstance.getNoteInstance();

/**
 * Generamos objeto server mediante la llamada a createServer, el cual recibe como
 * parámetro un manejador el cual se ejecuta cada vez que el cliente se conecta al servidor
 */
const server = createServer((connection) => {
  const emitter = new MessageEventEmitterServer(connection);
  console.log('Client connected');

  /**
   * Haciendo uso de la clase `MessageEventEmitterServer` cada vez que se produzca el evento
   * **request** producido cuando llega una petición completa se ejecuta el siguiente código
   * el cual lleva a cabo todo el procesamiento de notas y escribe la respuesta a la peticón
   * en dicho socket
   */
  emitter.on('request', (data) => {
    console.log('Request received from client');
    const request: RequestType = data;
    let response: ResponseType = {type: 'add', success: false, message: [[]]};
    /**
     * Controlar tipo de operación a realizar sobre las notas
     */
    switch (request.type) {
      case 'add':
        const nota: note = {
          user: request.user,
          title: request.title,
          body: request.body,
          color: request.color,
        };
        response = noteInstance1.addNotes(nota);
        break;
      case 'update':
        response = noteInstance1.modify(request.user as string, request.title as string, request.newtitle as string);
        break;
      case 'remove':
        response = noteInstance1.remove(request.user as string, request.title as string);
        break;
      case 'list':
        response = noteInstance1.list(request.user as string);
        break;
      case 'read':
        response = noteInstance1.read(request.user as string, request.title as string);
        break;
      default:
        response = {
          type: 'add',
          success: false,
          message: [['Invalid commnad'], 'red'],
        };
        break;
    }
    console.log(`Response sent to client`);
    // Escribirmos las respuesta en el socket para que llegue al cliente
    connection.write(JSON.stringify(response) + '\n');
    // Cerramos el socket
    connection.end();
  });

  /**
   * Control de errores
   */
  connection.on('error', (err) => {
    if (err) {
      console.log(`Connection could not be established: ${err.message}`);
    }
  });

  /**
   * Control de cierre de conexión
   */
  connection.on('close', () => {
    console.log('Client disconnected');
  });
});

/**
 * Especifica que el servidro va a estar esperando en el puerto 60300,
 * puerto en el que se expondra el servicio y al cual debe conectarse el servidor
 */
server.listen(60300, () => {
  console.log('Waiting for clients to connect');
});
