import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Song } from "@shared/schema";

interface SongCardProps {
  song: Song;
  onPlay: () => void;
}

export function SongCard({ song, onPlay }: SongCardProps) {
  return (
    <Card className="group relative overflow-hidden hover:bg-accent transition-colors">
      <div className="p-4">
        <img
          src={song.coverArt || "https://placehold.co/200x200"}
          alt={song.title}
          className="w-full aspect-square rounded-md object-cover mb-4"
        />
        <h3 className="font-semibold truncate">{song.title}</h3>
        <p className="text-sm text-muted-foreground truncate">Artist Name</p>

        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 opacity-0 transform translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          onClick={onPlay}
        >
          <Play className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}
