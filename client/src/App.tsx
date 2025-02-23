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
import Search from "@/pages/search";
import Library from "@/pages/library";
import Artist from "@/pages/artist";
import Playlist from "@/pages/playlist";
import { useToast } from "@/hooks/use-toast";

function Router() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const connectWallet = async () => {
    try {
      const address = await web3Service.connect();
      setWalletAddress(address);
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully.",
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please ensure MetaMask is installed.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    web3Service.initialize().catch(console.error);
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 flex justify-end border-b">
          <Button 
            onClick={connectWallet} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            {walletAddress 
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
              : 'Connect Wallet'}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/library" component={Library} />
            <Route path="/artist/:id" component={Artist} />
            <Route path="/playlist/:id" component={Playlist} />
            <Route component={NotFound} />
          </Switch>
        </div>
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