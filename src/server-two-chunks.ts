import * as net from 'net';
import {spawn} from 'child_process';

/**
 * Servidor que recibe mensajes en trozos
 */
const server = net.createServer({allowHalfOpen: true}, (connection) => {
  console.log('A client has connected.');

  // const firstData = '{"type": "change", "prevSize": 13';
  // const secondData = ', "currSize": 27}\n';

  connection.on('end', () => {
    console.log(command);


    const ls = spawn(command, []);
    ls.stdout.pipe(process.stdout);
  });

  let command = '';
  connection.on('data', (x) => {
    command += x;
  });

  // Envia primer trozo
  connection.write(command);

  // // Envia segundo trozo tras 500
  // const timer = setTimeout(() => {
  //   connection.write(secondData);
  //   // Desde el servidor manda evento end al cliente y cierra el socket cliente (Cierre parcial)
  //   connection.end();
  // }, 500);

  // connection.on('end', () => {
  //   clearTimeout(timer);
  // });
  connection.end();

  connection.on('close', () => {
    console.log('A client has disconnected');
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
