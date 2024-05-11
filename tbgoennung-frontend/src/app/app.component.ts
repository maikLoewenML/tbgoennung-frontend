import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  niche: string | undefined;
  constructor(private http: HttpClient) {}

  postRequestAddNiche(niche: string) {
    if (niche) {
      this.http.post('http://127.0.0.1:5000/add_niche', { niche: niche }).subscribe(response => {
        console.log(response);
      });
    } else if (niche === '') {
      console.log('Niche is empty');
    }
  }

  title = 'tbgoennung-frontend';
}