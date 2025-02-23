import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SongCard } from "@/components/music/SongCard";
import type { User, Song } from "@shared/schema";

export default function Artist() {
  const { id } = useParams<{ id: string }>();

  const { data: artist, isLoading: artistLoading } = useQuery<User>({
    queryKey: [`/api/users/${id}`]
  });

  const { data: songs, isLoading: songsLoading } = useQuery<Song[]>({
    queryKey: [`/api/artists/${id}/songs`]
  });

  if (artistLoading) {
    return <div className="p-6 text-muted-foreground">Loading artist...</div>;
  }

  if (!artist) {
    return <div className="p-6 text-muted-foreground">Artist not found</div>;
  }

  return (
    <div>
      {/* Artist Header */}
      <div 
        className="h-[350px] relative flex items-end p-8"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
          backgroundImage: `url(${artist.profileImage || "https://placehold.co/1200x350"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">{artist.username}</h1>
          {artist.bio && (
            <p className="text-lg text-muted-foreground mb-6">{artist.bio}</p>
          )}
          <Button size="lg">
            <Play className="mr-2 h-5 w-5" />
            Play
          </Button>
        </div>
      </div>

      {/* Popular Songs */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
        {songsLoading ? (
          <div className="text-muted-foreground">Loading songs...</div>
        ) : songs?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} onPlay={() => {}} />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground">No songs available</div>
        )}
      </div>
    </div>
  );
}
