import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  registrationForm: FormGroup;

  /**
   * Konstruktor, der das Registrierungsformular mit Validierungsregeln initialisiert.
   * Das Formular enthält Felder für Vorname, Name, E-Mail, Passwort und Passwortbestätigung.
   * Validierungsregeln:
   * - `vorname` und `name` sind Pflichtfelder.
   * - `email` muss eine gültige E-Mail-Adresse sein und ist ein Pflichtfeld.
   * - `password` ist ein Pflichtfeld, muss zwischen 8 und 20 Zeichen lang sein, und bestimmte Zeichen enthalten (mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen).
   * - `confirmPassword` ist ein Pflichtfeld und muss mit dem Passwortfeld übereinstimmen. Die Überprüfung erfolgt durch die `passwordMatchValidator`-Methode.
   */
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      userDetails: this.fb.group({
        vorname: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})')]],
        confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
      })
    });
  }

  /**
   * Sendet eine Registrierungsanfrage an den Backend-Server, wenn das Registrierungsformular gültig ist.
   * Die Anfrage enthält Vorname, Name, E-Mail und Passwort des Benutzers.
   * Bei erfolgreicher Registrierung wird eine Konsolennachricht mit der Antwort des Servers ausgegeben.
   */
  register() {
    if (this.registrationForm.valid) {
      this.http.post(`${this.backendUrl}/register`, { vorname: this.registrationForm.value.vorname, name: this.registrationForm.value.name, email: this.registrationForm.value.email, password: this.registrationForm.value.password }).subscribe(response => {
        console.log('User registered', response);
      });
    }
  }

  /**
 * Überprüft, ob alle Felder im Registrierungsformular ausgefüllt und gültig sind.
 * Gibt `true` zurück, wenn das Formular gültig ist, andernfalls `false`.
 */
  areAllFieldsFilled(): boolean {
    return this.registrationForm.valid;
  }

  /**
   * Überprüft, ob die Werte von zwei Formularsteuerelementen (Passwort und Passwortbestätigung) innerhalb einer FormGroup übereinstimmen.
   * Gibt `null` zurück, wenn die Werte übereinstimmen (kein Fehler), oder ein Objekt mit `{ 'passwordMismatch': true }`, wenn sie nicht übereinstimmen.
   */
  passwordMatchValidator(formGroup: FormGroup): { [s: string]: boolean } | null {
    if (formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value) {
      return null; // Wenn Passwörter übereinstimmen, gibt null zurück (kein Fehler)
    }
    return { 'passwordMismatch': true }; // Wenn Passwörter nicht übereinstimmen, gibt einen Fehler zurück
  }

}
