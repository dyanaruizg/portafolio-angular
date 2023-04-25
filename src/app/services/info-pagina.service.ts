import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor(private http: HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Leer el archivo json infoPagina
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (data: InfoPagina) => {
        this.cargada = true;
        this.info = data;
      });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-ab1b5-default-rtdb.firebaseio.com/equipo.json')
      .subscribe( (data: any) => {
        this.equipo = data;
      });
  }

  
}
