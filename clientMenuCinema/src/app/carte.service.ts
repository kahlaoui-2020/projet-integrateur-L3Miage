import { Injectable } from '@angular/core';
import { HttpResponse, HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Carte } from './bd-data/carte';

type HTTP_METHOD = 'GET' | 'POST' | 'DELETE' | 'PUT';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  constructor(private http: HttpClient) { }

  private async get(url: string): Promise<HttpResponse<Carte>> {
    return this.http.get<Carte>( url, {
      observe: 'response'      
    }).toPromise();
  }

  async getCarte(): Promise<Carte> {
    let reponseServeur = await this.get('/api/carte');        
    return reponseServeur.body;
  }
}
