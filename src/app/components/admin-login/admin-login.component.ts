import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
    this.errorMessage = ''; // limpiar mensaje previo
    this.http.post<any>('http://localhost:3000/api/login', loginData).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error en el servidor, intenta más tarde';
        console.error(err);
      }
    });
  }
}  