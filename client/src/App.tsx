import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/layout/Sidebar";
import { Player } from "@/components/layout/Player";
import { useEffect, useState } from "react";
import { web3Service } from "./lib/web3";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

function Router() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const address = await web3Service.connect();
      setWalletAddress(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  useEffect(() => {
    web3Service.initialize().catch(console.error);
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 flex justify-end">
          <Button onClick={connectWallet} variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Player />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;