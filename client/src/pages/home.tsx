import { useQuery } from "@tanstack/react-query";
import { SongCard } from "@/components/music/SongCard";
import { PlaylistCard } from "@/components/music/PlaylistCard";
import { ArtistCard } from "@/components/music/ArtistCard";
import type { Song, Playlist, User } from "@shared/schema";

export default function Home() {
  const { data: songs } = useQuery<Song[]>({
    queryKey: ["/api/songs"],
  });

  const { data: playlists } = useQuery<Playlist[]>({
    queryKey: ["/api/playlists"],
  });

  const { data: artists } = useQuery<User[]>({
    queryKey: ["/api/artists"],
  });

  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {songs?.slice(0, 5).map((song) => (
            <SongCard key={song.id} song={song} onPlay={() => {}} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {playlists?.slice(0, 5).map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {artists?.filter(a => a.isArtist).slice(0, 5).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
}
