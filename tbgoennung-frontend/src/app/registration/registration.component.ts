import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private backendUrl = 'http://127.0.0.1:5000';
  registrationForm: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registrationForm = this.fb.group({
      userDetails: this.fb.group({
        vorname: ['', Validators.required],
        lastName: ['', Validators.required], 
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})')]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator })
    });
  }

  register(): void {
    if (this.registrationForm.valid) {
      const userDetails = this.registrationForm.get('userDetails')?.value;
      this.http.post(`${this.backendUrl}/register`, {
        vorname: userDetails.vorname,
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password
      }).subscribe(response => {
        console.log('User registered', response);
      }, error => {
        console.error('Registration failed', error);
      });
    }
  }

  areAllFieldsFilled(): boolean {
    return this.registrationForm.valid;
  }

  passwordMatchValidator(formGroup: FormGroup): { [s: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }
}