import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {MessageEventEmitterClient} from '../src/Practica/client/eventEmitterClient';
import {MessageEventEmitterServer} from '../src/Practica/server/eventEmitterServer';

describe('MessageEventEmitterClient', () => {
  it('Should emit a message event once it gets a complete message', (done) => {
    const socket = new EventEmitter();
    const client = new MessageEventEmitterClient(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({'type': 'add', 'success': true, 'message': [['New note added in sergio!', 'green']]});
      done();
    });

    socket.emit('data', '{"type": "add", "success": true');
    socket.emit('data', ', "message": [["New note added in sergio!", "green"]]}');
    socket.emit('data', '\n');
  });
});


describe('MessageEventEmitterServer', () => {
  it('Should emit a request event once it gets a complete message', (done) => {
    const socket = new EventEmitter();
    const server = new MessageEventEmitterServer(socket);

    server.on('request', (message) => {
      expect(message).to.be.eql({'type': 'add', 'user': 'sergio', 'title': 'Prueba1', 'color': 'blue'});
      done();
    });

    socket.emit('data', '{"type": "add", "user": "sergio", "title": "Prueba1"');
    socket.emit('data', ', "color": "blue"}');
    socket.emit('data', '\n');
  });
});
