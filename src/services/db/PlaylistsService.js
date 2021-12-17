const { nanoid } = require("nanoid");
const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylist({ name }) {
        const id = `Ply${nanoid(16)}`;
        const createdAt = new Date().toISOString();

        const query = {
            text: 'INSERT INTO playlists VALUES($1,$2,$3,$4) RETURNING id',
            values: [id, name, createdAt, createdAt]
        }

        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new Error("Playlist gagal ditambahkan")
        }
        return result.rows[0].id;
    }

    async getPlaylists() {
        const result = await this._pool.query('SELECT * FROM playlists');
        return result.rows;
    }

    async getPlaylistById(id) {
        const query = {
            text: 'SELECT * FROM playlists where id=$1',
            values: [id]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new Error('Playlist tidak ditemukan');
        }
        return result.rows[0];
    }

    async addSongsToPlaylist({ playlistId, songsId }) {
        const id = `PS-${nanoid(5)}`;

        const query = {
            text: 'INSERT INTO playlist_songs VALUES($1,$2,$3) RETURNING id',
            values: [id, playlistId, songsId]
        }
        console.log(query);
        const result = await this._pool.query(query);
        if (!result.rows) {
            throw new Error("Lagu gagal ditambahkan kedalam playlist, Playlist gagal ditemukan")
        }
    }
    async getSongsFromPlaylist(id) {
        const query = {
            text: 'SELECT * FROM playlist_songs where id = $1',
            values: [id],
        }
        const result = await this._pool.query(query);
        if(!result.rows.length) {
            throw new Error('Playlist Songs tidak ditemukan');
        }
        return result.rows[0];
    }
}

module.exports = PlaylistsService;