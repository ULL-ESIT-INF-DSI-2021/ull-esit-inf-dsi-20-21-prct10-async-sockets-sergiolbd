/**
 * Socket desde el punto de vista del cliente
 */
import * as net from 'net';
import yargs from 'yargs';

let command: string = '';

const client = net.connect({port: 60300});

client.write('ls');
client.end();

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
});

client.on('end', () => {
  console.log(wholeData);
});

yargs.command({
  command: 'app',
  describe: 'Add a new note',
  builder: {
    comando: {
      describe: 'Comando',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.comando === 'string') {
      command = argv.comando;
    }
  },
});
