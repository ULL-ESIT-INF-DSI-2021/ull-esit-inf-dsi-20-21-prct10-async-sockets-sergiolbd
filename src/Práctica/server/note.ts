import * as fs from 'fs';
const chalk = require('chalk');
import {note, ResponseType} from '../types';

/**
 * Clase NoteInstance
 */
export class NoteInstance {
  /**
   * Atributo privado estático para almacenar la única instancia
   * que va a tener dicha clase
   */
  private static noteInstance: NoteInstance;

  /**
   * Constructor privado para que no se pueda invocar fuera de la clase
   */
  private constructor() {
    if (fs.existsSync('./Note/')) {
      fs.mkdirSync(`./Notes/`, {recursive: true});
    }
  }

  /**
   * Método encargado de comprobar que solo se genera una única
   * instancia de la clase
   * @returns {NoteInstance} Única instancia de la clase
   */
  public static getNoteInstance(): NoteInstance {
    if (!NoteInstance.noteInstance) {
      NoteInstance.noteInstance = new NoteInstance();
    }
    return NoteInstance.noteInstance;
  }

  /**
   * Método encargado de añadir una nota a la base de datos de notas
   * @param {note} nota Nota a añadir
   * @returns {string} Cadenas a mostrar por pantalla se retornan para hacer test
   */
  addNotes(nota: note) {
    const data = JSON.stringify(nota, null, 2);
    const ruta: string = `./Notes/${nota.user}/${nota.title}.json`;
    const test: ResponseType = {type: 'add', success: false, message: [[]]};
    if (fs.existsSync(`./Notes/${nota.user}/`)) {
      if (fs.existsSync(ruta)) {
        test.message = [['Note title taken', 'red']];
        test.success = false;
      } else {
        fs.writeFileSync(ruta, data);
        test.message = [[`New note added in ${nota.user}!`, 'green']];
        test.success = true;
      }
    } else {
      fs.mkdirSync(`./Notes/${nota.user}/`, {recursive: true});
      fs.writeFileSync(ruta, data);
      test.message = [[`New note added in ${nota.user}!`, 'green']];
      test.success = true;
    }
    return test;
  }

  /**
   * Método encargado realizar una modificación en la base de datos
   * @param {string} user Usuario
   * @param {string} title Titulo de la nota
   * @param {string} modify Modificación
   * @param {string} typemodify Tipo de modificación (Rename | append)
   */
  modify(user:string, title: string, newtitle: string) {
    const ruta: string = `./Notes/${user}/${title}.json`;
    const newruta: string = `./Notes/${user}/${newtitle}.json`;
    const test: ResponseType = {type: 'update', success: false, message: [[]]};
    if (fs.existsSync(ruta)) {
      fs.renameSync(ruta, newruta);
      test.message = [[`${title}.json rename to ${newtitle}.json`, 'green']];
      test.success = true;
    } else {
      test.message = [['You cannot modify a non-existent note!', 'red']];
      test.success = false;
    }
    return test;
  }

  /**
   * Método encargado eliminar una nota de un determinado usuario
   * @param {string} user Usuario
   * @param {string} title Título
   */
  remove(user: string, title: string) {
    const ruta: string = `./Notes/${user}/${title}.json`;
    const test: ResponseType = {type: 'remove', success: false, message: [[]]};
    if (fs.existsSync(ruta)) {
      fs.rmSync(ruta);
      test.message = [[`Remove ${title}`, 'green']];
      test.success = true;
    } else {
      test.message = [['You cannot remove a non-existent note!', 'red']];
      test.success = false;
    }
    return test;
  }

  /**
   * Método encargado de listar los títulos de la notas de un determinado user
   * @param {string} user Usuario
   * @returns {string[]} Array que almacena datos mostrados por consola para hacer test
   */
  list(user: string) {
    const ruta: string = `./Notes/${user}/`;
    const test: ResponseType = {type: 'list', success: true, message: [[]]};
    test.message.pop();
    if (fs.existsSync(ruta)) {
      const titles = fs.readdirSync(ruta);
      test.message.push([`Your Notes`]);
      titles.forEach((note) => {
        const text = fs.readFileSync(ruta + note);
        const titleBody = JSON.parse(text.toString());
        test.message.push([titleBody.title, titleBody.color]);
      });
    } else {
      test.message.push(['This user has no notes!', 'red']);
      test.success = false;
    }
    return test;
  }

  /**
   * Método encargado de leer el cuerpo de una determinada nota
   * @param {string} user Usuario
   * @param {string} title Título de la nota
   * @returns {string[]} Array que almacena datos mostrados por consola para hacer test
   */
  read(user: string, title: string) {
    const ruta: string = `./Notes/${user}/${title}.json`;
    const test: ResponseType = {type: 'read', success: false, message: [[]]};
    test.message.pop();
    if (fs.existsSync(ruta)) {
      const text = fs.readFileSync(ruta);
      const titleBody = JSON.parse(text.toString());
      test.message.push([titleBody.title]);
      test.message.push([titleBody.body, titleBody.color]);
      test.success = true;
    } else {
      test.message.push(['Note not found!', 'red']);
      test.success = false;
    }
    return test;
  }
}
