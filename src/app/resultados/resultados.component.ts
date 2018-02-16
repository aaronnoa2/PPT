import { Component} from '@angular/core';
import { ChatService} from "../chat.service";

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  constructor(private chat: ChatService) {
    this.chat.resultado().subscribe(data => {
      this.ganador = data;
    });
  }

  ganador = '';
}
