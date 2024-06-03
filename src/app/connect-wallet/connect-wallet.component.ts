import { Component } from '@angular/core';
import { Web3Service } from '../service/web3.service';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css']
})
export class ConnectWalletComponent {
  account: string | null = null;
  balance: string = '0';
  toAddress: string = '';     // para la tranferencia
  amount: string = '';        // para la tranferencia
  successMessage: string | null = null; //

  constructor(private web3Service: Web3Service) {}

  async connectWallet(): Promise<void> {
    this.account = await this.web3Service.connect();
    if (this.account) {
      this.balance = await this.web3Service.getBalance();
    }
  }

  //transaccion
/*  async sendTransaction(): Promise<void> {
    if (this.toAddress && this.amount) {
      await this.web3Service.sendTransaction(this.toAddress, this.amount);
      this.balance = await this.web3Service.getBalance(); // Update balance after transaction
    }
  } */

  //transaccion y notificacion
  async sendTransaction(): Promise<void> {
    if (this.toAddress && this.amount) {
      try {
        await this.web3Service.sendTransaction(this.toAddress, this.amount);
        this.successMessage = 'Transferencia exitosa!';
        this.balance = await this.web3Service.getBalance(); // Update balance after transaction
        this.resetForm();
      } catch (error) {
        console.error('Transaction failed:', error);
      }
    }
  }

  private resetForm(): void {
    this.toAddress = '';
    this.amount = '';
    setTimeout(() => {
      this.successMessage = null;
    }, 3000); // Clear success message after 3 seconds
  }

}

