const Joi = require('joi');

const PlaylistPayloadSchema = Joi.object({
    name: Joi.string().required(),
});

const PlaylistSongsPayloadSchema = Joi.object({
    songsId: Joi.string().required(),
});

module.exports = {
    PlaylistPayloadSchema,
    PlaylistSongsPayloadSchema
};