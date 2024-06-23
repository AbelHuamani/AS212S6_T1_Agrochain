import { Component } from '@angular/core';
import { EthereumService } from '../service/ethereum.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {
  amount: string = ''; //monto
  recipientAddress: string = ''; //direccion
  connectedAccount: string = '';

  constructor(public ethereumService: EthereumService) {}

  ngOnInit() {
    this.ethereumService.connectedAccount$.subscribe((account) => {
      this.connectedAccount = account;
    });
  }

  connectToMetaMask() {
    this.ethereumService.connectToMetaMask();
  }

  deposit() {
    this.ethereumService.deposit(this.amount, this.recipientAddress);
    // Limpia los campos después de la acción de depósito
    this.recipientAddress = '';
    this.amount = '';
  }
}
