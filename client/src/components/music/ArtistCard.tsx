import { Card } from "@/components/ui/card";
import type { User } from "@shared/schema";
import { Link } from "wouter";

interface ArtistCardProps {
  artist: User;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artist/${artist.id}`}>
      <Card className="group hover:bg-accent transition-colors cursor-pointer">
        <div className="p-4 text-center">
          <img
            src={artist.profileImage || "https://placehold.co/200x200"}
            alt={artist.username}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="font-semibold">{artist.username}</h3>
          <p className="text-sm text-muted-foreground">Artist</p>
        </div>
      </Card>
    </Link>
  );
}
