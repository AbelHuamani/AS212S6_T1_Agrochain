import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { BehaviorSubject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class EthereumService {
  private web3: Web3;
  private contract: any;
  private accounts: string[];
  private contractAddress = '0xdea1De15A8947652306572caD26F0Ec07eBf8FdF';
  private contractABI = [
    {
      inputs: [],
      name: 'depositar',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_miVariable',
          type: 'uint256',
        },
      ],
      name: 'setMiVariable',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      stateMutability: 'payable',
      type: 'fallback',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
    {
      inputs: [],
      name: 'getBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMiVariable',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'miVariable',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'propietario',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  //
  private connectedAccountSource = new BehaviorSubject<string>('');
  connectedAccount$ = this.connectedAccountSource.asObservable();

  private accountBalanceSource = new BehaviorSubject<string>('0');
  accountBalance$ = this.accountBalanceSource.asObservable();
  //

  constructor() {
    this.web3 = new Web3(window.ethereum);
    this.accounts = [];
    this.connectToMetaMask();
  }
  
  async connectToMetaMask() {
    const provider = (await detectEthereumProvider()) as MetaMaskInpageProvider;

    if (provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      this.web3 = new Web3(provider);
      this.accounts = await this.web3.eth.getAccounts();
      this.contract = new this.web3.eth.Contract(
        this.contractABI,
        this.contractAddress
      );
      this.connectedAccountSource.next(this.accounts[0]);
      this.updateAccountBalance();
    } else {
      console.error('Por favor, instala MetaMask');
    }
  }

  async deposit(amount: string, recipientAddress: string) {
    const weiAmount = this.web3.utils.toWei(amount, 'ether');
    const tx = await this.contract.methods
      .depositar()
      .send({ from: this.accounts[0], value: weiAmount, to: recipientAddress });
    console.log('Transacción exitosa:', tx);
  }

  private async updateAccountBalance() {
    const balance = await this.web3.eth.getBalance(this.accounts[0]);
    this.accountBalanceSource.next(this.web3.utils.fromWei(balance, 'ether'));

    // Actualizar el balance cada 5 segundos
    interval(5000)
      .pipe(map(() => this.web3.eth.getBalance(this.accounts[0])))
      .subscribe(async (balance) => {
        this.accountBalanceSource.next(
          this.web3.utils.fromWei(await balance, 'ether')
        );
      });
  }

  // Obtener el balance del contrato
  async getContractBalance() {
    const balance = await this.web3.eth.getBalance(this.contractAddress);
    return this.web3.utils.fromWei(balance, 'ether');
  }

  // Obtener el valor de la variable miVariable
  async getMiVariable() {
    const miVariable = await this.contract.methods.getMiVariable().call();
    return miVariable;
  }

  // Establecer el valor de la variable miVariable
  async setMiVariable(value: number) {
    const tx = await this.contract.methods
      .setMiVariable(value)
      .send({ from: this.accounts[0] });
    console.log('Transacción exitosa:', tx);
  }
}
