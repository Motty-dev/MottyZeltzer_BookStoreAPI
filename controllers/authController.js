const { promisify }  = require('util');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET ,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    
    res.status(statusCode).json({
        status: 'Success',
        token,
        data: {
            user
        }
    });
};

exports.signup = catchAsync(async(req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.password,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role
    });

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync( async (req, res, next) => {
    const { email, password } = req.body;

    // 1 - Check if the email and password exists
    if(!email || !password) {
        return next(new AppError('Please provide email and password !', 400));
    }

    // 2 - Check if the user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3 - If everything is ok, send token to client
    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async(req, res, next) => {

    // 1- Getting the token and check it if exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token) {
        return next(new AppError('You are not logged in! please log in to get access.', 401))
    }
    // 2- Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    // 3- Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) {
        return next(new AppError('The user belonging to the token is no longer exist', 401));
    }
    // 4- Check if user changed password after jwt was assigned to him
    if(currentUser.changesPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! please login again', 401));
    }

    // GRANT ACCESS TO PROTECTED ROUTES
    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have the right permissions to perform this action!', 403));
        }
        next();
    };
};

exports.forgotPassword = catchAsync( async (req, res, next) => {

    // 1- Get user based on POST email
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new AppError('There is no user with this email address', 404));
    }

    // 2- Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3- Send it to the user's email
    const resetURL = `${req.protocol}://${req.get(
        'host'
        )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your 
    password ans passwordconfirm to: ${resetURL}.\n If you didnt forgot your
    password, please ignore this email`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 minutes)',
            message
        });
    
        res.status(200).json({
            status: 'Success',
            message: 'Token sent to email'
        });
    } catch(err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError('There was an error sending the email. try again later!', 500));
    }   
});

exports.resetPassword =  catchAsync(async (req, res, next) => {
    // 1- Get user based on the token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
        });

    // 2- If token has not expire, and there is user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    // 3- Update changedPassword property for the user 
    //(done in the model middleware)

    // 4- Log the user in & send JWT
    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1- Get the user from collection
    const user = await User.findById(req.user.id).select('+password');

    // 2- Check if current password is correct
    if(!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is worng.',  401));
    }

    // 3- If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4- Log user in , sent jwt
    createSendToken(user, 200, res);
});