import {connect} from 'net';
import {RequestType, ResponseType} from './types';

if (process.argv.length < 3) {
  console.log('At least, a command must be specified');
} else {
  const client = connect({port: 60300});

  const req: RequestType = {
    command: process.argv[2],
    arguments: process.argv.length > 3? process.argv.splice(3) : [],
  };

  client.write(JSON.stringify(req), (err) => {
    if (err) {
      console.log(`Request could not be made: ${err.message}`);
    } else {
      client.end();
    }
  });

  let data = '';
  client.on('data', (chunk) => {
    data += chunk;
  });

  client.on('end', () => {
    const res: ResponseType = JSON.parse(data);
    if (res.error) {
      console.log(res.error);
    } else if (res.output) {
      console.log(res.output);
    }
  });

  client.on('error', (err) => {
    console.log(`Connection could not be established: ${err.message}`);
  });
}
