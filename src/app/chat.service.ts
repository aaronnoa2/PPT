import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable()
export class ChatService {
  private url = environment.serverSocket;
  private socket;

  usuario: string;
  usuarioGanador: string;
  suscripciones;

  constructor() {
    this.socket = io();
  }

  public meterUsuario(usuario){
    this.usuario = usuario;
  }

  public listo() {
    this.socket.emit('listo', this.usuario);
  }

  public sendMessage(data) {
    this.socket.emit('chat message', data);
  }

  public elegirCarta(carta) {
    this.socket.emit('elegirCarta', {jugador:this.usuario,carta:carta});
  }

  public empezar = () => {
    let a =  Observable.create((observer) => {
      this.socket.on('empezar', (data) => {
        observer.next(data);
      });
      this.suscripciones.push(a);
    });
  };

  public jugadores = () => {
    let b =  Observable.create((observer) => {
      this.socket.on('jugadores', (data) => {
        observer.next(data);
      });
      this.suscripciones.push(b);
    })
  };

  public puntos = () => {
    let c = Observable.create((observer) => {
      this.socket.on('puntos', (data) => {
        observer.next(data);
      });
      this.suscripciones.push(c);
    })
  };

  public resultado = () => {
    let d =  Observable.create((observer) => {
      this.socket.on('resultado', (data) => {
        observer.next(data);
      });
      this.suscripciones.push(d)
    })
  };

  public acabar = () => {
    let e =  Observable.create((observer) => {
      this.socket.on('acabar', (data) => {
        observer.next(data);
        setTimeout(() => {this.socket.emit('salir-sala')}, 1000);
      });
      this.suscripciones.push(e);
      this.suscripciones.forEach(function (suscripcion) {
        suscripcion.unsubscribe();
      })
    })
  };

  public habilitar = () => {
    let f =  Observable.create((observer) => {
      this.socket.on('habilitar', (data) => {
        observer.next(data);
      });
      this.suscripciones.push(f)
    })
  };

  public getMessages = () => {
    let g =  Observable.create((observer) => {
      this.socket.on('chat message', (data) => {
        observer.next(data);
      });
      this.suscripciones.push(g);
    });
  }
}
