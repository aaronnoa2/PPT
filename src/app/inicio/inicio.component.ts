import { Component, OnInit } from '@angular/core';
import {ChatService} from "../chat.service";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: string;
  valido:boolean;

  constructor(private chat: ChatService) {}

  enviarUsuario(){
    this.chat.meterUsuario(this.usuario);
  }

  cerrarPopUp(){
    $('#ModalNombreUsuario').modal('hide');
    this.enviarUsuario();
  }

  comprobarUsuario(){
    if(this.usuario != undefined){
      this.valido = true;
      this.cerrarPopUp();
    }
    else{
      this.valido = false;
    }
  }

  pedirUsuario(){
    if(this.chat.usuario === undefined){
      $('#ModalNombreUsuario').modal('show');
    }
    else{
      this.valido = true;
    }
  }

  ngOnInit() {
    this.pedirUsuario();
  }
}





