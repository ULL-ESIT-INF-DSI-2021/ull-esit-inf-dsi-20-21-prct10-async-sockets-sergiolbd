# Práctica 10: implementación de un cliente y un servidor de la aplicación de procesamiento de notas mediante Sockets en Node.js
[![Test](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-sergiolbd/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-sergiolbd/actions/workflows/node.js.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct10-async-sockets-sergiolbd&metric=alert_status)](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct10-async-sockets-sergiolbd)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-sergiolbd/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-sergiolbd?branch=master)  

**1. Introducción**
En esta segunda práctica se nos solicita aplicar el funcionamiento de la aplicación realizada en la **práctica 8**, sobre la cual se debe escribir un servidor y un cliente haciendo uso de los sockets proporcionados por el módulo `net` de node.js. 
Por ello el funcionamiento que se debe conseguir es que desde el cliente y mediante `yargs` ejecutemos un comando de los descritos en la práctica 8 (`add, modify, remote, list, add`) y el cual se manda al servidor que es el encargado de llevar el procesamiento de dicho comando consiguiendo en cada caso un comportamiento determinado, todo ello haciendo uso de sockets.  

**2. Material usado**
  * **GitHub Actions:**
    * Test
    * SonarCloud
    * Coveralls
  * **Node.js:**
    * [Módulo `net`](https://nodejs.org/dist/latest-v16.x/docs/api/net.html)
    * [Clase `EventEmitter` del módulo `Events`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#events_class_eventemitter)
  * yargs
  * chalk

**3. Modo ejecución**
Para hacer uso de esta código, lo más recomendable es llevar a cabo los siguientes pasos para hacer un uso correcto del mismo: 
  1. Abrir dos terminales
  2. Compilar el código mediante `tsc`
  3. Una de las terminales hará de **servidor**
     1. Para ello ejecutar `node dist/Práctica/server/server.ts`
     2. Una vez ejecutado el comando anterior deberá mostrar un mensaje como `Waiting for clients to connect`
     3. En este punto ya tendremos nuestro servidor corriendo y a la espera de que se conecte algún cliente
  4. La otra terminal será la encargada de hacer del papel de **cliente**
     1. Para ello ejecutar `node dist/Práctica/client/app.ts` acompañado del tipo de operación a relizar sobre el blog de notas
     2. Ejemplo: 
      ```bash 
      node dist/Práctica/client/app.js add --user="sergio" --title="Yellow Note" --body="Hello world" --color="yellow"
      ```

**3. Ejercicio**
Para el desarrollo de esta práctica, se ha generado en el directorio `src` un directorio `Práctica` el cual a su vez contiene otros dos directorios `server` y `client` en los están alojados los códigos desarrollados para cada caso.
Lo primero de todo es desarrollar el servidor, para ello en [server.ts](src/Práctica/server/server.ts), creamos el servidor haciendo uso de `createServer((connection) => {...})` el cual devuelve un objeto `Server` el cual haremos que nuestro servicio se exponga en el puerto 603000 haciendo uso de `server.listen(60300, () => {})` una vez realizado lo siguiente ya se podría generar un cliente que conecte con nuestro servidor.  
Para desarrollar nuestro cliente se ha decido crear una función `clientRequest(req: RequestType)` la cual como se ve, recibe una petición en formato JSON generado mediante las opciones pasadas por linea de comados, con los comandos generados por yargs, y desde los cuales se produce la llamada a esta función `clientRequest`.   
La función `clientRequest` establece una conexión con el puerto 60300 mediante `connect({port: 60300})` retornando un objeto `socket` que pasaremos al constructor de la clase `MessageEventEmitterClient` clase encargada de recibir las respuestas del cliente y emitir un evento de tipo `message` cuando el mensaje llegue completo, este evento que debe ser capturado en la función `clientResquest` haciendo uso `client.on('message', (data) => {...})` es en este punto donde el cliente detecta el evento y puede mostrar por pantalla el mensaje recibido por parte del cliente.

Por parte del servidor también se crea un clase `MessageEventEmitterServer` que hereda de `EventEmitter` cuyo funcionamiento es el mismo que el del cliente, pero en este caso emitiendo un evento `request` el cual avisa de que la petición ha llegado completa y es en este momento donde haciendo uso de `emitter` el cual es un objeto de tipo `MessageEventEmitterServer`, se debe hacer un `emitter.on('request', (data) => {...})` y es en el cuerpo de este manejador donde se hace uso de todo la lógica de funcionamiento de la clase `Notes`, mediante un `switch(request.type)`, donde `request = data` y data es un `RequestType`, de esta manera dependiendo de la petición generada por el cliente ejecutaremos una operación u otra sobre las notas. Un ejemplo del switch sería el siguiente:
```typescript
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
```
Como se puede observar, se obtiene un `responde: ResponseType`, el cual es la respuesta ya en formato JSON que deberá mandar el servidor al cliente.  
Una vez obtenida la respuesta se debe mandar la respuesta, escribiéndola en el socket, y cerrando la conexión:  
```typescript
// Escribirmos las respuesta en el socket para que llegue al cliente
    connection.write(JSON.stringify(response) + '\n');
    // Cerramos el socket
    connection.end();
```
A demás de todo lo anterior el servidor es capaz de detectar errores y mostrarlos por pantalla y detectar cuando se cierra dicha conexión.

**4. Ejemplo**
[Pueba1](media/Prueba1.png)