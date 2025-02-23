import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertSongSchema, insertPlaylistSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // User routes
  app.post("/api/users", async (req, res) => {
    const result = insertUserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const user = await storage.createUser(result.data);
    res.json(user);
  });

  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  });

  // Get all artists
  app.get("/api/artists", async (req, res) => {
    const users = await storage.getAllUsers();
    res.json(users.filter(user => user.isArtist));
  });

  // Song routes
  app.post("/api/songs", async (req, res) => {
    const result = insertSongSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const song = await storage.createSong(result.data);
    res.json(song);
  });

  // Get all songs
  app.get("/api/songs", async (req, res) => {
    const songs = await storage.getAllSongs();
    res.json(songs);
  });

  app.get("/api/songs/:id", async (req, res) => {
    const song = await storage.getSong(parseInt(req.params.id));
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
  });

  app.get("/api/artists/:id/songs", async (req, res) => {
    const songs = await storage.getSongsByArtist(parseInt(req.params.id));
    res.json(songs);
  });

  app.get("/api/songs/search", async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: "Search query required" });
    }
    const songs = await storage.searchSongs(query);
    res.json(songs);
  });

  // Playlist routes
  app.post("/api/playlists", async (req, res) => {
    const result = insertPlaylistSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const playlist = await storage.createPlaylist(result.data);
    res.json(playlist);
  });

  // Get all playlists
  app.get("/api/playlists", async (req, res) => {
    const playlists = await storage.getAllPlaylists();
    res.json(playlists);
  });

  app.get("/api/playlists/:id", async (req, res) => {
    const playlist = await storage.getPlaylist(parseInt(req.params.id));
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    const songs = await storage.getPlaylistSongs(playlist.id);
    res.json({ ...playlist, songs });
  });

  app.post("/api/playlists/:id/songs", async (req, res) => {
    const { songId } = req.body;
    if (!songId) {
      return res.status(400).json({ error: "Song ID required" });
    }
    await storage.addSongToPlaylist(parseInt(req.params.id), songId);
    res.json({ success: true });
  });

  return httpServer;
}