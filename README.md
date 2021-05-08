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

**3. Ejercicio**


**4. Ejecicuión**
