import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaylistCard } from "@/components/music/PlaylistCard";
import { SongCard } from "@/components/music/SongCard";
import type { Playlist, Song } from "@shared/schema";

export default function Library() {
  const { data: playlists, isLoading: playlistsLoading } = useQuery<Playlist[]>({
    queryKey: ["/api/playlists"]
  });

  const { data: likedSongs, isLoading: songsLoading } = useQuery<Song[]>({
    queryKey: ["/api/songs/liked"]
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>

      <Tabs defaultValue="playlists">
        <TabsList className="mb-6">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="liked">Liked Songs</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists">
          {playlistsLoading ? (
            <div className="text-muted-foreground">Loading playlists...</div>
          ) : playlists?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground">
              You haven't created any playlists yet
            </div>
          )}
        </TabsContent>

        <TabsContent value="liked">
          {songsLoading ? (
            <div className="text-muted-foreground">Loading songs...</div>
          ) : likedSongs?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {likedSongs.map((song) => (
                <SongCard key={song.id} song={song} onPlay={() => {}} />
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground">
              You haven't liked any songs yet
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
