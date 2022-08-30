const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;