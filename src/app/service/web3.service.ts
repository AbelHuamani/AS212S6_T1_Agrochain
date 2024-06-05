import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: Web3 | undefined;
  private account: string | null = null;

  constructor() {
    this.initializeWeb3();
  }

  private initializeWeb3(): void {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
    } else {
      console.error('MetaMask not detected. Please install MetaMask.');
    }
  }

  public async connect(): Promise<string | null> {
    try {
      if (this.web3) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.account = accounts[0];
        return this.account;
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return null;
    }
    return null;
  }

  public async getBalance(): Promise<string> {
    if (this.web3 && this.account) {
      const balance = await this.web3.eth.getBalance(this.account);
      return this.web3.utils.fromWei(balance, 'ether');
    }
    return '0';
  }

  //transacion
  public async sendTransaction(to: string, amount: string): Promise<void> {
    if (this.web3 && this.account) {
      const value = this.web3.utils.toWei(amount, 'ether');
      try {
        await this.web3.eth.sendTransaction({
          from: this.account,
          to: to,
          value: value
        });
        console.log('Transaction successful');
      } catch (error) {
        console.error('Transaction failed:', error);
      }
    } else {
      console.error('Web3 or account not initialized');
    }
  }
}

