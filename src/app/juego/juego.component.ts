import { Component, OnInit } from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  deshabilitado = false;
  puntuacion1 = 0;
  puntuacion2 = 0;
  jugador1;
  jugador2;
  entra = true;
  empezar;
  habilitar;
  jugadores;
  constructor(private chat: ChatService) { }

  elegirCarta(carta){
    this.chat.elegirCarta(carta);
    this.deshabilitado = true;
  }

  ngOnInit() {

    if(this.entra){
      this.empezar =  this.chat.empezar().subscribe(data => {
        this.deshabilitado = data;
      });
      this.habilitar = this.chat.habilitar().subscribe(data => {
        this.deshabilitado = data;
      });
      this.jugadores = this.chat.jugadores().subscribe(data => {
        this.jugador1 = data.jugadorPrimero;
        this.jugador2 = data.jugadorSegundo;
      });

      this.chat.puntos().subscribe(data => {
        this.puntuacion1 = data.puntuacionPrimero;
        this.puntuacion2 = data.puntuacionSegundo;
      });
    this.entra = false;
    }

  }
}
