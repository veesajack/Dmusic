import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address").notNull(),
  isArtist: boolean("is_artist").default(false),
  bio: text("bio"),
  profileImage: text("profile_image")
});

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artistId: integer("artist_id").references(() => users.id),
  duration: integer("duration").notNull(),
  audioUrl: text("audio_url").notNull(),
  coverArt: text("cover_art"),
  streamCount: integer("stream_count").default(0)
});

export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: integer("user_id").references(() => users.id),
  coverArt: text("cover_art")
});

export const playlistSongs = pgTable("playlist_songs", {
  id: serial("id").primaryKey(),
  playlistId: integer("playlist_id").references(() => playlists.id),
  songId: integer("song_id").references(() => songs.id)
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  walletAddress: true,
  isArtist: true,
  bio: true,
  profileImage: true
});

export const insertSongSchema = createInsertSchema(songs).pick({
  title: true,
  artistId: true,
  duration: true,
  audioUrl: true,
  coverArt: true
});

export const insertPlaylistSchema = createInsertSchema(playlists).pick({
  name: true,
  userId: true,
  coverArt: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertSong = z.infer<typeof insertSongSchema>;
export type InsertPlaylist = z.infer<typeof insertPlaylistSchema>;

export type User = typeof users.$inferSelect;
export type Song = typeof songs.$inferSelect;
export type Playlist = typeof playlists.$inferSelect;
export type PlaylistSong = typeof playlistSongs.$inferSelect;
