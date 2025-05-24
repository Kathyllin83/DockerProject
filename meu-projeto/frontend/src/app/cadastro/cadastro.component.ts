import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  usuario = {
    nome: '',
    email: '',
    cpf: ''
  };

  mensagem = '';

  constructor(private http: HttpClient) {}

  enviar() {
    this.http.post<{ mensagem: string }>('http://localhost:4000/cadastrar', this.usuario)
      .subscribe({
        next: (res) => {
          this.mensagem = res.mensagem;
          this.usuario = { nome: '', email: '', cpf: '' };
        },
        error: () => {
          this.mensagem = 'Erro ao enviar os dados.';
        }
      });
  }
}
