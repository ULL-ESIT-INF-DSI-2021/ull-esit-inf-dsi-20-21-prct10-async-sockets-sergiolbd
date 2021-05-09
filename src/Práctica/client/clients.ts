import {connect} from 'net';
import {RequestType, ResponseType} from '../types';
import {MessageEventEmitterClient} from './eventEmitterClient';
const chalk = require('chalk');

const error = chalk.bold.red;
const informative = chalk.bold.green;

/**
 * Función la cual recibe la petición a realizar ya en formato RequestType
 * generada por los distintos comandos generados con yargs desde donde se produce
 * la llamada a esta función cliente
 * @param {RequestType} req Petición
 */
export function clientRequest(req: RequestType) {
  const socket = connect({port: 60300});
  const client = new MessageEventEmitterClient(socket);

  /**
   * Escribir mensaje en el socket para que sea recepcionado por el servidor
   */
  socket.write(JSON.stringify(req) + '\n', (err) => {
    if (err) {
      console.log(`Request could not be made: ${err.message}`);
    }
  });

  /**
   * Cliente recibe evento 'message' generado cuando llega una respuesta completa,
   * esta es mostrada por pantalla
   */
  client.on('message', (data) => {
    const res: ResponseType = data;
    res.message.forEach((mes) => {
      colorsprint(mes?.[1] as string, mes?.[0] as string);
    });
  });

  /**
   * Muestra el mensaje generado por el evento 'error'
   */
  socket.on('error', (err) => {
    console.log(err.message);
  });
}

/**
   * Método usa chalk para determinar el color de la nota y mostrar por pantalla con el color
   * @param {string} color Color
   * @param {string} text Título
   */
function colorsprint(color: string, text: string) {
  switch (color) {
    case 'red': console.log(chalk.bold.red(text));
      break;
    case 'yellow': console.log(chalk.bold.yellow(text));
      break;
    case 'green': console.log(chalk.bold.green(text));
      break;
    case 'blue': console.log(chalk.bold.blue(text));
      break;
    default: console.log(chalk.bold.black(text));
      break;
  }
}

