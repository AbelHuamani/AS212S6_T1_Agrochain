import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  //http://localhost:8080/api/productos //gitpot https://8080-abelcodex-dapps-dpjbccv9jhk.ws-us114.gitpod.io
  private apiUrl = 'http://localhost:8080/api/productos'; //remplazo por gitpot

  //recien añadido
  private productoSource = new BehaviorSubject<Producto | null>(null);
  productoActual = this.productoSource.asObservable();

  constructor(private http: HttpClient) { }
  //recien añadido
  seleccionarProducto(producto: Producto) {
    this.productoSource.next(producto);
  }

  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/findAll`);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}`, producto);
  }

  eliminarProducto(id: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/eliminar`, {});
  }

  restaurarProducto(id: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/restaurar`, {});
  }

  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
