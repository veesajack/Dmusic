import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import MusicPlatformABI from '../../contracts/MusicPlatform.json'; // We'll need to compile this

class Web3Service {
  private static instance: Web3Service;
  private web3: Web3 | null = null;
  private contract: any = null;
  private contractAddress = process.env.VITE_CONTRACT_ADDRESS;

  private constructor() {}

  static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  async initialize(): Promise<void> {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        MusicPlatformABI as AbiItem[],
        this.contractAddress
      );
    } else {
      throw new Error('Please install MetaMask!');
    }
  }

  async connect(): Promise<string> {
    if (!this.web3) await this.initialize();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  }

  async uploadSong(title: string, price: number, uri: string): Promise<number> {
    if (!this.contract) throw new Error('Contract not initialized');
    const accounts = await this.web3!.eth.getAccounts();
    
    const priceWei = this.web3!.utils.toWei(price.toString(), 'ether');
    const result = await this.contract.methods
      .uploadSong(title, priceWei, uri)
      .send({ from: accounts[0] });
      
    return result.events.SongUploaded.returnValues.tokenId;
  }

  async streamSong(tokenId: number, price: number): Promise<void> {
    if (!this.contract) throw new Error('Contract not initialized');
    const accounts = await this.web3!.eth.getAccounts();
    
    const priceWei = this.web3!.utils.toWei(price.toString(), 'ether');
    await this.contract.methods
      .streamSong(tokenId)
      .send({ from: accounts[0], value: priceWei });
  }

  async withdrawBalance(): Promise<void> {
    if (!this.contract) throw new Error('Contract not initialized');
    const accounts = await this.web3!.eth.getAccounts();
    
    await this.contract.methods
      .withdrawBalance()
      .send({ from: accounts[0] });
  }
}

export const web3Service = Web3Service.getInstance();
