import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  vorname: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  private backendUrl = 'http://127.0.0.1:5000'; 

  constructor(private http: HttpClient) {}

  register(vorname: string, name: string, email: string, password: string) {
    this.http.post(`${this.backendUrl}/register`, { vorname: this.vorname, name: this.name, email: this.email, password: this.password }).subscribe(response => {
      console.log('User registered', response);
    });
  }

  areAllFieldsFilled(): boolean {
    return this.vorname.length > 0 && this.name.length > 0 && this.email.length > 0 && this.password.length > 0 && this.confirmPassword.length > 0;
  }

}
