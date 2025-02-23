import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { SongCard } from "@/components/music/SongCard";
import { ArtistCard } from "@/components/music/ArtistCard";
import type { Song, User } from "@shared/schema";

export default function Search() {
  const [query, setQuery] = useState("");

  const { data: songs, isLoading: songsLoading } = useQuery<Song[]>({
    queryKey: ["/api/songs/search", query],
    enabled: query.length > 0
  });

  const { data: artists, isLoading: artistsLoading } = useQuery<User[]>({
    queryKey: ["/api/artists"],
    enabled: query.length > 0
  });

  const filteredArtists = artists?.filter(artist => 
    artist.isArtist && artist.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search for songs, artists..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {query && (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Songs</h2>
            {songsLoading ? (
              <div className="text-muted-foreground">Loading songs...</div>
            ) : songs?.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {songs.map((song) => (
                  <SongCard key={song.id} song={song} onPlay={() => {}} />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">No songs found</div>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Artists</h2>
            {artistsLoading ? (
              <div className="text-muted-foreground">Loading artists...</div>
            ) : filteredArtists?.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">No artists found</div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
