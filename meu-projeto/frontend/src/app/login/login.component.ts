import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  dados = { email: '', cpf: '' };
  mensagem = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<{ mensagem?: string }>('http://localhost:4000/login', this.dados).subscribe({
      next: () => {
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.mensagem = err.error?.mensagem || 'Credenciais inválidas.';
      }
    });
  }
}
