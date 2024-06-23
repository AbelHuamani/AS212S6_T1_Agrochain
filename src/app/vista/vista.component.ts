import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../service/producto.service';
import Swal from 'sweetalert2';
import { Web3Service } from '../service/web3.service';
import { EthereumService } from '../service/ethereum.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {
  productos: Producto[] = [];
  isFlipped: boolean = false; 
  recipientAddress: string = '';     // dirección transferencia toAddress REMPLAZADO POR recipientAddress
  amount: string = '';        // monto transferencia

  constructor(private productoService: ProductoService, private ethereumService: EthereumService) { }

  ngOnInit() {
    this.getProductos(); // Cargar productos al inicializar el componente
  }  
  
  toggleFlip(producto: any) {
    producto.isFlipped = !producto.isFlipped;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  getProductos(): void {
    this.productoService.getAllProductos().subscribe((productos: Producto[]) => {
      this.productos = productos.map((producto: Producto) => {
        return {...producto, isFlipped: false};
      });
    });
  } 

  async sendTransaction(): Promise<void> {
    if (this.recipientAddress && this.amount) {
      try {
        await this.ethereumService.deposit(this.amount, this.recipientAddress);
        this.amount = ''; // Reset amount after transaction
        this.recipientAddress = ''; // Reset toAddress after transaction
      } catch (error) {
        console.error('Transaction failed:', error);
      }
    }
  }

  async comprar(producto: Producto): Promise<void> {
    const { value: formValues } = await Swal.fire({
      title: "Enviar transacción",
      html: `
        <label for="swal-input1">Tu cuenta :</label>
        <input id="swal-input1" class="swal2-input" value="${producto.wallet}" disabled>
  
        <label for="swal-input2">Ethereum :</label>
        <input id="swal-input2" class="swal2-input">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        return [
          input1 ? input1.value : '',
          input2 ? input2.value : ''
        ];
      }
    });
  
    if (formValues) {
      this.recipientAddress = formValues[0]; // Set toAddress to the value from the form
      this.amount = formValues[1]; // Set amount to the value from the form
      await this.sendTransaction(); // Send transaction
      Swal.fire(`Transacción enviada`); //${this.amount} ETH a ${this.toAddress}`);
    }
  
    console.log(`Comprando producto: ${producto.nombre}`);
  }


  /*
  productos: Producto[] = [];
  isFlipped: boolean = false; 
  toAddress: string = '';     // direcion tranferencia
  amount: string = '';        // monto tranferencia

  constructor(private productoService: ProductoService, private web3Service: Web3Service) { } // Inyecta Web3Service


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

flipCard() {
  this.isFlipped = !this.isFlipped;
}

  getProductos(): void {
    this.productoService.getAllProductos().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  } 

  async sendTransaction(): Promise<void> {
    if (this.toAddress && this.amount) {
      try {
        await this.web3Service.sendTransaction(this.toAddress, this.amount);
        this.amount = ''; // Reset amount after transaction
        this.toAddress = ''; // Reset toAddress after transaction
      } catch (error) {
        console.error('Transaction failed:', error);
      }
    }
  }

  async comprar(producto: Producto): Promise<void> {
    const { value: formValues } = await Swal.fire({
      title: "Enviar transacción",
      html: `
        <label for="swal-input1">Tu cuenta :</label>
        <input id="swal-input1" class="swal2-input" value="${producto.wallet}" disabled>
  
        <label for="swal-input2">Ethereum :</label>
        <input id="swal-input2" class="swal2-input">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        return [
          input1 ? input1.value : '',
          input2 ? input2.value : ''
        ];
      }
    });
  
    if (formValues) {
      this.toAddress = formValues[0]; // Set toAddress to the value from the form
      this.amount = formValues[1]; // Set amount to the value from the form
      await this.sendTransaction(); // Send transaction
      Swal.fire(`Transacción enviada`); //${this.amount} ETH a ${this.toAddress}`);
    }
  
    console.log(`Comprando producto: ${producto.nombre}`);
  } */
}
