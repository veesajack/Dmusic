import { ethers } from 'ethers';
import { type InsertSong } from '@shared/schema';

// Import ABI from contract compilation
const contractABI = [
  "function uploadSong(string title, uint256 price, string uri) public returns (uint256)",
  "function streamSong(uint256 tokenId) public payable",
  "function withdrawBalance() public",
  "event SongUploaded(uint256 tokenId, string title, address artist, uint256 price)",
  "event StreamingPayment(uint256 tokenId, address listener, address artist, uint256 amount)"
];

class Web3Service {
  private static instance: Web3Service;
  private provider: ethers.BrowserProvider | null = null;
  private contract: ethers.Contract | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  private constructor() {}

  static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  async initialize(): Promise<void> {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask!');
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

    if (!contractAddress) {
      throw new Error('Contract address not found in environment variables');
    }

    this.contract = new ethers.Contract(
      contractAddress,
      contractABI,
      this.provider
    );
  }

  async connect(): Promise<string> {
    if (!this.provider) await this.initialize();

    const accounts = await this.provider!.send('eth_requestAccounts', []);
    this.signer = await this.provider!.getSigner();
    this.contract = this.contract!.connect(this.signer);

    return accounts[0];
  }

  async uploadSong(song: InsertSong, priceInEther: string): Promise<number> {
    if (!this.contract || !this.signer) throw new Error('Not initialized or connected');

    const priceWei = ethers.parseEther(priceInEther);
    const tx = await this.contract.uploadSong(song.title, priceWei, song.audioUrl);
    const receipt = await tx.wait();

    const event = receipt.logs.find(
      (log: any) => log.fragment?.name === 'SongUploaded'
    );

    return event ? event.args.tokenId : 0;
  }

  async streamSong(tokenId: number, priceInEther: string): Promise<void> {
    if (!this.contract || !this.signer) throw new Error('Not initialized or connected');

    const priceWei = ethers.parseEther(priceInEther);
    const tx = await this.contract.streamSong(tokenId, { value: priceWei });
    await tx.wait();
  }

  async withdrawBalance(): Promise<void> {
    if (!this.contract || !this.signer) throw new Error('Not initialized or connected');

    const tx = await this.contract.withdrawBalance();
    await tx.wait();
  }
}

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

export const web3Service = Web3Service.getInstance();