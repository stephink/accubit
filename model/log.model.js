const mongoose = require("mongoose");
const { LOG_MODEL } = require("../config/env.config");
const LogSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        letterName: {
            type: String
        }
    },
    { timestamps: true }
);
const Log = mongoose.model(LOG_MODEL, LogSchema);
module.exports = Log