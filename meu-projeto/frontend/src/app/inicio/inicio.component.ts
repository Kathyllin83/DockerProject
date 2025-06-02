import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:4000/usuarios').subscribe(data => {
      this.usuarios = data;
    });
  }

  remover(id: string) {
    this.http.delete(`http://localhost:3001/usuarios/${id}`).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u._id !== id);
    });
    
  }
}
