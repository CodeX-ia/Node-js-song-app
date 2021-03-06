const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists',
        handler: handler.addPlaylistHandler,
    },
    {
        method: 'GET',
        path: '/playlists',
        handler: handler.getAllPlaylistHandler,
    },
    {
        method: 'GET',
        path : '/playlists/{id}',
        handler : handler.getPlaylistByIdHandler,
    },
    {
        method: 'POST',
        path: '/playlists/{id}/songs',
        handler: handler.addSongToPlaylistHandler,
    },  {
        method: 'GET',
        path: '/playlists/{id}/songs',
        handler: handler.getSongFromPlaylistHandler,
    },
];

module.exports = routes;