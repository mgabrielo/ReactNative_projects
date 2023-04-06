
const User = require('../model/user')
const { sendError, createRndByte } = require('../utils/helper')
const jwt = require('jsonwebtoken')
const { generateOtp, mailTransport } = require('../utils/mail')
const verificationToken = require('../model/verificationToken')
const { isValidObjectId } = require('mongoose')
const resetToken = require('../model/resetToken')
const crypto = require('crypto')

exports.createUser = async (req, res) => {

    try {
        const { name, email, password } = req.body

        const userExistEmail = await User.findOne({ email: email })
        if (userExistEmail) {
            return sendError(res, 'Email Already Exist')
        }

        const newUser = new User({
            name,
            email,
            password,
        })

        const OTP = generateOtp()

        const VerifysToken = new verificationToken({
            owner: newUser._id,
            token: OTP
        })
        await VerifysToken.save();
        await newUser.save();

        mailTransport().sendMail({
            from: 'adminverification@email.com',
            to: newUser.email,
            subject: "Verfiy your Email Account",
            html: `<h1>${OTP}</h1>`
        })
        res.json({ success: true, user: { name: newUser.name, email: newUser.email, id: newUser._id, verified: newUser.verified } });
    } catch (error) {
        sendError(res, error.message, 500)
    }

}

exports.SignInUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email.trim() || !password.trim()) {
            return sendError(res, 'Email OR Password is Missing')
        }

        const user = await User.findOne({ email })

        if (!user) {
            return sendError(res, 'User Not Found')
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return sendError(res, 'Email or Password Does Not Match')
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        res.json({ success: true, user: { name: user.name, email: user.email, id: user._id, token } });
    } catch (error) {
        sendError(res, error.message, 500)
    }
}

exports.verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp.trim()) {
        return sendError(res, 'Invalid request missing paarameters')
    }

    if (!isValidObjectId(userId)) {
        return sendError(res, 'Invalid IDs')
    }

    const user = await User.findById(userId)

    if (!user) {
        return sendError(res, 'User Not Found')
    }

    if (user.verified) {
        return sendError(res, 'Account Already Verified');
    }

    const token = await verificationToken.findOne({ owner: user._id })

    if (!token) {
        return sendError(res, 'Sorry User Not Found');
    }

    const isMatched = await token.compareToken(otp)

    if (!isMatched) {
        return sendError(res, 'Please Provide Valid Token');
    }

    user.verified = true;

    await verificationToken.findByIdAndDelete(token._id);

    await user.save()

    mailTransport().sendMail({
        from: 'adminverification@email.com',
        to: user.email,
        subject: "Verfiy your Email Account",
        html: `<h1>Email Verified Successfully </h1>`
    });

    res.json({ success: true, message: "email is verified", user: { name: user.name, email: user.email, id: user._id } })
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return sendError(res, 'Please Provide Valid Email')
    }

    const user = await User.findOne({ email });

    if (!user) {
        return sendError(res, 'User not Found, Invalid Request')
    }

    const token = await resetToken.findOne({ owner: user._id });

    if (token) {
        return sendError(res, 'You can only request token after one hour')
    }

    const RandomBytes = await createRndByte();

    const ResetToke = new resetToken({ owner: user._id, token: RandomBytes })

    await ResetToke.save()

    mailTransport().sendMail({
        from: 'SecureVerification@email.com',
        to: user.email,
        subject: "Password Reset",
        html: `http://localhost:3000/reset-password?token=${RandomBytes}&id=${user._id}`
    });

    res.json({ success: true, message: 'Password Reset Link has been sent to your email' });
}


exports.resetPassword = async (req, res) => {
    const { password } = req.body

    const user = await User.findById(req.user._id)

    if (!user) {
        return sendError(res, 'user not found')
    }

    const isSamePassword = await user.comparePassword(password);

    if (isSamePassword) {
        return sendError(res, 'new password should be different from old password')
    }

    if (password.trim().length < 8 || password.trim().length > 20) {
        return sendError(res, 'new password should be 8 to 20 characters long')
    }

    user.password = password.trim();
    await user.save();

    await resetToken.findOneAndDelete({ owner: user._id })

    mailTransport().sendMail({
        from: 'SecureVerification@email.com',
        to: user.email,
        subject: "password reset success",
        html: `<h1>Password Reset Successful</h1>`
    });

    res.json({ success: true, message: 'Password Reset sucessfully' });
}