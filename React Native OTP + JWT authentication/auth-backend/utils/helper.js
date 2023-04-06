const crypto = require('crypto')
const { Promise } = require("mongoose")

exports.sendError = (res, error, status = 401) => {
    res.status(status).json({ success: false, error })
}

exports.createRndByte = () => new Promise((resolve, reject) => {

    crypto.randomBytes(28, (err, buff) => {
        if (err) {
            reject(err);
        }

        const token = buff.toString('hex');

        resolve(token)
    });

});