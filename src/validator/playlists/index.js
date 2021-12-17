const {PlaylistPayloadSchema, PlaylistSongsPayloadSchema} = require("./schema")

const PlaylistsValidator = {
    validatePlaylistPayload: (payload) => {
        const validationResult = PlaylistPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        }
    },
    validatePlaylistSongsPayload: (payload) => {
        const validationResult = PlaylistSongsPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        }
    }
};

module.exports = PlaylistsValidator;