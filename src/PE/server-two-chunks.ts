import {createServer} from 'net';
import {spawn} from 'child_process';
import {RequestType, ResponseType} from './types';

const server = createServer({allowHalfOpen: true}, (connection) => {
  console.log('Client connected');

  let data = '';
  connection.on('data', (chunk) => {
    data += chunk;
  });

  connection.on('end', () => {
    console.log('Request received from client');

    const request: RequestType = JSON.parse(data);

    const cmd = spawn(request.command, request.arguments);

    let cmdOutput = '';
    cmd.stdout.on('data', (chunk) => {
      cmdOutput += chunk;
    });

    let cmdError = '';
    cmd.stderr.on('data', (chunk) => {
      cmdError += chunk;
    });

    cmd.on('close', (code) => {
      let response: ResponseType;
      if (code! < 0) {
        response = {
          error: `Command ${request.command} does not exist`,
        };
      } else if (code! > 0) {
        response = {
          error: cmdError,
        };
      } else {
        response = {
          output: cmdOutput,
        };
      }
      console.log('Response sent to client');
      connection.write(JSON.stringify(response));
      connection.end();
    });

    cmd.on('error', (err) => {
      if (err) {
        console.log(`Command could not be run: ${err.message}`);
      }
    });
  });

  connection.on('error', (err) => {
    if (err) {
      console.log(`Connection could not be established: ${err.message}`);
    }
  });

  connection.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect');
});
