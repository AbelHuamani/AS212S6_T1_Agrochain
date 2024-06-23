import { Component } from '@angular/core';
import { Web3Service } from '../service/web3.service';
import { EthereumService } from '../service/ethereum.service';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css']
})

export class ConnectWalletComponent {
  connectedAccount: string = '';

  constructor(public ethereumService: EthereumService) { }

  ngOnInit() {
    this.ethereumService.connectedAccount$.subscribe(account => {
      this.connectedAccount = account;
    });
  }
  connectToMetaMask() {
    this.ethereumService.connectToMetaMask();
  }



  /*
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
  }  */
}

