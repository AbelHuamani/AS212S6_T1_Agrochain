import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  productoForm: FormGroup;
  editMode = false;
  editProductoId: number | null = null;
  

  constructor(private productoService: ProductoService, private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      imagenurl: ['', Validators.required],
     // nombre: ['', [Validators.required, Validators.maxLength(100)]],
      nombre: ['', [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z ]*$')]],
      descripcion: [''],
      precio: ['', [Validators.required, Validators.min(0)]],
      fechainicio: ['', Validators.required],
      fechaculminacion: ['', Validators.required],
      //telefono: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      ubicacion: ['', Validators.required],
      wallet: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getAllProductos().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      if (this.editMode && this.editProductoId !== null) {
        this.productoService.updateProducto(this.editProductoId, this.productoForm.value).subscribe(() => {
          this.getProductos();
          this.resetForm();
        });
      } else {
        this.productoService.createProducto(this.productoForm.value).subscribe(() => {
          this.getProductos();
          this.resetForm();
        });
      }
    }
  }

  editProducto(producto: Producto): void {
    if (producto.id !== undefined) {
      this.editMode = true;
      this.editProductoId = producto.id;
      this.productoForm.patchValue({
        imagenurl: producto.imagenurl,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        fechainicio: producto.fechainicio,
        fechaculminacion: producto.fechaculminacion,
        telefono: producto.telefono,
        ubicacion: producto.ubicacion,
        wallet: producto.wallet
      });
    }
  }
  
  
  // Método para formatear la fecha al formato ISO
  private formatDate(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }
  


  deleteProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe(() => {
      this.productos = this.productos.filter(producto => producto.id !== id);
    });
  }

  resetForm(): void {
    this.productoForm.reset();
    this.editMode = false;
    this.editProductoId = null;
  }

  // Método para eliminar caracteres no numéricos del campo de teléfono
  onPhoneInput(event: any): void {
    event.target.value = event.target.value.replace(/\D/g, '');
  }
}
