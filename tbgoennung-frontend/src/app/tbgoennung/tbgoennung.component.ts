import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tbgoennung',
  templateUrl: './tbgoennung.component.html',
  styleUrls: ['./tbgoennung.component.css']
})
export class TbgoennungComponent {
  private backendUrl = 'http://127.0.0.1:5000'; 
  niche: string | undefined;

  constructor(private http: HttpClient) { }

  postRequestAddNiche(niche: string) {
    if (niche) {
      this.http.post(`${this.backendUrl}/add_niche`, { niche: niche }).subscribe(response => {
        console.log(response);
      });
    } else if (niche === '') {
      console.log('Niche is empty');
    }
  }
}
