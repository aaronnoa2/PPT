const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

cartas = [];
jugadores = [];
listo = [false, false];
rondas = 0;
puntos = [0, 0];
jugadorGanador = '';



io.on('connection', function (socket) {
  socket.broadcast.emit("user connected");
  console.log('User connected');

  socket.on('listo', function (nombreJugador) {

    if (!listo[0] || !listo[1]) {
      socket.join('salaJugadores');
      jugadores.push(nombreJugador);

      if (listo[0] === false) {
        listo[0] = true;
      }
      else {
        listo[1] = true;
      }
      if (listo[0] === true && listo[1] === true) {
        io.to('salaJugadores').emit('empezar', true);
        jugadoresjson = {jugadorPrimero:jugadores[0],jugadorSegundo:jugadores[1]};
        io.to('salaJugadores').emit('jugadores',jugadoresjson);
      }

      socket.on('elegirCarta', function (data) {
        if (listo[0] === true && listo[1] === true) {
          cartas.push(data.carta);
          if (cartas.length >= 2) {
            ganador();
            puntosJson = {puntuacionPrimero:puntos[0],puntuacionSegundo:puntos[1]};
            io.to('salaJugadores').emit('puntos',puntosJson);


            if (rondas >= 5) {

              if (puntos[0] > puntos[1]) {
                jugadorGanador = jugadores[0]
              }
              if (puntos[1] > puntos[0]) {
                jugadorGanador = jugadores[1]
              }
              if (puntos[0] === puntos[1]) {
                jugadorGanador = 'Empate';
              }
              io.to('salaJugadores').emit('resultado', jugadorGanador);

              setTimeout(function () {
                io.to('salaJugadores').emit('acabar', false);

                reiniciar();
              }, 3000);
            }
            io.to('salaJugadores').emit('habilitar', false);
          }
        }
      });

      socket.on('salir-sala', function(data) {
        socket.leave('salaJugadores');
      })
    }
  });

  socket.on('chat message', function (data) {
    io.emit('chat message', data);
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('user disconnected');
    console.log('User disconnected');
  });
});

server.listen(port, function () {
  console.log('started on port ${port}');
});

function ganador() {
  if (cartas[0] === cartas[1]) {
  }
  if (cartas[0] === 0 && cartas[1] === 1) {
    puntos[1] += 1;
  }
  if (cartas[0] === 0 && cartas[1] === 2) {
    puntos[0] += 1;
  }
  if (cartas[0] === 1 && cartas[1] === 2) {
    puntos[1] += 1;
  }
  if (cartas[0] === 1 && cartas[1] === 0) {
    puntos[0] += 1;
  }
  if (cartas[0] === 2 && cartas[1] === 0) {
    puntos[1] += 1;
  }
  if (cartas[0] === 2 && cartas[1] === 1) {
    puntos[0] += 1;
  }

  cartas = [];
  rondas += 1;
}

function reiniciar() {
  jugadores = [];
  listo[0] = false;
  listo[1] = false;
  jugadorGanador = '';
  puntos = [0, 0];
  rondas = 0;
  cartas = [];
}
