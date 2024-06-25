import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  register() {
    this.http.post('/register', { email: this.email, password: this.password }).subscribe(response => {
      console.log('User registered', response);
    });
  }
}
