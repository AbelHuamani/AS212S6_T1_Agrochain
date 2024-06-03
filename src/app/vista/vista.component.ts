import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {
  //productos: Producto[]; // Define la variable productos
  productos: Producto[] = [];
  isFlipped: boolean = false; //recien añadido
  constructor(private productoService: ProductoService) { }

 /* ngOnInit(): void {
    this.getProductos();
  } */

/*
ngOnInit() {
    this.productoService.getAllProductos().subscribe((productos: Producto[]) => {
      this.productos = productos.map((producto: Producto) => {
        return {...producto, isFlipped: false};
      });
    });
  }  */
  
  /*recien añadido*/
  /*toggleFlip(producto: any) {
    producto.flipped = !producto.flipped;
  }*/
  ngOnInit() {
    this.productoService.getAllProductos().subscribe((productos: Producto[]) => {
      this.productos = productos.map((producto: Producto) => {
        return {...producto, isFlipped: false};
      });
    });
  }  
  
  toggleFlip(producto: any) {
    producto.isFlipped = !producto.isFlipped;
  }


/*recien añadido pero si funciona al dar vuelta*/
flipCard() {
  this.isFlipped = !this.isFlipped;
}

  getProductos(): void {
    this.productoService.getAllProductos().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  } 
}
