// Mock Web3 implementation for demonstration
export class Web3Mock {
  private static instance: Web3Mock;
  private connectedAddress: string | null = null;

  private constructor() {}

  static getInstance(): Web3Mock {
    if (!Web3Mock.instance) {
      Web3Mock.instance = new Web3Mock();
    }
    return Web3Mock.instance;
  }

  async connect(): Promise<string> {
    // Simulate wallet connection
    this.connectedAddress = `0x${Math.random().toString(16).slice(2)}`;
    return this.connectedAddress;
  }

  async disconnect(): Promise<void> {
    this.connectedAddress = null;
  }

  getAddress(): string | null {
    return this.connectedAddress;
  }

  async signMessage(message: string): Promise<string> {
    if (!this.connectedAddress) throw new Error("Not connected");
    return `signed_${message}_${this.connectedAddress}`;
  }
}

export const web3 = Web3Mock.getInstance();
