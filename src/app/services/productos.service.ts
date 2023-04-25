import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {
    this.getProducto().subscribe(data => {
      this.productos = data;
      this.cargando = false;
    });
  }

  private getProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>('https://angular-html-ab1b5-default-rtdb.firebaseio.com/productos_idx.json');
  }
  
}
