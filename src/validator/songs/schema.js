const Joi = require('joi');

const SongPayloadSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
    artist: Joi.string().required(),
    genre: Joi.string().required(),
    duration: Joi.string().required(),
});

module.exports = SongPayloadSchema;