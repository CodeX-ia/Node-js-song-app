require('dotenv').config();

const Hapi = require('@hapi/hapi');

//songs
const songs = require('./api/songs');
const SongsService = require('./services/db/SongsService');
const SongsValidator = require('./validator/songs');

//playlists
const playlists = require('./api/playlists');
const PlaylistsService = require('./services/db/PlaylistsService');
const PlaylistsValidator = require('./validator/playlists');


const init = async () => {
    const songsService = new SongsService();
    const playlistsService = new PlaylistsService();

    const server = Hapi.server( {
        port : process.env.PORT,
        host : process.env.HOST,
        routes : {
            cors : {
                origin : ['*']
            }
        },
    });

    await server.register([
        {
            plugin : songs,
            options : {
                service : songsService,
                validator : SongsValidator
            }
        },
        {
            plugin: playlists,
            options: {
                service: playlistsService,
                validator: PlaylistsValidator
            }
        },
    ]);

    await server.start();
    console.log(`Server Berjalan pada ${server.info.uri}`);
}

init();