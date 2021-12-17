class PlaylistHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.addPlaylistHandler = this.addPlaylistHandler.bind(this);
        this.getAllPlaylistHandler = this.getAllPlaylistHandler.bind(this);
        this.getPlaylistByIdHandler = this.getPlaylistByIdHandler.bind(this);
        this.addSongToPlaylistHandler = this.addSongToPlaylistHandler.bind(this);
        this.getSongFromPlaylistHandler = this.getSongFromPlaylistHandler.bind(this);
    }

    async addPlaylistHandler(request, h) {
        try {
            this._validator.validatePlaylistPayload(request.payload);
            const { name } = request.payload;

            const playlistId = await this._service.addPlaylist({
                name,
            });
            const response = h.response({
                status: 'success',
                message: 'Playlist berhasil ditambahkan',
                data: {
                    playlistId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            return error;
        }
    }

    async getAllPlaylistHandler(request) {
        const {name = ''} = request.query;
        const playlists = await this._service.getPlaylists(name);
        return {
            status: 'success',
            data: {
                playlists,
            }
        };
    }

    async getPlaylistByIdHandler(request, h) {
        try {
            const {id} = request.params;
            const playlist = await this._service.getPlaylistById(id);
            return {
                status: 'success',
                data: {
                    playlist
                }
            };
        }   catch (error){
            const response = h.response({
                status: 'fail',
                message: error.message,
            })
            response.code(404);
            return response;
        }
    }

    async addSongToPlaylistHandler(request, h) {
        try {
            this._validator.validatePlaylistSongsPayload(request.payload);
            const { id : playlistId } = request.params;
            const { songsId } = request.payload;


            await this._service.addSongsToPlaylist({playlistId ,songsId });
            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan ke playlist',
                data: {
                    songsId,
                    playlistId
                },
            });
            response.code(201);
            return response;
        } catch (error){
            const response = h.response({
                status: 'fail',
                message: error.message,
            })
            response.code(404);
            return response;
        }
    }
    async getSongFromPlaylistHandler(request, h) {
        try {
            const {id} = request.params;
            const song = await this._service.getSongsFromPlaylist(id);
            return {
                status: 'success',
                data: {
                    song
                },
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            })
            response.code(404);
            return response;
        }
    }
}

module.exports = PlaylistHandler;