import * as yargs from 'yargs';
import {RequestType} from '../types';
import {clientRequest} from './clients';


/**
 * Command add Note
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User Note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Body of note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string') {
      const req: RequestType = {
        type: 'add',
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      };
      clientRequest(req);
    }
  },
});

/**
 * Commnand Modify Note
 */
yargs.command({
  command: 'modify',
  describe: 'Modify note',
  builder: {
    user: {
      describe: 'User Note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    newtitle: {
      describe: 'newtitle of note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
        typeof argv.newtitle === 'string') {
      const req: RequestType = {
        type: 'update',
        user: argv.user,
        title: argv.title,
        newtitle: argv.newtitle,
      };
      clientRequest(req);
    }
  },
});

/**
 * Commnand Modify Note
 */
yargs.command({
  command: 'remove',
  describe: 'Remove note',
  builder: {
    user: {
      describe: 'User Note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const req: RequestType = {
        type: 'remove',
        user: argv.user,
        title: argv.title,
      };
      clientRequest(req);
    }
  },
});

/**
 * Commnand List Note
 */
yargs.command({
  command: 'list',
  describe: 'list note',
  builder: {
    user: {
      describe: 'User Note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const req: RequestType = {
        type: 'list',
        user: argv.user,
      };
      clientRequest(req);
    }
  },
});

/**
 * Commnand Read Note
 */
yargs.command({
  command: 'read',
  describe: 'read note',
  builder: {
    user: {
      describe: 'User Note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const req: RequestType = {
        type: 'read',
        user: argv.user,
        title: argv.title,
      };
      clientRequest(req);
    }
  },
});

yargs.parse();

