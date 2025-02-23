import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Playlist, Song } from "@shared/schema";

interface PlaylistWithSongs extends Playlist {
  songs: Song[];
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function PlaylistPage() {
  const { id } = useParams<{ id: string }>();

  const { data: playlist, isLoading } = useQuery<PlaylistWithSongs>({
    queryKey: [`/api/playlists/${id}`]
  });

  if (isLoading) {
    return <div className="p-6 text-muted-foreground">Loading playlist...</div>;
  }

  if (!playlist) {
    return <div className="p-6 text-muted-foreground">Playlist not found</div>;
  }

  return (
    <div>
      {/* Playlist Header */}
      <div className="bg-sidebar/50 p-8 flex items-end gap-6">
        <img
          src={playlist.coverArt || "https://placehold.co/300x300"}
          alt={playlist.name}
          className="w-60 h-60 shadow-lg"
        />
        <div>
          <p className="text-sm uppercase mb-2">Playlist</p>
          <h1 className="text-4xl font-bold mb-4">{playlist.name}</h1>
          <p className="text-sm text-muted-foreground">
            {playlist.songs.length} songs
          </p>
        </div>
      </div>

      {/* Playlist Controls */}
      <div className="p-6">
        <Button size="lg" className="mb-6">
          <Play className="mr-2 h-5 w-5" />
          Play
        </Button>

        {/* Songs Table */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase text-muted-foreground border-b">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Artist</th>
                <th className="px-6 py-3 text-right">
                  <Clock className="h-4 w-4 inline" />
                </th>
              </tr>
            </thead>
            <tbody>
              {playlist.songs.map((song, index) => (
                <tr
                  key={song.id}
                  className="hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={song.coverArt || "https://placehold.co/40x40"}
                        alt={song.title}
                        className="w-10 h-10"
                      />
                      <span>{song.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">Artist Name</td>
                  <td className="px-6 py-4 text-right">
                    {formatDuration(song.duration)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
