import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(): void {
    const loginData = { username: this.username, password: this.password };
    this.errorMessage = '';
    console.log('Enviando login con:', loginData);
    this.http.post<any>('http://localhost:3000/api/login', loginData).subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error en el servidor, intenta más tarde';
        console.error('Error al llamar login:', err);
      }
    });
  }
}
