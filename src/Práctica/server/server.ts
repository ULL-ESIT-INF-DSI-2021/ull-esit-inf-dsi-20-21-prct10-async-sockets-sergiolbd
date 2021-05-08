import {createServer} from 'net';
import {spawn} from 'child_process';
import {note, RequestType, ResponseType} from '../types';
import {NoteInstance} from './note';

const noteInstance1 = NoteInstance.getNoteInstance();

const server = createServer({allowHalfOpen: true}, (connection) => {
  console.log('Client connected');

  let data = '';
  connection.on('data', (chunk) => {
    data += chunk;
  });

  connection.on('end', () => {
    console.log('Request received from client');

    const request: RequestType = JSON.parse(data);
    let response: ResponseType = {type: 'add', success: false, message: [[]]};
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
          message: [['Invalida commnad'], 'red'],
        };
        break;
    }
    console.log(`Response sent to client`);
    connection.write(JSON.stringify(response) + '\n');
    connection.end();
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
