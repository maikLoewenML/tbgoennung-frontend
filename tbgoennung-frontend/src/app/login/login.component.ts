import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('/login', { email: this.email, password: this.password }).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        // Speichern Sie das Token oder die Benutzerdaten im lokalen Speicher oder im Zustand
        localStorage.setItem('token', response.token);
        // Navigieren Sie nach der erfolgreichen Anmeldung zu einer anderen Seite
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your email and password.';
      }
    );
  }
}
