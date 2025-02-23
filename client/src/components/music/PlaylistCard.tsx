import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Playlist } from "@shared/schema";
import { Link } from "wouter";

interface PlaylistCardProps {
  playlist: Playlist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Link href={`/playlist/${playlist.id}`}>
      <Card className="group relative overflow-hidden hover:bg-accent transition-colors cursor-pointer">
        <div className="p-4">
          <img
            src={playlist.coverArt || "https://placehold.co/200x200"}
            alt={playlist.name}
            className="w-full aspect-square rounded-md object-cover mb-4"
          />
          <h3 className="font-semibold truncate">{playlist.name}</h3>
          <p className="text-sm text-muted-foreground">By User</p>

          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-4 right-4 opacity-0 transform translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          >
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}
