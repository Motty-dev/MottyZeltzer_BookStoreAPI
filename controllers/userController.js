const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};


exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);


exports.updateMe = catchAsync( async (req, res, next) => {
    // 1- Create error if user posts password data 
    if(req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. please use /UpdateMyPassword', 400));
    }

    // 2- Filtering out unwanted field names that are not allowed to be updated
    const filterdBody = filterObj(req.body, 'name', 'email');

    // 3- Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterdBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'Success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'Success',
        data: null
    });
});

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined. please use /signup insted'
    });
};


