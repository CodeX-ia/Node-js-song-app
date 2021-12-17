const { nanoid } = require("nanoid");

class PlaylistsService {
    constructor() {
        this._playlists = [];
    }

    addPlaylist({ name }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const upadatedAt = createdAt;

        const newPlaylist = {
            name, id, createdAt, upadatedAt
        }
        this._playlists.push(newPlaylist);
        const isSuccess = this._playlists.filter((playlist) => playlist.id === id).length > 0;
        if (!isSuccess) {
            throw new Error("Playlist gagal ditambahkan");
        }
        return id;
    }

    getPlaylists() {
        return this._playlists;
    }

    getPlaylistById(id) {
        const playlist = this._playlists.filter((p) => p.id === id)[0];
        if (!playlist) {
            throw new Error("Lagu tidak ditemukan");
        }
        return playlist;
    }

    editPlaylistById(id, { name }) {

        const index = this._playlists.findIndex((playlist) => playlist.id === id);
        if (index === -1) {
            throw new Error("Gagal memperbaharui lagu, lagu tidak ditemukan");
        }
        const updateAt = new Date().toISOString();
        this._playlists[index] = {
            ...this._playlists[index],
            name,
            updateAt
        }
    }

    deletePlaylistById(id) {
        const index = this._playlists.findIndex((playlist) => playlist.id === id);
        if (index === -1) {
            throw new Error("Gagal menghapus lagu, lagu tidak ditemukan");
        }
        this._playlists.splice(index, 1);
    }
}

module.exports = PlaylistsService;