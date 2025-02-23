import { users, songs, playlists, playlistSongs } from "@shared/schema";
import type { InsertUser, InsertSong, InsertPlaylist, User, Song, Playlist, PlaylistSong } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Song operations
  getSong(id: number): Promise<Song | undefined>;
  getSongsByArtist(artistId: number): Promise<Song[]>;
  createSong(song: InsertSong): Promise<Song>;
  getAllSongs(): Promise<Song[]>;
  searchSongs(query: string): Promise<Song[]>;
  streamSong(songId: number, userId: number): Promise<void>;

  // Playlist operations
  getPlaylist(id: number): Promise<Playlist | undefined>;
  getPlaylistSongs(playlistId: number): Promise<Song[]>;
  createPlaylist(playlist: InsertPlaylist): Promise<Playlist>;
  getAllPlaylists(): Promise<Playlist[]>;
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

    // Add demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo artists
    const artist1: User = {
      id: this.currentIds.users++,
      username: "ElectroBeats",
      password: "demo123",
      walletAddress: "0x1234567890abcdef",
      isArtist: true,
      bio: "Electronic music producer from Berlin",
      profileImage: "https://placehold.co/400x400?text=ElectroBeats"
    };

    const artist2: User = {
      id: this.currentIds.users++,
      username: "JazzMaster",
      password: "demo123",
      walletAddress: "0xabcdef1234567890",
      isArtist: true,
      bio: "Jazz ensemble from New Orleans",
      profileImage: "https://placehold.co/400x400?text=JazzMaster"
    };

    this.users.set(artist1.id, artist1);
    this.users.set(artist2.id, artist2);

    // Create demo songs
    const song1: Song = {
      id: this.currentIds.songs++,
      title: "Digital Dreams",
      artistId: artist1.id,
      duration: 180,
      audioUrl: "https://example.com/song1.mp3",
      coverArt: "https://placehold.co/400x400?text=Digital+Dreams",
      streamCount: 1000
    };

    const song2: Song = {
      id: this.currentIds.songs++,
      title: "Neon Nights",
      artistId: artist1.id,
      duration: 210,
      audioUrl: "https://example.com/song2.mp3",
      coverArt: "https://placehold.co/400x400?text=Neon+Nights",
      streamCount: 850
    };

    const song3: Song = {
      id: this.currentIds.songs++,
      title: "Smooth Jazz Cafe",
      artistId: artist2.id,
      duration: 240,
      audioUrl: "https://example.com/song3.mp3",
      coverArt: "https://placehold.co/400x400?text=Smooth+Jazz+Cafe",
      streamCount: 1200
    };

    this.songs.set(song1.id, song1);
    this.songs.set(song2.id, song2);
    this.songs.set(song3.id, song3);

    // Create demo playlists
    const playlist1: Playlist = {
      id: this.currentIds.playlists++,
      name: "Electronic Vibes",
      userId: artist1.id,
      coverArt: "https://placehold.co/400x400?text=Electronic+Vibes"
    };

    const playlist2: Playlist = {
      id: this.currentIds.playlists++,
      name: "Jazz Essentials",
      userId: artist2.id,
      coverArt: "https://placehold.co/400x400?text=Jazz+Essentials"
    };

    this.playlists.set(playlist1.id, playlist1);
    this.playlists.set(playlist2.id, playlist2);

    // Add songs to playlists
    const playlistSong1: PlaylistSong = {
      id: this.currentIds.playlistSongs++,
      playlistId: playlist1.id,
      songId: song1.id
    };

    const playlistSong2: PlaylistSong = {
      id: this.currentIds.playlistSongs++,
      playlistId: playlist1.id,
      songId: song2.id
    };

    const playlistSong3: PlaylistSong = {
      id: this.currentIds.playlistSongs++,
      playlistId: playlist2.id,
      songId: song3.id
    };

    this.playlistSongs.set(playlistSong1.id, playlistSong1);
    this.playlistSongs.set(playlistSong2.id, playlistSong2);
    this.playlistSongs.set(playlistSong3.id, playlistSong3);
  }

  // Add new methods to get all data
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getAllSongs(): Promise<Song[]> {
    return Array.from(this.songs.values());
  }

  async getAllPlaylists(): Promise<Playlist[]> {
    return Array.from(this.playlists.values());
  }

  // Existing methods remain unchanged
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