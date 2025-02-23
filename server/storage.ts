import { users, songs, playlists, playlistSongs } from "@shared/schema";
import type { InsertUser, InsertSong, InsertPlaylist, User, Song, Playlist, PlaylistSong } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Song operations with blockchain integration
  getSong(id: number): Promise<Song | undefined>;
  getSongsByArtist(artistId: number): Promise<Song[]>;
  createSong(song: InsertSong): Promise<Song>;
  searchSongs(query: string): Promise<Song[]>;
  streamSong(songId: number, userId: number): Promise<void>;

  // Playlist operations
  getPlaylist(id: number): Promise<Playlist | undefined>;
  getPlaylistSongs(playlistId: number): Promise<Song[]>;
  createPlaylist(playlist: InsertPlaylist): Promise<Playlist>;
  addSongToPlaylist(playlistId: number, songId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private songs: Map<number, Song>;
  private playlists: Map<number, Playlist>;
  private playlistSongs: Map<number, PlaylistSong>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.songs = new Map();
    this.playlists = new Map();
    this.playlistSongs = new Map();
    this.currentIds = { users: 1, songs: 1, playlists: 1, playlistSongs: 1 };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSong(id: number): Promise<Song | undefined> {
    return this.songs.get(id);
  }

  async getSongsByArtist(artistId: number): Promise<Song[]> {
    return Array.from(this.songs.values()).filter(
      (song) => song.artistId === artistId
    );
  }

  async createSong(insertSong: InsertSong): Promise<Song> {
    const id = this.currentIds.songs++;
    const song = { ...insertSong, id, streamCount: 0 };
    this.songs.set(id, song);
    return song;
  }

  async searchSongs(query: string): Promise<Song[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.songs.values()).filter(
      (song) => song.title.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getPlaylist(id: number): Promise<Playlist | undefined> {
    return this.playlists.get(id);
  }

  async getPlaylistSongs(playlistId: number): Promise<Song[]> {
    const playlistSongEntries = Array.from(this.playlistSongs.values()).filter(
      (ps) => ps.playlistId === playlistId
    );
    return playlistSongEntries.map((ps) => this.songs.get(ps.songId)!).filter(Boolean);
  }

  async createPlaylist(insertPlaylist: InsertPlaylist): Promise<Playlist> {
    const id = this.currentIds.playlists++;
    const playlist = { ...insertPlaylist, id };
    this.playlists.set(id, playlist);
    return playlist;
  }

  async addSongToPlaylist(playlistId: number, songId: number): Promise<void> {
    const id = this.currentIds.playlistSongs++;
    this.playlistSongs.set(id, { id, playlistId, songId });
  }

  async streamSong(songId: number, userId: number): Promise<void> {
    const song = await this.getSong(songId);
    if (!song) throw new Error("Song not found");

    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");

    // Increment stream count
    song.streamCount = (song.streamCount || 0) + 1;
    this.songs.set(songId, song);

    // Note: Actual payment processing will be handled by the blockchain
  }
}

export const storage = new MemStorage();