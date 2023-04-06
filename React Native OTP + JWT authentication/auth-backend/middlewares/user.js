const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");
const User = require('../model/user');
const resetToken = require('../model/resetToken');

exports.isResetTokenValid = async (req, res, next) => {

    const { token, id } = req.query;

    if (!token || !id) {
        return sendError(res, 'invalid request')
    }

    if (!isValidObjectId(id)) {
        return sendError(res, 'invalid user')
    }

    const user = await User.findById(id)

    if (!user) {
        return sendError(res, 'user not found')
    }

    const rstToken = await resetToken.findOne({ owner: user._id });

    if (!rstToken) {
        return sendError(res, 'reset token not found')
    }

    const isValid = await rstToken.compareToken(token);

    if (!isValid) {
        return sendError(res, 'reset token is invalid')
    }


    req.user = user

    next();
}