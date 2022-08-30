const Order = require('../models/orderModel');
const factory = require('./handlerFactory');

//Chaining solution for 2 populate querys, the factory function handels only one 
const popOptins = [{path:'user', select:['id', 'name']}, {path:'book', select:['id', 'name']}];

exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order,popOptins);        
exports.createOrder = factory.createOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);

