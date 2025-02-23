import { Link, useLocation } from "wouter";
import { Home, Search, Library, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-60 bg-sidebar flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-8">DMusic</h1>
        
        <nav className="space-y-2">
          <Link href="/">
            <Button
              variant={location === "/" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          
          <Link href="/search">
            <Button
              variant={location === "/search" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </Link>
          
          <Link href="/library">
            <Button
              variant={location === "/library" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Library className="mr-2 h-4 w-4" />
              Your Library
            </Button>
          </Link>
        </nav>

        <Separator className="my-4" />
        
        <Button variant="outline" className="w-full justify-start">
          <Plus className="mr-2 h-4 w-4" />
          Create Playlist
        </Button>
      </div>

      <ScrollArea className="flex-1 px-6">
        <div className="space-y-1">
          {/* Playlist list will go here */}
        </div>
      </ScrollArea>
    </div>
  );
}
