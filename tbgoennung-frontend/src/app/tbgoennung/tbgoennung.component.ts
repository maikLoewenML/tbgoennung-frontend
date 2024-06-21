import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tbgoennung',
  templateUrl: './tbgoennung.component.html',
  styleUrls: ['./tbgoennung.component.css']
})
export class TbgoennungComponent {
  private backendUrl = 'http://127.0.0.1:5000'; 
  beschreibung!: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.addNiche(this.beschreibung);
  }

  addNiche(beschreibung: string) {
    const data = { beschreibung: beschreibung }; 
    this.http.post(`${this.backendUrl}/add_niche`, data).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error('Fehler beim Senden des POST-Requests:', error)
    });
    console.log('POST-Request gesendet');
  }
}
