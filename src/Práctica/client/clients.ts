import {connect} from 'net';
import {RequestType, ResponseType} from '../types';
import * as yargs from 'yargs';
const chalk = require('chalk');

const error = chalk.bold.red;
const informative = chalk.bold.green;

export function clientRequest(req: RequestType) {
  const client = connect({port: 60300});

  client.write(JSON.stringify(req), (err) => {
    if (err) {
      console.log(`Request could not be made: ${err.message}`);
    } else {
      client.end();
    }
  });

  let data = '';
  client.on('data', (chunk) => {
    data+=chunk;
  });

  client.on('end', () => {
    const res: ResponseType = JSON.parse(data);
    res.message.forEach((mes) => {
      colorsprint(mes?.[1] as string, mes?.[0] as string);
    });
  });

  client.on('error', (err) => {
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

// yargs.parse();
