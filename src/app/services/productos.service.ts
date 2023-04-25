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
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise<void>( (resolve, reject) => {
      this.getProductos().subscribe(data => {
        this.productos = data;
        this.cargando = false;
        resolve();
      });
    });
  }

  private getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>('https://angular-html-ab1b5-default-rtdb.firebaseio.com/productos_idx.json');
  }
  
  public getProducto(id: String) {
    return this.http.get(`https://angular-html-ab1b5-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  public buscarProducto(termino: string) {

    if (this.productos.length === 0) {

      this.cargarProductos().then( () => {
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      })

    } else {
      //aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod => {
    const tituloLower = prod.titulo?.toLocaleLowerCase();

      if (prod.categoria != undefined && prod.categoria.indexOf(termino) >= 0 
      || tituloLower != undefined && tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }

}
