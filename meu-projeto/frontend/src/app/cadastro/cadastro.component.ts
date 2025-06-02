import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  usuario = { nome: '', email: '', cpf: '' };
  mensagem = '';

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar() {
    this.http.post<{ mensagem: string }>('http://backend:4000/cadastrar', this.usuario).subscribe({
      next: () => {
        this.mensagem = 'Cadastro realizado com sucesso!';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.mensagem = err.error?.mensagem || 'Erro ao cadastrar usuário.';
      }
    });
  }
}
